# TASK-3.08: S7 — Chatbot (0-token: offline + sanitizasyon)

**Durum:** ✅ Tamamlandı
**Modül:** M5 — Chatbot & API (modules/M5-Chatbot-API.md)
**Feature:** S7 — Chatbot 0-token (validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (prod serve; offline + dummy-key koşuları için)

---

## Hedef

Chatbot'u **0-token (sıfır API çağrısı)** doğrula (TK3 üç-katman): (1) sanitizasyon **kod-incelemesi** (omurga); (2) **dummy/geçersiz key** ile malformed-input 400 kısa-devre *çalıştırma* (Anthropic'e ulaşmadan); (3) **key-yok** offline UI (Playwright; sahte-online yok) + stream-kopması UI takılmaz (kod). Happy-path **koşulmaz**. Üç katman koşulup toplam API çağrısı 0 doğrulandığında tamamlanmış sayılır.

---

## Bağlam

Kapsam kararı: chatbot v0.1'de **hiç dokunulmadı** (regresyon riski yok) + canlı streaming prod'da (kiwiailab.com) kanıtlı → API maliyeti gereksiz. **Lisans gerçeği:** site `@anthropic-ai/sdk` + `ANTHROPIC_API_KEY` (token-başına ücretli Anthropic API) kullanır; Claude.ai / Claude Code aboneliği bu sunucu-taraflı SDK çağrısını kimlikleyemez → mevcut lisans chatbot'u besleyemez. Test değeri zaten degradasyon (offline) + güvenlik (sanitizasyon) tarafında; happy-path canlı yol bu fazda test edilmez.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M5-Chatbot-API.md` — F5.1 sanitizasyon (rol whitelist, boş-filtre, son 12, sonda-user), F5.2 offline UI (sahte "online" yok)
- `_dev/phases/PHASE-3.md` — Araştırma → TK3 + Dikkat (apiKey kontrolü sanitizasyondan ÖNCE → 503) + S7 araç satırı
- `_dev/QUALITY.md` — §7 Güvenlik (chat API yüzeyi)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.08 durumu

---

## Alt Görevler

- [x] **1. Sanitizasyon kod-incelemesi (omurga)**
  - `src/app/api/chat/route.ts`: rol whitelist + boş içerik filtresi + son 12 mesaj + sonda user zorunlu mantığını oku-doğrula (F5.1 / QUALITY §7). ✅

