# TASK-12.02: Bölüme-uyarlanan okunabilirlik / adaptif scrim

**Durum:** ✅ Tamamlandı
**Modül:** M1 — Living Flow & Tasarım Sistemi (+M2 bölüm entegrasyonu)
**Feature:** B1 — Living Flow nabız kapsamı (aşağı-taşıma)
**Faz:** Phase 12 (phases/PHASE-12.md)
**Bağımlılıklar:** TASK-12.01 ✅ (fixed alan katmanı kurulu olmalı)

---

## Hedef

TASK-12.01 ile fixed alan Hero'nun altındaki bölümlerin arkasında görünür hale geldi. Bu task, o alanın metin okunabilirliğini bozmamasını sağlar (Araştırma TK3 — **bölüme-uyarlanan opaklık = adaptif scrim, canvas değil**). Metin-yoğun bölümlerde (HowItWorks, Sektörler) alan daha soluk / scrim daha güçlü; nefes alan bölümlerde biraz daha görünür; opak bölümler (Footer/Bunker paneli `bg-ink`) zaten örter → dokunulmaz. **Metin her zaman kazanır.** Task, her iki temada (light+dark) tüm Hero-altı bölümlerde metin alan üzerinde net okunur + build temiz olduğunda tamamlanmış sayılır. (Kesin kontrast=100 ölçümü + craft hakemliği TASK-12.03 gate'inde.)

---

## Bağlam

`body` opak canvas (`globals.css:60`); fixed alan gövde bg üstünde, içerik altında. Mevcut bölüm arka planları alanı farklı geçirir:
- **HowItWorks** (`HowItWorks.tsx:45`): bölüm şeffaf (kartlar `bg-canvas`) → alan kart aralıklarından **güçlü** sızar; metin-yoğun → en çok scrim gerektiren bölüm.
- **Sektörler** (`SectorSolutions.tsx:46`), **Forum** (`Forum.tsx:12`), **Credibility** (`Credibility.tsx:11`): `bg-canvas-deep/40` → alan ~%60 geçer; metin/etkileşim yoğun.
- **Chatbot** (`Chatbot.tsx:71`): bölüm şeffaf, iç kart `bg-canvas`.
- **Bunker/Crew OS teaser** (`Bunker.tsx:19,54`): sol sütun metni şeffaf zeminde; sağ panel `bg-ink` opak (örter).
- **Footer** (`Footer.tsx:48`): `bg-ink` opak → örter, scrim gerekmez.

