# TASK-9.07: S2 — Tam TR Yolculuğu & Alt-Sayfa Çıkış/Dönüş

**Durum:** ⬜ Bekliyor
**Modül:** M2 Sayfalar (+M3 Etkileşim) (modules/M2-Sayfalar-Bolumler.md, M3-Etkilesim-Primitives.md)
**Feature:** S2 senaryo grubu — tam TR yolculuğu (doğrulama)
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.06 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

**TR birincil** yolculuğu uçtan-uca doğrula: ana sayfa akışı (Hero → ikincil CTA → sektörler [gym + Alpfit çıkış] → 4-adım → Crew OS → Forum/Bülten → Footer) + ana sayfadan alt sayfalara **çıkış/dönüş** (Alpfit / Crew OS / vaka / bülten client-nav → alt sayfa içerik bütünlüğü → geri dönüş). curl+grep ile link/href/bölüm bütünlüğü + standalone Playwright ile CTA/anchor scroll ve client-nav. Kopuk link, boş bölüm, yanlış CTA hedefi yok. Tamamlanma = TR yolculuğu (ana sayfa + alt sayfa çıkış/dönüş) koşuldu, bütünlük kaydedildi, triyaj yapıldı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S2 araç satırı + "Sahipsiz Alan" (alt sayfa dikişleri = asıl yeni yüzey; client-nav vs SSG geçişleri)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — ana sayfa bölüm sırası + alt sayfa IA
- `src/app/[locale]/page.tsx` + alt sayfa `page.tsx`'leri, `tests/e2e/a11y-helpers.ts` (`gotoLocalized`/`scrollThrough`)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.07 durumu + S2 bulgu notu

---

## Alt Görevler

- [ ] **1. Ana sayfa akış bütünlüğü (curl+grep)**
  - Fresh prod build serve (PID teyit); TR ana sayfada bölüm sırası tam: Hero → ikincil CTA → sektörler (gym + Alpfit çıkış link'i) → 4-adım (Analiz·Çözüm·Otomasyon·Raporlama) → Crew OS → Bülten → Footer
  - Kopuk link/href yok; boş bölüm yok

- [ ] **2. CTA & anchor davranışı (standalone Playwright)**
  - Hero ikincil CTA + bölüm CTA'ları doğru hedefe gider; anchor scroll (`#sectors` vb.) doğru bölüme kayar (ScrollTrigger); scratchpad script (repo dışı)

- [ ] **3. Alt sayfaya çıkış/dönüş (client-nav)**
  - Ana sayfadan Alpfit (`/spor-salonu-yazilimi`), Crew OS (`/bunker-os`), vaka (`/vaka-calismalari`), bülten (`/bulten/...`) çıkışları **client-nav** ile gider; alt sayfa **içerik bütün** (hero + gövde render); geri dönüş (nav/back) ana sayfayı bozmadan getirir

- [ ] **4. Triyaj & kayıt**
  - Bulgular TK7 triyaj; sonuç task Oturum Kaydı + PHASE-9 notu

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Playwright script scratchpad'de. -->

```
scratchpad/  (commit'lenmez)
└── s2-tr-yolculuk.mjs          # YENİ — standalone Playwright sürücü (repo dışı)
_dev/
├── tasks/TASK-9.07.md          # Oturum kaydı + bulgular
├── phases/PHASE-9.md           # Task Listesi 9.07 + S2 notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **Alt sayfa dikişleri = asıl yeni yüzey** (Faz 3'te alt sayfa kapsam dışıydı). Client-nav vs SSG geçiş davranışı asıl bilinmeyen — çıkış/dönüşte içerik bütünlüğü + state korunması gözlenir.
- **Locale tuzağı:** TR yolculuk prefixsiz → `NEXT_LOCALE=tr` cookie (`gotoLocalized`); curl'de aynı cookie.
- **Bülten çıkışı:** ana sayfa "Bülten" bölümü → makale sayfaları; çıplak `/bulten` index'i yok (404, TASK-9.01 bulgusu) — yolculukta doğru **makale** link'lerine gidildiğini teyit et.
- Kanonik ortam = fresh prod build.

---

## Test Kriterleri

- [ ] TR ana sayfa bölüm sırası tam, kopuk link/boş bölüm yok
- [ ] Hero ikincil CTA + bölüm CTA'ları + anchor scroll doğru hedefe gider (ScrollTrigger stabil)
- [ ] 4 alt sayfa çıkışı client-nav ile gider, içerik bütün, dönüş ana sayfayı bozmaz
- [ ] Standalone script scratchpad'de kaldı; bulgular triyajlı PHASE-9 + task doc'a yazıldı