- [x] **2. Malformed kısa-devre — dummy-key ile (400)**
  - **Geçici dummy/geçersiz `ANTHROPIC_API_KEY` set** edilmiş bir serve'e curl POST: geçersiz JSON / boş messages / rol-enjeksiyon / sonda-user-yok → **400** döner (sanitizasyon `new Anthropic()`/stream'den ÖNCE → Anthropic'e ulaşmaz → **sıfır token**). ✅ 6/6 malformed → 400.
  - **YALNIZ malformed gönder** — dummy-key ile geçerli (happy-path) mesaj GÖNDERME (o gerçek API auth'a gider). Sıfır API çağrısı korunur. ✅ gönderilmedi.

- [x] **3. Key-yok offline UI (ayrı koşu — Playwright)**
  - `ANTHROPIC_API_KEY` yok → her istek **503**; UI zarif "offline" gösterir (sahte yeşil "online" noktası YOK — F5.2 / brief yasağı). ✅

- [x] **4. Stream-kopması (kod teyidi)**
  - Stream ortada koparsa client'a fallback enqueue edilir, UI takılı kalmaz (F5.2 edge — kod-inceleme). ✅

- [x] **5. Triyaj (TK6)** ✅ kapsam-içi bug yok.

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Dummy-key **ephemeral env var** olarak serve'e verilir (`ANTHROPIC_API_KEY=dummy next start`); `.env` commit'ine dokunulmaz (CLAUDE.md Dokunulmazlar). Bulgular bu task dokümanına.

---

## Dikkat Noktaları

- **apiKey kontrolü sanitizasyondan ÖNCE** **(repo:** route.ts:21-24 → :35-46**).** Sonuç: **key YOKKEN her istek 503** → malformed-400 kısa-devresine ulaşılamaz. Bu yüzden 400 yollarını görmek için **dummy-key ŞART**; offline yolu **ayrı** (key-yok → 503). Naif "key-yok + malformed → 400 bekle" **yanlış-negatif** (503 alır) — research kritik notu.
- **Sıfır API çağrısı korunur:** 400'ler Anthropic'e ulaşmadan döner; happy-path koşulmaz (kapsam + lisans gerçeği).
- **Sahte "online" noktası yok** (F5.2 / brief yasağı) — offline UI dürüst.
- **Ortam:** TASK-3.01 prod build; bu task iki serve konfigürasyonu gerektirir (key-yok = offline; dummy-key = 400 yolları). Her ikisinde PID fresh teyit (memory).

---

## Test Kriterleri

- [x] Sanitizasyon kod-incelemesi: rol whitelist + boş-filtre + son-12 + sonda-user doğru. ✅
- [x] dummy-key + malformed (geçersiz JSON / boş / rol-enjeksiyon / sonda-user-yok) → **400** (Anthropic'e ulaşmadan). ✅ 6/6
- [x] key-yok → **503** + UI offline (sahte-online yok). ✅
- [x] stream-kopması → UI takılmaz (kod teyidi). ✅
- [x] **Toplam API çağrısı = 0** (token harcanmadı). ✅

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **AG1 — Sanitizasyon kod-incelemesi (omurga):** `route.ts` doğrulandı — rol whitelist (`m.role === "user" || "assistant"`, :37-38), boş-içerik filtresi (`typeof content === "string" && content.trim().length > 0`, :39-40), son-12 (`.slice(-12)`, :42), sonda-user zorunlu (`!sanitized.length || sanitized[last].role !== "user" → 400`, :44-46). apiKey kontrolü (:21-24) sanitizasyondan **ÖNCE** → key-yokken her istek 503 (Dikkat Noktası teyit).
- **AG2 — Malformed kısa-devre (dummy-key, 400):** clean prod build (`rm -rf .next && next build` exit 0, 0 uyarı, 37 statik sayfa → S8-build re-teyit) → `ANTHROPIC_API_KEY=dummy… next start -p 3100`, fresh listening-PID **3508777** teyit (stray 12708 ≠, dokunulmadı). 6 malformed curl POST → hepsi **400**, Anthropic'e ulaşmadan: geçersiz JSON → `Invalid request body.` (ilk 400 dalı); `{}` / boş `[]` / rol-enjeksiyon(system) / boş-içerik(whitespace) / sonda-assistant → `A trailing user message is required.` (sanitizasyon sonrası). Rol whitelist + boş-filtre + sonda-user *çalıştırılarak* kanıtlandı. Serve log'unda Anthropic çağrı izi yok.
- **AG3 — Key-yok offline UI (Playwright MCP):** `env -u ANTHROPIC_API_KEY next start -p 3100`, fresh PID **3511140**. Kontrast curl: geçerli mesaj + malformed + geçersiz JSON → **hepsi 503** (`ANTHROPIC_API_KEY is not configured.`) → naif "key-yok+malformed→400" **yanlış-negatifi** kanıtlandı (apiKey gate önce). Playwright (`browser_run_code_unsafe`, raw `page`): mesaj gönder → 503 → offline mesajı render (*"Asistan şu an çevrimdışı. Çevrimiçi olması için bir ANTHROPIC_API_KEY ekleyin."*), kullanıcı balonu doğru. **Sahte-online yok:** `#chat .bg-green = 0`, `occ_online(en)=0`, "çevrimiçi" yalnız offline talimat metninde (1×); ekrandaki yeşil halka = site-geneli **custom cursor (M3)** (`fixed` + `pointer-events:none` + `insideChat:false`, z-70), chatbot presence değil. **UI takılmaz:** Thinking spinner=0, input temizlendi (`""`), retype'ta Gönder yeniden aktif (`streaming` takılı değil). Tek konsol hatası = beklenen `Failed to load resource: 503 @ /api/chat` (Chrome network-log, uygulama hatası değil).
- **AG4 — Stream-kopması (kod teyidi):** `route.ts` try/catch (:69-77) hata fallback enqueue eder (`"(The assistant hit an error. Please try again.)"`) + finally `controller.close()`; client `Chatbot.tsx` reader `done`'da break (:48-60) + finally `setStreaming(false)` (:63-65), `!res.ok || !res.body → setOffline(true)` (:38-42). UI takılı kalmaz.
- **AG5 — Triyaj (TK6):** kapsam-içi düzeltilecek bug YOK; kaynak kod değişmedi (doğrulama task'i).

**Sorunlar:**
- Stray `next-server` PID 12708 (Jun28, memory Süreç Disiplinleri): kullandığım 3100 portunu tutmuyordu; her iki serve koşusunda fresh-PID teyidiyle ayrıştırıldı, dokunulmadı.
- Screenshot artefaktı repo köküne düştü (`.playwright-mcp/` gitignore'da ama kök değil) → silindi; bu projede kanıt-screenshot commit edilmez.

**Kararlar:**
- 0-token kararı korundu: dummy-key serve'e geçerli (happy-path) mesaj gönderilmedi; tüm yollar `new Anthropic()`'ten önce döndü → **toplam API çağrısı = 0**.
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari karar yok; 0-token kapsam kararları PHASE-3 Kapsam Tartışması'nda zaten kayıtlı).

**Son Yaklaşım:** N/A (tek oturumda tamamlandı).

**Sonraki Adım Detayı:** N/A — TASK-3.09 (S8 adversarial/holistik) ayrı oturumda `/devflow:run-task`.

**Dosya Değişiklikleri:**
- Kaynak kod: **değişiklik yok** (doğrulama task'i). Sadece DevFlow dokümanları güncellendi (TASK-3.08, DURUM, PHASE-3).

**Test Sonuçları:**
- Sanitizasyon kod-inceleme (rol whitelist + boş-filtre + son-12 + sonda-user): ✅
- dummy-key + 6 malformed → 400 (Anthropic'e ulaşmadan): ✅
- key-yok → 503 (geçerli + malformed dahil) + UI offline (sahte-online yok): ✅
- stream-kopması → UI takılmaz (kod teyidi): ✅
- **Toplam API çağrısı = 0** (token harcanmadı): ✅
- Build temiz (exit 0, 0 uyarı, 37 statik sayfa = S8-build regresyon tabanı re-teyit): ✅

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-29

**Ne Yapıldı:**
- S7 chatbot **0-token** üç-katman doğrulandı (TK3): (1) sanitizasyon kod-inceleme; (2) dummy-key ile 6 malformed girdi → 400 (Anthropic'e ulaşmadan); (3) key-yok → 503 + Playwright offline UI (sahte-online yok, UI takılmaz). Stream-kopması kod-teyidi. **Toplam API çağrısı = 0**.
- apiKey-gate-sanitizasyondan-önce değişmezi *çalıştırılarak* doğrulandı (dummy-key→400 vs key-yok→503 kontrastı; naif yanlış-negatif gösterildi).
- Triyaj: kapsam-içi bug yok, kaynak kod değişmedi.

**Öğrenilenler:**
- Key-yokluğunu zorlamak için `env -u ANTHROPIC_API_KEY` (yerelde `.env` yok zaten — sadece `.env.example`); dummy-key 400 yollarını çalıştırmak için ephemeral env var. İkisi de aynı build üzerinde runtime env ile koşuldu (server-side env, build-time inline değil). [Faz retrospektifine aday icra-nüansı — memory değil.]

---

**Oluşturulma:** 2026-06-29