Discuss kararı: "Metin-yoğun ve koyu-panel bölümlerde iplik daha da soluk / scrim daha güçlü; nefes alan bölümlerde biraz daha görünür." Bölüm-başı opaklık tavanları ve ipliğin sayfada ne kadar aşağı ineceği araştırmada **açık uç** bırakıldı ("düşük-riskli craft ayarı; Footer opak zaten örttüğü için zorunlu kesme kodu gerekmiyor") — bu task + gate task'ta somutlaşır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-12.md` — TK3 (adaptif scrim), "Açık uç", Karar-Gate kriterleri (kontrast=100 tetiği), Kapsam Tartışması "Okunabilirlik"
- `src/components/living-flow/FlowScrim.tsx` — mevcut token-bazlı radyal scrim deseni (`color-mix(--color-canvas)`) — yeniden kullanılacak desen
- `src/components/living-flow/FlowBackdrop.tsx` — TASK-12.01'de oluşan fixed alan (scrim veil burada veya bölümde taşınabilir)
- Bölüm bileşenleri (arka plan/z yapısı için gerektiğinde): `HowItWorks.tsx`, `SectorSolutions.tsx`, `Forum.tsx`, `Credibility.tsx`, `Chatbot.tsx`, `Bunker.tsx`
- `_dev/memory/aria-hidden-color-contrast-muafiyeti-degil.md` — dekoratif alan `aria-hidden` olsa da metnin efektif arkaplanını değiştirir → kontrast korunmalı
- `_dev/memory/tema-fix-html-dark-token-flip.md` — tema-özel değer `dark:` variant ile DEĞİL, flip eden token (`--color-canvas`/`--color-canvas-deep`) üzerinden yapılır

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-12.md` — Task Listesi tablosunda 12.02 durumu

---

## Alt Görevler

- [x] **1. Okunabilirlik mekanizmasını kur (adaptif scrim / veil)**
  - Token-bazlı scrim (`FlowScrim` deseni: `color-mix(in srgb, var(--color-canvas) 56%, transparent)`) — her iki temada otomatik uyar (flip eden token; `dark:` variant DEĞİL) ✓
  - **Seçilen mekanizma: Global veil (A), ama fixed katmanda DEĞİL** — `FlowBackdrop` fixed olduğu için içine konan veil hero/bölüm ayrımı yapamaz (aynı viewport, farklı scroll). Veil içerikle scroll eden `<main>` içi wrapper'a kondu (`FlowVeil.tsx` YENİ). En az dosya (page.tsx + 1 bileşen) ✓
  - Üstten şeffaf → 160px'de %56 canvas washi → dibe kadar sabit (hero'yla dikişsiz geçiş). Metin-yoğun bölgelerde alan soluk, nefes alan bölgede görünür ✓

- [x] **2. Bölüm bazında okunabilirliği doğrula ve ayarla**
  - HowItWorks + Sektörler (metin-yoğun): metin net; ek per-section scrim GEREKMEDİ — global veil + mevcut `bg-canvas-deep/40` yeterli lift sağladı (Karar Noktası A; B'ye escalate şartı = kontrast-fail, gözlenmedi) ✓
  - Bunker sol metin sütunu: şeffaf zeminde okunur; sağ panel `bg-ink` opak örter ✓
  - Forum / Credibility / Chatbot: metin okunur; kartlar (`bg-canvas`) lift sağlıyor — dokunulmadı ✓
  - Footer: opak, dokunulmadı ✓

- [x] **3. İki temada + göz-yorgunluğu gözle inceleme**
  - light + dark iki temada tüm Hero-altı bölümlerde metin okunur (SwiftShader full-motion `high` mod ekran görüntüleri; panel renkleri dark'ta krem'e döner, teyit edildi) ✓
  - "Tek bütün alan" imzası korunuyor, `/40` bölümleri belirgin daha soluk = adaptif fark görünür (craft ön-kontrol; kesin hakemlik + kontrast=100 ölçümü TASK-12.03 gate) ✓

---

## Etkilenen Dosyalar

```
src/components/living-flow/
├── FlowBackdrop.tsx   # (muhtemel) global scrim veil eklenir — zaten var (12.01)
└── FlowScrim.tsx      # (muhtemel) desen yeniden kullanılır / paylaşılan scrim'e genellenir — zaten var
src/components/
└── <yalnız gerekli metin-yoğun bölüm(ler)>   # scrim/opaklık ayarı — YALNIZCA kontrast gerektiriyorsa (zaten var)
```

> **Not:** Yeni i18n anahtarı yok (TK4). `package.json` dokunulmaz. Bölüm dosyalarına dokunma **minimize edilir** — global veil yeterliyse bölümlere hiç dokunulmaz (→ Karar Noktaları).

---

## Dikkat Noktaları

- **Metin her zaman kazanır (a11y gate):** Alan dekoratif `aria-hidden` ama bu **color-contrast'tan muaf tutmaz** (memory) — nabız/iplik metin arkasından geçince metnin efektif arkaplanını değiştirir. Scrim, metni her iki temada WCAG-AA'da tutmalı. Kesin ölçüm TASK-12.03.
- **Tema:** Scrim değerleri flip eden token üzerinden (`--color-canvas`/`--color-canvas-deep`); `dark:` variant kullanma (proje `html.dark` + token flip; `dark:` OS-tercihine bağlı, desync — memory `tema-fix-html-dark-token-flip`).
- **Craft — tek-tip düz opaklık tuzağı:** Discuss'a göre tek-tip opaklık metin-yoğun bölümlerde fazla gelebilir; bölüme-uyarlanan olması bu yüzden. Ama fazla scrim de alanı öldürür (imza zayıflar). Denge craft ile bulunur.
- **Opak bölümler kendiliğinden doğru:** Footer + Bunker iç paneli `bg-ink` fixed alanı doğal örter → o bölgelerde scrim gereksiz; ekstra kesme kodu yazma (Araştırma).
- **Dokunma sınırı:** İçerik/kopya/layout/davranış **değişmez** (kapsam dışı) — yalnız görsel okunabilirlik katmanı (scrim/opaklık).

---

## Test Kriterleri

- [x] `npx next build` temiz geçer (6.2s, 0 hata, TS strict)
- [x] **light tema (gözle):** Tüm Hero-altı bölümlerde (HowItWorks, Sektörler, Bunker sol metin, Forum, Chatbot, Credibility) metin alan üzerinde net okunur
- [x] **dark tema (gözle):** Aynı bölümlerde metin okunur (panel renkleri temada krem'e döner — iki tema ayrı doğrulandı)
- [x] Metin-yoğun/`/40` bölümlerde alan belirgin soluk; transparent nefes alan bölümde daha görünür → tek-tip değil, uyarlanmış
- [x] "Tek bütün alan"/imza sürekliliği korunuyor; göz yorgunluğu / şablon-kokusu ön-incelemede yok (kesin craft hakemliği TASK-12.03)
- [x] Mevcut a11y tohumu (`home-a11y.spec.ts` light+dark) regresyonsuz — 2 passed, 0 ihlal
- [x] i18n parite tohumu (`i18n-parity.test.ts`) yeşil — 5 passed (yeni anahtar yok)

---

## Karar Noktaları

- **Scrim mekanizması — global veil vs per-section scrim:**
  - **(A) Global veil (öneri, başlangıç):** `FlowBackdrop` alanı, Hero-altında globalde soluklaştıran token-bazlı dikey/radyal scrim taşır; bölümlerin mevcut arka planları (`bg-canvas-deep/40`, kartlar) lokal lift sağlar → **bölüm dosyalarına dokunulmaz** (en az yüzey, en düşük risk).
  - **(B) Per-section scrim (TK3 literal):** Yalnız global veil kontrast=100'ü sağlayamayan **belirli** bölüme (muhtemelen HowItWorks) ek scrim/opaklık.
  - **Öneri:** A ile başla; yalnız bir bölüm kontrastta zorlanırsa o bölüme B uygula. Böylece dosya sayısı düşük kalır ("1-3 dosya"). Craft son hakem.
- **Aşağı kesim noktası (açık uç):** İplik Credibility'de mi sönümlenir yoksa Footer'a kadar (opak Footer zaten örter) mı iner → **Öneri:** zorunlu kesme kodu yok; Footer'ın opaklığı doğal kesim. Estetik "sönümleme" isteniyorsa hafif alt-fade — düşük-riskli craft ayarı, gate task'ta ince ayar.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md ve PHASE-12.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **`FlowVeil.tsx` (YENİ)** — token-bazlı okunabilirlik veil'i: `linear-gradient(to bottom, transparent 0, color-mix(--color-canvas 56%) 160px, …56% 100%)`. `FlowScrim` `color-mix` desenini yeniden kullanır; `--color-canvas` flip ettiği için tema-adaptif (`dark:` variant YOK — memory `tema-fix-html-dark-token-flip`). `pointer-events-none absolute inset-0 z-0 aria-hidden`.
- **`page.tsx`** — Hero-altı bölümler tek `<div class="relative isolate">` içine sarıldı; içinde `FlowVeil` + `<div class="relative z-10">` (bölümler). Hero wrapper DIŞINDA → tam yoğunluk korunur. Stacking: fixed flow (z-0, main dışı) < veil (z-0, isolate context tabanı) < bölüm içeriği (z-10).
- Bölüm dosyalarına **hiç dokunulmadı** (Karar Noktası A çözdü; B'ye escalate şartı = kontrast-fail, gözlenmedi).

**Son Yaklaşım (kritik mimari karar):** Karar Noktası A "veil'i FlowBackdrop'a koy" der; ama `FlowBackdrop` **fixed** — sabit-koordinatlı veil hero-parlak/bölüm-soluk ayrımını YAPAMAZ (ikisi de aynı viewport'u farklı scroll anlarında kaplar). Okunabilirlik katmanı içerikle scroll etmeli → veil `<main>` içi wrapper'a kondu. A'nın ruhu (tek global veil + mevcut `bg-canvas-deep/40` bölüm arkaplanları lokal lift) korundu, yalnız veil'in **yeri** düzeltildi. Adaptasyon emergent: transparent bölümler (HowItWorks/Bunker/Chatbot) veil-only = daha görünür; `/40` bölümler (Sektörler/Forum/Credibility) veil+`/40` = daha soluk; opak (`bg-ink`: Footer, paneller) doğal örter. Değer 52→56% nudge'landı (dark'ta açık-krem metin ↔ açık-yeşil nabız-çekirdeği kontrast riskine 12.03 gate öncesi marj).

**Sonraki Adım Detayı:** Task tamam. Sıradaki = **TASK-12.03 karar-gate** (kontrast=100 çift-tema full-motion ölçümü + desktop perf 100/CLS 0 + craft hakemliği → uygula-onayla VEYA iptal-kaydet). Gate'e taşınan gözlem: transparent-bölüm başlıklarının arkasındaki parlak nabız-çekirdeği knot'ları (parallax-yoğunluk artefaktı) donmuş karede canlı görünür ama canlıda sürüklenir; metin her karede okunur; kesin WCAG ölçümü + veil değeri son-ayarı gate'in işi. Veil değeri tek noktadan ayarlanır (`FlowVeil.tsx` `56%`).

**Test Sonuçları:**
- `npx next build` → temiz (6.2s, TS strict, 0 hata).
- `i18n-parity.test.ts` → 5 passed (yeni anahtar yok, beklenen).
- `home-a11y.spec.ts` (light+dark, axe WCAG-AA, reduced-motion) → 2 passed, 0 ihlal (DOM değişikliği regresyonsuz).
- Görsel: SwiftShader `channel:'chrome'` full-motion `high` mod, 1440×900, TR `/` cookie, hero + 4 Hero-altı bölüm × 2 tema ekran görüntüsü — metin her yerde okunur, adaptif fark görünür, imza korunur, fallback (reduced/mobil) no-op (veil canvas-üstü-canvas = görünmez).

---

**Oluşturulma:** 2026-07-03
