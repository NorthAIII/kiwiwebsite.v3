#!/usr/bin/env node
// ops/probe-chat-guard.mjs — `/api/chat` koruma katmanlarının canlı probe'u (TASK-19.05, TB-G2).
//
// NE ÖLÇER
//   Fazın asıl davranışı Vercel serving zincirinde gerçekleşir. Vitest yalnız origin mantığını, yerel
//   `next start` ise WAF'sız sunucuyu görür. Bu script iki katmanı verilen host'a karşı ölçer:
//     - origin kapısı (`src/lib/chat-origin.ts`, route'un ilk işi): yabancı ya da başlıksız istek → 403
//     - WAF hız sınırı (`ops/firewall/chat-rate-limit.json`): 10 dakikada IP başına 6 POST, aşımda 429
//   Elle tetiklenir. CI'da KOŞMAZ (kullanıcı kararı): canlıya istek atar ve koşanın IP'sini kilitler.
//
// INVARIANT — MODEL HİÇBİR KOŞULDA ÇAĞRILMAZ, GROQ KOTASI HARCANMAZ
//   Her istek aynı sabit, geçersiz gövdeyi gönderir: `{"messages":[]}`. Kapıdan geçen istek route'ta
//   sanitize adımında 400 alır ("A trailing user message is required."). Anahtarsız ortamda (preview,
//   anahtarsız yerel) daha önce, 503'te durur. İki hâlde de sağlayıcı istemcisi hiç kurulmaz.
//   Script'te geçerli mesaj gövdesi üreten bir yol yoktur: `send()` gövde parametresi almaz, yalnız
//   `PROBE_BODY`'yi gönderir. Açılışta `assertProbeBodyInert()` gövdenin tek mesaj taşımadığını doğrular;
//   doğrulama düşerse script hiç istek atmadan 2 ile çıkar. Bu dosyayı değiştiren invariant'ı da korur.
//
// KULLANIM (repo kökünden; bağımlılık yok, yalnız Node'un yerleşik `fetch`'i)
//   node ops/probe-chat-guard.mjs --base https://kiwiailab.com               # apex: origin senaryoları
//   node ops/probe-chat-guard.mjs --base https://www.kiwiailab.com           # www (yönlendirmesiz 200 döner)
//   node ops/probe-chat-guard.mjs --base https://kiwi-ai-lab-v3.vercel.app   # vercel.app alias'ı
//   node ops/probe-chat-guard.mjs --base http://localhost:3217               # yerel `next start -p 3217`
//   node ops/probe-chat-guard.mjs --base https://kiwiailab.com --burst       # origin senaryoları + patlama
//   node ops/probe-chat-guard.mjs --base https://kiwiailab.com --burst-only  # yalnız patlama
//   `--base` ZORUNLUDUR ve varsayılanı yoktur: canlıya kazara istek (ve patlama) gitmesin. Yalnız
//   origin'i kullanılır (yol atılır); hedef her zaman `<origin>/api/chat`. Yönlendirme izlenmez
//   (`redirect: "manual"`): ölçülen verilen host'un kendisidir, 3xx sapma olarak raporlanır.
//
// SENARYOLAR (sıra sabit)
//   1. yabancı Origin (`https://evil.example`)        → 403 (UAT 18 senaryo 23'ün probu)
//   2. Origin yok + Sec-Fetch-Site yok (curl gibi)     → 403
//   3. kendi Origin (= `--base`'in origin'i)           → 400 ya da 503 ("kapıdan geçti")
//   Patlama (`--burst` / `--burst-only`): kendi Origin, ardışık. İlk 429'a kadar, en fazla 13 istek
//   (2×6+1: sabit pencerenin hizası bilinmez). Kaçıncı istekte 429 geldiği raporlanır; 13 istekte
//   429 yoksa "sınır gözlenmedi" (sapma).
//   Sınıflar: 403 = origin kapısı · 400/503 = kapıdan geçti · 429 = sınırlandı · diğeri = beklenmeyen.
//
// ÇIKIŞ KODU
//   0 = her senaryo beklenenle eşleşti · 1 = sapma (en az bir senaryo beklenmeyen kod aldı) ·
//   2 = ölçülemedi: argüman hatası, ağ hatası ya da origin senaryosunda 429. Sonuncusu başarısızlık
//   değil: IP zaten sınırda, pencere dolmadan origin kapısı ölçülemez → pencereyi bekle (≤10 dk).
//
// PENCERE BÜTÇESİ — KENDİ IP'N DE SAYILIR
//   - Hobby'de system bypass yok (`Requires Pro or Enterprise`). Patlama seni ≤10 dk 429'da tutar ve
//     o sürede aynı IP'den chatbot da offline görünür. Patlamayı her zaman EN SON koş.
//   - WAF canlıyken bütçe 10 dakikada 6 istektir. Origin senaryoları da sayılır (her koşu 3 istek,
//     403'ler dahil: kural yanıt kodundan bağımsız sayar). Birden çok host'u probe'larken toplamı planla.
//   - Sayaçlar edge bölgesi başınadır. Tek makineden koşulan probe tek bölgeye düşer.
//
// GELECEKTEKİ SAĞLIK KONTROLÜ (kapsam dışı)
//   Günlük sentetik kontrol eklenirse aynı-origin başlığını göndermeli (Origin = hedef host) ve
//   6 istek / 10 dk limitine sayıldığını hesaba katmalı (GitHub Actions IP'leri değişkendir).
//
// KAYNAK: DECISIONS 2026-10-02 ("`/api/chat` kota koruması"). Kardeş script: `ops/firewall/drift.mjs`.

