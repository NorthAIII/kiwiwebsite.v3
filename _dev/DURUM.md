# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — research-phase 5: Faz 5 (v0.2 test altyapısı D1) teknik araştırma tamamlandı. Sürümler ampirik saptandı (vitest 4.1.9 / @playwright/test 1.61.1 / @axe-core/playwright 4.12.1); i18n paritesi şu an tam (5×183 anahtar); Playwright/axe taze install gerekir (Faz 4 npx'ti). 2 karar: axe=WCAG etiketleri, DOM katmanı şimdi kur+minik smoke (seed=3 kanıtlı katman). Bulgular PHASE-5'e + mimari özet DECISIONS'a yazıldı. Versiyon Sonu Durumu içerik_fazları (değişmez). **Adım=plan** (sıradaki: plan-phase 5).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 5 — Test altyapısı (D1). 🔄 **research tamamlandı** (research-phase 5, 2026-06-30); discuss ✅. Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** plan → `/devflow:plan-phase 5`: harness kurulumu + 3 tohum + CI için task yazımı (yeni oturum).
**İlerleme:** Yığın doğrulandı (sürümler ampirik): **vitest 4.1.9 (node+jsdom) + @vitejs/plugin-react + @testing-library/react 16.3.2 + jest-dom + jsdom + @playwright/test 1.61.1 + @axe-core/playwright 4.12.1** — hepsi taze devDependency (install anında teyit). CI: **ilk GitHub Actions** (2 job: build+vitest hızlı / playwright-a11y chromium). Tohum (3 kanıtlı katman): **i18n 5-dil parite** node/Vitest (şu an tam: 5×183 anahtar) + **component smoke** jsdom + **a11y regresyon `/` light+dark** Playwright/axe. **🔴 En kritik risk:** Faz 4 a11y=100 Lighthouse alt-kümesiydi; ham axe full-ruleset ≠ 0 ihlal garantisi → axe kapsamı **WCAG etiketleri** (karar), plan/icrada `/` light+dark ampirik koş. **Çapraz konu:** devDependency install anında teyit; araç davranışını ampirik yokla. **Devralınan borç:** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi (harness sonra genişletir).
**Son Faz Dokümanı:** `phases/PHASE-5.md` (🔄 research tamamlandı — Araştırma Bulguları dolu)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — Aktif task yok. Faz 5 discuss ✅ + research ✅; task'lar plan-phase 5 sonrası oluşur.
**Durum:** Faz 5 (test altyapısı D1) 🔄 — kapsam + araştırma tamamlandı. Sıradaki adım faz döngüsünde plan-phase 5 (task değil).
**İlerleme:** `/devflow:plan-phase 5` ile harness kurulumu + 3 tohum + CI task'larını yaz (yeni oturum).

---

## Task Durumu (Aktif Faz)

> Faz 5 (test altyapısı D1) 🔄 — discuss ✅ + research ✅, **henüz planlanmadı** (plan-phase 5 sonrası task'lar oluşur). Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Faz 5 henüz planlanmadı (plan-phase 5 sonrası) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

> Faz geçişinde sıfırlandı (Faz 4 ✅ → Faz 5 discuss). Faz 4 task özetleri `phases/PHASE-4.md` + `tasks/archive/TASK-4.0*.md`'de. Faz 5 task'ları çalışıldıkça buraya eklenir.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** — yok; Faz 5 discuss ✅ + research ✅. Sıradaki adım: `/devflow:plan-phase 5` (harness + tohum + CI task yazımı)
**Aktif Faz:** 5 — Test altyapısı (D1) 🔄 · adım=plan; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — research-phase 5: teknik araştırma tamamlandı. Bulgular PHASE-5 "Araştırma Bulguları"na, mimari özet DECISIONS'a yazıldı. Sürümler ampirik (vitest 4.1.9 / playwright 1.61.1 / axe-core/playwright 4.12.1); 2 karar (axe=WCAG etiketleri, DOM şimdi kur+smoke). Adım=plan → plan-phase 5.
