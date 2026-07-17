# TASK-17.06: S2 — Tam TR Yolculuğu (ana sayfa → alt sayfalar, Alpfit Plus odak)

**Durum:** ⬜ Bekliyor
**Modül:** M2 Sayfalar (+M3 Etkileşim) (modules/M2-Sayfalar-Bolumler.md, M3-Etkilesim-Primitives.md)
**Feature:** S2 senaryo grubu — tam TR yolculuğu (doğrulama; milestone TR-birincil çekirdek)
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.05 ✅ (lineer sıra; aynı runtime katmanı)

---

## Hedef

**TR birincil** (`NEXT_LOCALE=tr` cookie) uçtan-uca kullanıcı yolculuğunu **gerçek tarayıcı runtime** (`page.route` nav/CTA tık) + prerender grep ile doğrula: ana sayfa Hero → ikincil CTA → sektörler (**Alpfit çıkışı → yeni Alpfit Plus sayfası**) → 4-adım → Crew OS (`/crew-os`) → Forum → Footer; **ana sayfadan alt sayfalara çıkış/dönüş** (özellikle **yeni Alpfit Plus sayfasına çıkış/dönüş** — v0.4 asıl delta) → içerik bütünlüğü; **`<Logo>` her yüzeyde tutarlı**; CTA/nav doğru, **kopuk link / `/tr/`-sızıntı / boş bölüm yok**. Bu milestone item 4'ün (TR yolculuğu birincil bütünsel-tutarlı) çekirdek doğrulamasıdır. Tamamlanma = yolculuk runtime'da koşuldu, triyajlı PHASE-17'ye kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S2 araç satırı (A: prerender grep + C: `page.route` nav/CTA tık) + Milestone item 4 (TR birincil, **özellikle Alpfit Plus'a çıkış/dönüş**) + Dikkat Edilecekler (locale tuzağı, selector teyidi)
- `_dev/memory/runtime-harness-selector-teyidi.md` — SPA-nav `<Link>` (full-reload yok); anchor settle Lenis; Chatbot inline `#chat`
- `_dev/MEMORY.md` → locale tuzağı (TR = `NEXT_LOCALE=tr` cookie) + `sandbox-runtime-browser-page-route.md` (`next start` denenmez)
- `src/app/[locale]/page.tsx` (ana sayfa bölüm sırası), `src/components/alpfit/AlpfitShowcase.tsx` (Alpfit hedef içerik)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.06 durumu + S2 bulgu notu

---

## Alt Görevler

- [ ] **1. Ana sayfa bölüm bütünlüğü (TR, cookie)**
  - Bölüm sırası birebir (top → how → sectors → bunker/crew teaser → forum → contact); **boş bölüm yok**; anchor'lar Lenis ile settle (ilk denemede)
  - Hero ikincil CTA mevcut ve doğru hedef

- [ ] **2. Ana sayfa → alt sayfa çıkışları (özellikle Alpfit Plus)**
  - Sektörlerden **Alpfit çıkışı → `/spor-salonu-yazilimi` (yeni Alpfit Plus sayfası)** — SPA-nav (`<Link>`, full-reload yok) → tek `<main>` / 0 MISSING / Alpfit içeriği tam (9 bölüm) → **history-back ana sayfa sağlam**
  - Crew OS çıkışı → `/crew-os` (200, `/bunker-os` href sızıntısı YOK); vaka + 2 bülten çıkış href'leri mevcut

- [ ] **3. Link hijyeni & Logo tutarlılığı**
  - **`/tr/`-sızıntı YOK** (TR prefixsiz); kopuk link / dead-`#` YOK; `<Logo>` home + Alpfit + crew header'da tutarlı (ortak bileşen)

- [ ] **4. Triyaj & kayıt**
  - Kapsam-içi bug → düzeltme task'ı; anchor/SPA harness artefaktı ≠ gerçek bug; PHASE-17 kaydı

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Runtime harness geçici (koşulur, silinir). Referans tanımlayıcılar ZATEN-VAR (ana sayfa + Alpfit + Logo repoda). YENİ kalıcı dosya yok. -->

```
_dev/
├── tasks/TASK-17.06.md          # Oturum kaydı + yolculuk sonuçları
├── phases/PHASE-17.md           # Task Listesi 17.06 + notu
└── DURUM.md                     # Aktif task + özet
(geçici runtime harness proje-içine yazılıp koşulduktan sonra silinir — commit'lenmez)
```

---

## Dikkat Noktaları

- **Locale tuzağı (memory):** TR yolculuğu için `NEXT_LOCALE=tr` cookie şart (yoksa Accept-Language ile `/en`'e sapar). Yolculuk boyunca TR kalmalı; `/tr/` prefix sızıntısı bug.
- **SPA-nav teyidi (memory):** alt sayfa çıkışları `<Link>` → full-reload yok (SPA-marker survive); history-back ana sayfayı remount etmeden getirir. Selector/mekanizma kaynaktan teyit.
- **Alpfit çıkış/dönüş = v0.4 asıl delta odağı:** Faz 14'te bu route eski gym showcase'ti; şimdi Alpfit Plus. Çıkışta 9 bölüm tam, dönüşte ana sayfa sağlam olmalı.
- **`next start` DENENMEZ (memory):** `page.route` interception; anchor settle Lenis ilk-deneme (settle etmezse önce harness artefaktı mı diye sor).

---

## Test Kriterleri

- [ ] Ana sayfa bölüm sırası birebir + boş bölüm yok; anchor'lar settle; Hero ikincil CTA doğru
- [ ] Alpfit çıkışı → `/spor-salonu-yazilimi` SPA-nav (full-reload yok) → tek `<main>`/0 MISSING/9 bölüm tam → history-back ana sayfa sağlam
- [ ] Crew OS → `/crew-os` (200, `/bunker-os` href sızıntısı 0); vaka + 2 bülten çıkış href'leri mevcut
- [ ] `/tr/`-sızıntı YOK; kopuk link/dead-`#` YOK; `<Logo>` home+Alpfit+crew tutarlı
- [ ] Harness artefaktı ≠ gerçek bug ayrımı; bulgular triyaj + PHASE-17'ye; kaynak kod değişmedi; geçici harness silindi

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [durum]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