import { pathToFileURL } from "node:url";

/** Tek gövde. Geçersizdir (boş `messages`) — route'u sağlayıcıdan önce durdurur. Değiştirme. */
export const PROBE_BODY = '{"messages":[]}';
/** UAT 18 senaryo 23'ün yabancı origin'i. */
export const FOREIGN_ORIGIN = "https://evil.example";
/** Patlamanın üst sınırı: 2 × 6 + 1. Pencere hizası bilinmediği için iki tam pencere + 1. */
export const BURST_MAX = 13;
const TIMEOUT_MS = 15_000;
const USER_AGENT = "probe-chat-guard (ops/probe-chat-guard.mjs)";

const USAGE = `Kullanım: node ops/probe-chat-guard.mjs --base <url> [--burst | --burst-only]
  --base <url>    zorunlu, varsayılan yok (örn. https://kiwiailab.com, http://localhost:3217)
  --burst         origin senaryolarından sonra patlama (ilk 429'a dek, en fazla ${BURST_MAX} istek)
  --burst-only    yalnız patlama (origin senaryoları koşmaz)
Çıkış: 0 eşleşme · 1 sapma · 2 ölçülemedi (argüman/ağ hatası ya da IP zaten sınırda)`;

/**
 * Gövdenin modele ulaşamayacağını doğrular: `messages` boş bir dizi olmalı. Tek bir mesaj bile
 * (rolü ne olursa olsun) sanitize'ı geçebilecek bir gövdeye giden yolu açar → reddedilir.
 * @param {string} body
 */
export function assertProbeBodyInert(body = PROBE_BODY) {
  /** @type {any} */
  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    throw new Error("probe gövdesi JSON değil");
  }
  if (!parsed || !Array.isArray(parsed.messages) || parsed.messages.length !== 0) {
    throw new Error("probe gövdesi boş `messages` dizisi olmalı — model çağrılabilir hâle gelir");
  }
}

/**
 * @typedef {{ base: URL, burst: boolean, burstOnly: boolean, help: boolean }} ProbeArgs
 * @param {string[]} argv  `process.argv.slice(2)`
 * @returns {{ ok: true, args: ProbeArgs } | { ok: false, error: string }}
 */
