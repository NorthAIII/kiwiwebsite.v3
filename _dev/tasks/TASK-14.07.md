# TASK-14.07: S2 — Tam TR Yolculuğu (ana sayfa → alt sayfalar)

**Durum:** ⬜ Bekliyor
**Modül:** M2 Sayfalar (+M3 primitives) (modules/M2-Sayfalar-Bolumler.md)
**Feature:** S2 senaryo grubu — tam TR yolculuğu — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.06 ✅ (lineer sıra; runtime harness zemini hazır)

---

## Hedef

**TR birincil** yolculuğunu uçtan-uca doğrula (system Chrome + prerender HTML, `NEXT_LOCALE=tr` cookie): Hero → ikincil CTA → sektörler (gym + Alpfit çıkış) → 4-adım → **Crew OS (çıkış artık `/crew-os`)** → Forum → Footer; + ana sayfadan alt sayfalara çıkış (Alpfit/Crew OS/vaka/bülten) → içerik bütünlüğü → **history-back dönüş** (ana sayfayı bozmadan); **`<Logo>` her yüzeyde tutarlı** (Faz 10). CTA/nav doğru, kopuk link / `/tr/`-sızıntı / boş bölüm yok. Tamamlanma = yolculuk adımları koşuldu, sonuç triyajlı kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S2 satırı (system Chrome + prerender HTML; `<Logo>` tutarlılık, `/tr/` sızıntı yok, kopuk link yok); Sahipsiz Alan → `/crew-os` çıkış + `<Logo>` (Faz 10) notları
- `_dev/memory/runtime-harness-selector-teyidi.md` — anchor/nav mekanizması (Lenis smooth-scroll settle; ScrollTrigger)
- `_dev/MEMORY.md` → locale tuzağı (`NEXT_LOCALE=tr` cookie); Faz 9 emsali (#forum ilk-FAIL Lenis settle artefaktıydı)
- `src/components/` — Hero, Nav, sektör seçici, Bunker (Crew OS teaser), Footer, Logo

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.07 durumu + S2 bulgu notu

---

## Alt Görevler

- [ ] **1. Ana sayfa bölüm sırası & bütünlük**
  - Bölüm sırası tam (Hero → nasıl-çalışır → sektörler → Crew OS teaser → forum → contact); boş bölüm yok
  - Anchor scroll: Hero CTA + Nav anchor'ları (`#sectors`/`#contact`/`#how`/`#forum` + Crew OS anchor) → hedef bölüme settle (Lenis lerp settle → reload+poll ile top≈0; ilk-FAIL artefakt olabilir — memory)

- [ ] **2. Çıkış href'leri & `/crew-os` rename**
  - Ana sayfadan çıkış link'leri mevcut ve doğru: Alpfit (`/spor-salonu-yazilimi`), **Crew OS (`/crew-os` — artık `/bunker-os` değil)**, vaka (`/vaka-calismalari`), 2 bülten
  - dead-`#` / `/tr/`-sızıntı yok (TR prefixsiz); çift-redirect yok (`/crew-os` doğrudan 200, redirect'e girmiyor)

- [ ] **3. Alt sayfa çıkış → içerik → dönüş**
  - 4 alt sayfaya client-nav çıkış (SPA-marker korundu = full-reload yok) → içerik bütün (5 alt sayfa 200, tek `<main>`, 0 MISSING)
  - **history-back dönüş** ana sayfayı bozmadan (bölümler sağlam)

- [ ] **4. `<Logo>` tutarlılık (Faz 10)**
  - Ortak `<Logo>` her yüzeyde (Nav + varsa PageHeader/Footer) tutarlı hizalama/ölçek — home + alt sayfalarda aynı bileşen

- [ ] **5. Triyaj & kayıt**
  - Kapsam-içi bug (kopuk link, `/tr/` sızıntı, Crew OS çıkışı hâlâ `/bunker-os`, Logo tutarsız, dönüşte bozulma) → düzeltme task'ı önerisi
  - Anchor ilk-FAIL'ları önce **ölçüm artefaktı mı** diye teyit et (Lenis settle) — kör red yok

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Harness geçici. YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-14.07.md          # Oturum kaydı + S2 yolculuk
├── phases/PHASE-14.md           # Task Listesi 14.07 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **`/crew-os` çıkış (v0.3 kritik):** Crew OS teaser CTA + herhangi iç link artık `/crew-os`'a işaret etmeli (Faz 11 SEO3 iç link temizliği). `/bunker-os` görürsen kapsam-içi bug (redirect var ama çift-hop = craft borcu). Doğrudan `/crew-os` 200 olmalı.
- **Locale tuzağı:** TR yolculuğu `NEXT_LOCALE=tr` cookie ile (cookie'siz `/en`'e sapar).
- **Anchor Lenis settle (Faz 9 dersi):** `#forum`/`#how` gibi anchor'lar Lenis lerp:0.1 ile settle eder → ilk okuma top≠0 **artefakt** olabilir; reload+poll ile top≈0 teyit. Kör FAIL yazma.
- **`<Logo>` (Faz 10):** ortak bileşen — home ve alt sayfada aynı render; tutarsızlık kapsam-içi bug.

---

## Test Kriterleri

- [ ] Ana sayfa bölüm sırası tam, boş bölüm yok; anchor'lar hedefe settle (top≈0)
- [ ] Çıkış href'leri doğru: Crew OS = `/crew-os` (eski `/bunker-os` değil), Alpfit/vaka/2 bülten mevcut; dead-`#`/`/tr/`-sızıntı yok
- [ ] 4 alt sayfa client-nav çıkış (SPA korundu) → içerik bütün (200, tek `<main>`, 0 MISSING) → history-back dönüş bozmadan
- [ ] `<Logo>` her yüzeyde tutarlı
- [ ] Bulgular triyajlı (anchor ilk-FAIL artefakt teyidi dahil) PHASE-14 + task doc'a

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldur]

**Bulgular / Triyaj:**
- [TR yolculuğu; kapsam-içi bug var/yok; artefakt teyitleri]

**Kaynak kod değişmedi** (doğrulama fazı).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
