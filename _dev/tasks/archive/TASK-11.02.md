# TASK-11.02: i18n namespace rename `bunkerOs`→`crewOs` + `bunker`→`crew` (5-dil, atomik)

**Durum:** ✅ Tamamlandı
**Modül:** M4 (i18n & Yerelleştirme) + M2 (tüketiciler) — `modules/M4-i18n.md`
**Feature:** SEO2 — i18n namespace `bunkerOs`/`bunker` → crew-tabanlı adlara rename (5-dil eşzamanlı)
**Faz:** Phase 11 (phases/PHASE-11.md)
**Bağımlılıklar:** TASK-11.01 ✅ (route klasörü `crew-os/`'a taşındı — `crew-os/page.tsx` bir tüketici)

---

## Hedef

İç kod adına dayalı i18n namespace'lerini public ada hizala: showcase namespace `bunkerOs` → `crewOs`, ana sayfa teaser namespace `bunker` → `crew`. Rename **5 dilde eşzamanlı** (tr/en/ar/de/es) + **tüm tüketicilerde** aynı anda yapılır — anahtar-adı değişimi olduğu için "stale kopya" istisnası dışında, eksik/desync anahtar = runtime `MISSING_MESSAGE` (pazarlık-dışı). Değerler değişmez (TR tek kaynak; değerler zaten "Crew OS" markalı). Tamamlanma: `next build` **0 `MISSING_MESSAGE`**, tüm alt sayfalar SSG render, i18n-parite testi yeşil.

---

## Bağlam

Namespace rename = **yapısal anahtar değişimi** → DECISIONS 2026-06-28 i18n rename disiplini geçerli: 5 dilde eşzamanlı, eksik anahtar yasak (MEMORY "Süreç Disiplinleri": anahtar varlığı ≠ değer tazeliği). Bu faz metin **çevirmez** — yalnız anahtar taşır; değer stale-liği zaten minimal (değerler "Crew OS"). İki namespace **ayrık kalır** (teaser `crew` ≠ showcase `crewOs`) — discuss kararı. Adlar research-phase'de kesinleşti: `crewOs`/`crew`.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-11.md` — Araştırma Bulguları (7+2 tüketici envanteri, JSON @131/@152 satırları, i18n-parite test davranışı) + Kapsam Tartışması (i18n yapısal rename disiplini)
- `_dev/modules/M4-i18n.md` — F4.2 (5-dil anahtar seti, stale-kopya vs eksik-anahtar ayrımı)
- `_dev/docs/DECISIONS.md` — 2026-06-28 i18n rename (anahtar-rename istisna-dışı)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-11.md` — Task Listesi tablosunda 11.02 durumu

---

## Alt Görevler

- [x] **1. `bunkerOs` → `crewOs` rename (showcase namespace, 7 tüketici)**
  - **JSON (5 dosya):** `messages/{tr,en,ar,de,es}.json` — top-level `"bunkerOs":` anahtarı (≈satır 152) → `"crewOs":`. İçerik/değerler **değişmez**, yalnız anahtar adı.
  - **Tüketiciler (7):**
    - `src/app/[locale]/crew-os/page.tsx` — `namespace: "bunkerOs"` ×2 (metadata + page) → `"crewOs"`
    - `src/components/bunker-os/BunkerShowcase.tsx:9` — `useTranslations("bunkerOs")` → `"crewOs"`
    - `src/app/[locale]/spor-salonu-yazilimi/page.tsx:27` — `namespace: "bunkerOs"` → `"crewOs"`
    - `src/app/[locale]/vaka-calismalari/page.tsx:31` — `namespace: "bunkerOs"` → `"crewOs"`
    - `src/app/[locale]/bulten/ai-sdr-araclari/page.tsx:26` — `namespace: "bunkerOs"` → `"crewOs"`
    - `src/app/[locale]/bulten/claude-opus-4-8-fable-5/page.tsx:32` — `namespace: "bunkerOs"` → `"crewOs"`

- [x] **2. `bunker` → `crew` rename (ana sayfa teaser namespace, 2 tüketici)**
  - **JSON (5 dosya):** `messages/{tr,en,ar,de,es}.json` — top-level `"bunker":` anahtarı (≈satır 131) → `"crew":`. **DİKKAT:** satır ~10'daki `nav.bunker` (nav namespace içindeki `"bunker": "Crew OS"` **label**'ı) **DEĞİL** — o dokunulmaz (bkz. Dikkat Noktaları).
  - **Tüketiciler (2):**
    - `src/components/Bunker.tsx:8` — `useTranslations("bunker")` → `"crew"`
    - `src/components/bunker-os/BunkerShowcase.tsx:10` — `useTranslations("bunker")` (`tb`) → `"crew"`

- [x] **3. Doğrulama**
  - Grep: repoda kalan `"bunkerOs"` / `namespace: "bunker"` / `useTranslations("bunker")` referansı **kalmadığını** teyit et (nav/section-id/keyframe hariç — aşağıda).
  - `next build` → 0 `MISSING_MESSAGE`.

---

## Etkilenen Dosyalar

```
messages/tr.json                                          # "bunkerOs"→"crewOs" (@152), "bunker"→"crew" (@131)
messages/en.json                                          # aynı
messages/ar.json                                          # aynı
messages/de.json                                          # aynı
messages/es.json                                          # aynı
src/app/[locale]/crew-os/page.tsx                         # namespace ×2 → "crewOs"
src/components/bunker-os/BunkerShowcase.tsx               # "bunkerOs"→"crewOs" (l.9), "bunker"→"crew" (l.10)
src/app/[locale]/spor-salonu-yazilimi/page.tsx           # namespace → "crewOs"
src/app/[locale]/vaka-calismalari/page.tsx               # namespace → "crewOs"
src/app/[locale]/bulten/ai-sdr-araclari/page.tsx         # namespace → "crewOs"
src/app/[locale]/bulten/claude-opus-4-8-fable-5/page.tsx # namespace → "crewOs"
src/components/Bunker.tsx                                 # "bunker"→"crew" (l.8)
```

---

## Dikkat Noktaları

- **Atomiklik pazarlık-dışı:** 5 JSON + tüm tüketiciler **aynı commit'te**. Bir tüketici atlanırsa → runtime `MISSING_MESSAGE` (build SSG prerender'da yakalar). Bir dil atlanırsa → o dilde boşluk. (MEMORY Süreç Disiplinleri: anahtar varlığı ≠ değer tazeliği.)
- **`nav.bunker` label DOKUNULMAZ** — `messages/*.json` satır ~10'daki `"bunker": "Crew OS"` **nav namespace içindedir** (`Nav.tsx:23` `t("bunker")` altında `useTranslations("nav")`). Bu ana sayfa section-anchor label'ıdır, URL taksonomisi değil. Yalnız **top-level** `"bunker"` (@131) ve `"bunkerOs"` (@152) rename edilir. JSON'da iki farklı `"bunker"` var — karıştırma.
- **Kapsam-dışı kod tanımlayıcıları (dokunma):** `Bunker.tsx:19` `id="bunker"` section id, `Nav.tsx:23` `href: "#bunker"`, `BunkerShowcase.tsx:117,220` `@keyframes bunkerback` — iç kod adı, taksonomi izin veriyor.
- **Component dosya/dizin adları DOKUNULMAZ** (`components/bunker-os/`, `Bunker.tsx`, `BunkerShowcase.tsx`) — yalnız içlerindeki i18n namespace string'i değişir.
- **`BunkerShowcase.tsx` iki namespace tüketir** — `bunkerOs` (l.9, `t`) **ve** `bunker` (l.10, `tb`). İkisi de rename edilir (biri crewOs, biri crew).
- **Değerler değişmez** — yalnız anahtar adı. Çeviri güncellemesi (değer) versiyon-sınırına ertelenir; bu faz metin çevirmez.
- **i18n-parite testi kod değişmez** — `tests/i18n-parity.test.ts` anahtar **kümesini** karşılaştırır, namespace adına string-referans vermez → 5 dosyada eşit rename edilirse yeşil kalır.

---

## Test Kriterleri

- [x] `next build` **temiz** + **0 `MISSING_MESSAGE`** (tüm alt sayfalar 5 locale SSG prerender — showcase, spor-salonu, vaka, 2 bülten). ✓ `✓ Compiled successfully`, grep MISSING_MESSAGE/error/warn = 0.
- [x] i18n-parite testi (`tests/i18n-parity.test.ts`, Vitest) **yeşil** — 5 dilde anahtar seti eşit (`crewOs`+`crew` her dilde var, `bunkerOs`+`bunker` [top-level] hiçbir dilde kalmadı). ✓ 5/5.
- [x] Grep teyidi: `grep -rn '"bunkerOs"\|namespace: "bunker"\|useTranslations("bunker")' src/ messages/` → **0 sonuç** (nav.bunker/#bunker/keyframe hariç, onlar zaten farklı desen). ✓ 0 sonuç.
- [x] Showcase (`/crew-os`) + spor-salonu + vaka + 2 bülten sayfası 5 locale'de metin **boşluksuz** render. ✓ prerender HTML (build ground-truth): crew-os 5 locale "Crew OS" başlık + eyebrow; home teaser TR "keşfet"/"yaşadığı ve çalıştığı", EN "Explore" — placeholder yok.
- [x] a11y **korunan taban** regresyonsuz (namespace rename görsel/DOM değiştirmez; `subpages-a11y.spec.ts` yeşil). ✓ `--grep crew-os` **10/10** (5 locale × 2 tema).

---

## Risk ve Geri Dönüş Planı

- **Tüketici atlama → `MISSING_MESSAGE`:** Alt görev envanteri (7+2) tam; grep teyidi (Test Kriteri) atlanan tüketiciyi yakalar; build SSG prerender'da patlar.
- **Yanlış `bunker` rename (`nav.bunker`):** JSON'da @131 (top-level) hedeflenir, @10 (nav içi) değil — Edit'te bağlam satırıyla ayırt et.
- **Rollback:** `git checkout -- messages/ src/` — tek commit, geri dönüşü kolay (kod mantığı değişmez, yalnız string anahtar).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (`refactor(TASK-11.02): ...`)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md + PHASE-11.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-02 (run-task)

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Alt görev 1 (`bunkerOs`→`crewOs`, 7 tüketici):** 5 JSON top-level `"bunkerOs"`@152 → `"crewOs"` (satır-başı 2-boşluk ankraj → `nav.bunker` [4-boşluk] etkilenmez); 7 kod tüketicisi (`crew-os/page.tsx` ×2, `BunkerShowcase.tsx:9`, `spor-salonu`/`vaka`/2 bülten) `namespace/useTranslations` → `crewOs`.
- **Alt görev 2 (`bunker`→`crew`, 2 tüketici):** 5 JSON top-level `"bunker"`@131 → `"crew"`; `Bunker.tsx:8` + `BunkerShowcase.tsx:10` (`tb`) `useTranslations("bunker")` → `"crew"`.
- **Değerler dokunulmadı** (TR tek kaynak; zaten "Crew OS" markalı). **Dokunulmayanlar teyitli:** `nav.bunker` label ("Crew OS" 5 dil), `id="bunker"`, `href="#bunker"`, `@keyframes bunkerback`, component dosya/dizin adları.

**Son Yaklaşım:** Atomik mekanik rename `sed` ile (5 JSON + 7 kod dosyası tek geçişte), ardından çok-katmanlı ampirik doğrulama. `bunker")` exact-string ankrajı `bunkerOs")`'u etkilemedi.

**Doğrulama (ampirik):**
- Grep: kalan `"bunkerOs"`/`namespace: "bunker"`/`useTranslations("bunker")` = **0**; yeni tüketiciler 7 crewOs + 2 crew.
- JSON sözdizimi 5 dil `JSON.parse` OK; 5 dilde 2 top-level anahtar (`crew`+`crewOs`).
- i18n-parite (Vitest) **5/5** yeşil.
- `next build` **temiz** (`✓ Compiled successfully`), 0 `MISSING_MESSAGE`/error/warn; crew-os + tüketiciler 5 locale SSG prerender.
- Prerender HTML (ground-truth): crew-os 5 locale + home teaser boşluksuz render.
- `subpages-a11y --grep crew-os` **10/10** (5 locale × 2 tema) — korunan taban regresyonsuz.

**Sonraki Adım Detayı:** Faz 11'de TASK-11.03 (SEO3: iç link `/bunker-os`→`/crew-os`, Hero+Bunker; çift-redirect kaldır) kaldı. Ayrı oturum `run-task`.

---

**Oluşturulma:** 2026-07-02 (plan-phase 11)