export function parseArgs(argv) {
  /** @type {string | undefined} */
  let baseRaw;
  let burst = false;
  let burstOnly = false;
  let help = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--burst") burst = true;
    else if (a === "--burst-only") burstOnly = true;
    else if (a === "-h" || a === "--help") help = true;
    else if (a === "--base") {
      const v = argv[i + 1];
      if (v === undefined || v.startsWith("--")) return { ok: false, error: "`--base` bir URL ister" };
      baseRaw = v;
      i++;
    } else if (a.startsWith("--base=")) baseRaw = a.slice("--base=".length);
    else return { ok: false, error: `bilinmeyen argüman: ${a}` };
  }
  if (help) return { ok: true, args: { base: new URL("http://help.invalid"), burst, burstOnly, help } };
  if (burst && burstOnly) return { ok: false, error: "`--burst` ile `--burst-only` birlikte verilemez" };
  if (!baseRaw) return { ok: false, error: "`--base` zorunlu (varsayılan yok: canlıya kazara istek gitmesin)" };
  let base;
  try {
    base = new URL(baseRaw);
  } catch {
    return { ok: false, error: `geçersiz URL: ${baseRaw}` };
  }
  if (base.protocol !== "http:" && base.protocol !== "https:") {
    return { ok: false, error: `yalnız http/https: ${baseRaw}` };
  }
  return { ok: true, args: { base: new URL(base.origin), burst, burstOnly, help } };
}

/**
 * Durum kodunun sınıfı.
 * @param {number} status
 * @returns {"origin-kapısı" | "kapıdan-geçti" | "sınırlandı" | "beklenmeyen"}
 */
export function classify(status) {
  if (status === 403) return "origin-kapısı";
  if (status === 400 || status === 503) return "kapıdan-geçti";
  if (status === 429) return "sınırlandı";
  return "beklenmeyen";
}

/**
 * Origin senaryoları. `expect` beklenen sınıftır; sıra sabittir.
 * @param {URL} base
 * @returns {{ name: string, expect: "origin-kapısı" | "kapıdan-geçti", headers: Record<string, string> }[]}
 */
export function originScenarios(base) {
  return [
    { name: "1 yabancı Origin", expect: "origin-kapısı", headers: { origin: FOREIGN_ORIGIN } },
    { name: "2 Origin yok (curl gibi)", expect: "origin-kapısı", headers: {} },
    { name: "3 kendi Origin", expect: "kapıdan-geçti", headers: { origin: base.origin } },
  ];
}

/**
 * Origin senaryosu sonucu. 429 başarısızlık değil: IP zaten sınırda, origin kapısı ölçülemez.
 * @param {string} expected  beklenen sınıf
 * @param {number} status
 * @returns {"eşleşti" | "sapma" | "ölçülemedi"}
 */
export function judgeOrigin(expected, status) {
  const got = classify(status);
  if (got === "sınırlandı") return "ölçülemedi";
  return got === expected ? "eşleşti" : "sapma";
}

/**
 * Tek istek. Gövde HER ZAMAN `PROBE_BODY`dir — bu fonksiyon gövde parametresi almaz (invariant).
 * Node'un `fetch`'i kendiliğinden Origin ya da Sec-Fetch-Site eklemez (yalnız `sec-fetch-mode: cors`).
 * @param {URL} target
 * @param {Record<string, string>} headers
 * @returns {Promise<{ status: number, snippet: string }>}
 */
