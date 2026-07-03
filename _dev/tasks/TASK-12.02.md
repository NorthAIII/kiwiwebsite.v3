# TASK-12.02: Bölüme-uyarlanan okunabilirlik / adaptif scrim

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Okunabilirlik mekanizmasını kur (adaptif scrim / veil)**
  - Token-bazlı scrim (`FlowScrim` deseni: `color-mix(in srgb, var(--color-canvas) …%, transparent)`) — her iki temada otomatik uyar (flip eden token; `dark:` variant DEĞİL)
  - **Öncelik:** en az dosyaya dokunan, en craft-temiz mekanizmayı seç (→ Karar Noktaları: global veil vs per-section scrim)
  - Metin-yoğun bölgelerde alanı belirgin soluklaştır; nefes alan bölgede daha görünür bırak

- [ ] **2. Bölüm bazında okunabilirliği doğrula ve ayarla**
  - HowItWorks + Sektörler (metin-yoğun): metin alan üzerinde net; gerekirse bu bölümlerde scrim güçlendir / bölüm arka plan opaklığını derinleştir (`bg-canvas-deep/40` → tavan ayarı)
  - Bunker sol metin sütunu: şeffaf zeminde okunur kalır (sağ panel zaten opak)
  - Forum / Credibility / Chatbot: metin okunur; kartlar (`bg-canvas`) zaten lift sağlıyor — minimum müdahale
  - Footer: opak, dokunma

- [ ] **3. İki temada + göz-yorgunluğu gözle inceleme**
  - light + dark iki temada tüm Hero-altı bölümlerde metin okunur (memory tema tuzağı: panel renkleri temada ters döner)
  - Alanın sürekli-soluk hissi göz yormuyor, "tek bütün alan" imzası korunuyor (craft ön-kontrol; kesin hakemlik gate task)

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

- [ ] `npx next build` temiz geçer
- [ ] **light tema (gözle):** Tüm Hero-altı bölümlerde (HowItWorks, Sektörler, Bunker sol metin, Forum, Chatbot, Credibility) metin alan üzerinde net okunur
- [ ] **dark tema (gözle):** Aynı bölümlerde metin okunur (panel renkleri temada ters döner — iki tema ayrı doğrulanır)
- [ ] Metin-yoğun bölümlerde alan belirgin soluk; nefes alan bölümde daha görünür → tek-tip değil, uyarlanmış
- [ ] "Tek bütün alan"/imza sürekliliği korunuyor; göz yorgunluğu / şablon-kokusu ön-incelemede yok (kesin craft hakemliği TASK-12.03)
- [ ] Mevcut a11y tohumu (`home-a11y.spec.ts` light+dark) regresyonsuz — 0 ihlal
- [ ] i18n parite tohumu (`i18n-parity.test.ts`) yeşil (yeni anahtar yok — değişmemiş beklenir)

---

## Karar Noktaları

- **Scrim mekanizması — global veil vs per-section scrim:**
  - **(A) Global veil (öneri, başlangıç):** `FlowBackdrop` alanı, Hero-altında globalde soluklaştıran token-bazlı dikey/radyal scrim taşır; bölümlerin mevcut arka planları (`bg-canvas-deep/40`, kartlar) lokal lift sağlar → **bölüm dosyalarına dokunulmaz** (en az yüzey, en düşük risk).
  - **(B) Per-section scrim (TK3 literal):** Yalnız global veil kontrast=100'ü sağlayamayan **belirli** bölüme (muhtemelen HowItWorks) ek scrim/opaklık.
  - **Öneri:** A ile başla; yalnız bir bölüm kontrastta zorlanırsa o bölüme B uygula. Böylece dosya sayısı düşük kalır ("1-3 dosya"). Craft son hakem.
- **Aşağı kesim noktası (açık uç):** İplik Credibility'de mi sönümlenir yoksa Footer'a kadar (opak Footer zaten örter) mı iner → **Öneri:** zorunlu kesme kodu yok; Footer'ın opaklığı doğal kesim. Estetik "sönümleme" isteniyorsa hafif alt-fade — düşük-riskli craft ayarı, gate task'ta ince ayar.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md ve PHASE-12.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-03