async function send(target, headers) {
  const res = await fetch(target, {
    method: "POST",
    headers: { "content-type": "application/json", "user-agent": USER_AGENT, ...headers },
    body: PROBE_BODY,
    redirect: "manual",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  let text = "";
  try {
    text = await res.text();
  } catch {
    // gövde okunamadı — durum kodu yine kanıttır
  }
  const location = res.headers.get("location");
  const snippet = (location ? `→ ${location}` : text).replace(/\s+/g, " ").trim().slice(0, 48);
  return { status: res.status, snippet };
}

/** @param {string | number} s @param {number} n */
const pad = (s, n) => String(s).padEnd(n);

/** @returns {Promise<number>} */
async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (!parsed.ok) {
    console.error(`✗ ${parsed.error}\n\n${USAGE}`);
    console.error("\nİstek gönderilmedi.");
    return 2;
  }
  const { base, burst, burstOnly, help } = parsed.args;
  if (help) {
    console.log(USAGE);
    return 0;
  }
  try {
    assertProbeBodyInert();
  } catch (e) {
    console.error(`✗ invariant bozuk: ${e instanceof Error ? e.message : e}. İstek gönderilmedi.`);
    return 2;
  }

  const target = new URL("/api/chat", base);
  const mode = burstOnly ? "yalnız patlama" : burst ? "origin senaryoları + patlama" : "origin senaryoları";
  const startedAt = new Date().toISOString();
  console.log(`probe-chat-guard · hedef ${target.href} · ${mode}`);
  console.log(`başlangıç ${startedAt} · gövde ${PROBE_BODY} (model çağrılmaz)`);
  console.log("");

  const W = [28, 15, 7, 12];
  console.log(`${pad("senaryo", W[0])}${pad("beklenen", W[1])}${pad("gelen", W[2])}${pad("sonuç", W[3])}yanıt`);
  console.log("-".repeat(W[0] + W[1] + W[2] + W[3] + 24));

  let total = 0;
  let deviations = 0;
  let unmeasured = 0;
  /** @param {string} name @param {string} expected @param {number} status @param {string} verdict @param {string} snippet */
  const row = (name, expected, status, verdict, snippet) =>
    console.log(`${pad(name, W[0])}${pad(expected, W[1])}${pad(status, W[2])}${pad(verdict, W[3])}${snippet}`);

  /** @param {Record<string, string>} headers */
  const request = async (headers) => {
    total++;
    return send(target, headers);
  };

  try {
    if (!burstOnly) {
      for (const s of originScenarios(base)) {
        const { status, snippet } = await request(s.headers);
        const verdict = judgeOrigin(s.expect, status);
        if (verdict === "sapma") deviations++;
        if (verdict === "ölçülemedi") unmeasured++;
        row(s.name, s.expect, status, verdict, snippet);
      }
    }

    if (burst || burstOnly) {
      if (unmeasured > 0) {
        console.log("patlama atlandı — origin senaryosunda 429: IP zaten sınırda, patlama bir şey ölçmez.");
      } else {
        /** @type {number | undefined} */
        let hitAt;
        for (let i = 1; i <= BURST_MAX; i++) {
          const { status, snippet } = await request({ origin: base.origin });
          const got = classify(status);
          const verdict = got === "sınırlandı" ? "sınırlandı" : got === "kapıdan-geçti" ? "geçti" : "sapma";
          if (verdict === "sapma") deviations++;
          row(`P${i} patlama`, "429'a dek", status, verdict, snippet);
          if (got === "sınırlandı") {
            hitAt = i;
            break;
          }
        }
        console.log("");
        if (hitAt !== undefined) {
          console.log(`patlama: 429 patlamanın ${hitAt}. isteğinde geldi (koşunun ${total}. isteği).`);
          if (hitAt === 1) {
            console.log("  not: ilk istekte 429 — pencere bu koşudan önce dolmuş olabilir; sınırın değeri bu koşuda ölçülmedi.");
          }
        } else {
          deviations++;
          console.log(`patlama: sınır gözlenmedi — ${BURST_MAX} istekte 429 yok (WAF kuralı yok, pasif ya da \`log\` modunda).`);
        }
      }
    }
  } catch (e) {
    const err = /** @type {any} */ (e);
    const reason = err?.cause?.code ?? err?.name ?? "hata";
    console.error(`\n✗ ağ hatası (${reason}): ${err?.cause?.message ?? err?.message ?? e}. Koşu durduruldu.`);
    console.error(`toplam istek ${total} · bitiş ${new Date().toISOString()}`);
    return 2;
  }

  const code = deviations > 0 ? 1 : unmeasured > 0 ? 2 : 0;
  const meaning = code === 0 ? "eşleşme" : code === 1 ? `sapma (${deviations})` : "ölçülemedi — pencereyi bekle (≤10 dk)";
  console.log("");
  console.log(`toplam istek ${total} · bitiş ${new Date().toISOString()} · çıkış ${code} = ${meaning}`);
  return code;
}

// CLI girişi yalnız script doğrudan koşulduğunda çalışır — test import'u yan etkisizdir.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then(
    (code) => {
      process.exitCode = code;
    },
    (e) => {
      console.error(`✗ beklenmeyen hata: ${e instanceof Error ? e.stack : e}`);
      process.exitCode = 2;
    }
  );
}
