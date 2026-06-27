# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-28 — run-task: TASK-1.02 tamam (R2 — gym paneli tek-otomasyona: `sectors.gyms.automation/.body` TR "Kaçan üyeyi geri kazanma" anlatısı; saf i18n, component+korunan dallar dokunulmadı; build temiz, TR render + AR stale teyit); İlerleme 2/3, sıradaki TASK-1.03.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 1 — Ana sayfa TR içerik & ses revizesi
**Milestone:** v0.1 ana sayfa içerik & ses: R1 Nasıl Çalışır 4 adım (Analiz·Çözüm·Otomasyon·Raporlama) + R2 gym paneli tek-otomasyona + F5 dürüstlük taraması + F6 hero ikincil CTA; TR tek kaynak
**Adım:** task → `/devflow:run-task`
**İlerleme:** 2/3 task (TASK-1.01 ✅, TASK-1.02 ✅; sıradaki TASK-1.03)
**Faz Dokümanı:** `phases/PHASE-1.md`

---

## Aktif Versiyon

**Versiyon:** v0.1 — Ana sayfa TR içerik & ses revizesi (güçlü revizenin ilk versiyonu; baz: v3 canlı)
**Hedef:** Nasıl Çalışır 4 adım (R1) + Sektörler gym paneli tek-otomasyona (R2) + dürüstlük taraması (R4/F5) + hero ikincil CTA (R4/F6) ana sayfada tamam; marka sesi tutarlı; TR tek kaynak (çeviri versiyon-sınırına ertelendi)
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-1.03 — R4 Ana sayfa ses & dürüstlük (F6 hero ikincil CTA + F5 dürüstlük taraması + R3 Crew OS teyidi) — `tasks/TASK-1.03.md`
**Durum:** ⬜ Bekliyor (run-task ile başlanır)
**İlerleme:** TASK-1.01 + TASK-1.02 tamamlandı; sıradaki adım TASK-1.03 çalıştırma

---

## Task Durumu (Aktif Faz)

| # | Task | Durum |
|---|------|-------|
| 1.01 | R1 — Nasıl Çalışır 3→4 adım (component + 5-dil i18n) | ✅ Tamamlandı |
| 1.02 | R2 — Sektörler gym paneli tek-otomasyona (TR i18n) | ✅ Tamamlandı |
| 1.03 | R4 — Ana sayfa ses & dürüstlük (F6 + F5/R3 checkpoint) | ⬜ Bekliyor |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-1.02 — R2 Sektörler gym paneli tek-otomasyona** (✅ 2026-06-28)
- `sectors.items.gyms.automation` "Spor Salonu Yönetim Yazılımı" → "Kaçan üyeyi geri kazanma"; `.body` özellik-listesi → tek-otomasyon anlatısı (`gyms.flow` ile tutarlı, 181 char).
- Saf i18n (yalnız TR); `SectorSolutions.tsx` + korunan dallar (live rozeti, flow, seeLive/viewApp CTA, `/spor-salonu-yazilimi`) dokunulmadı; non-TR stale-kopya (versiyon-sınırı).
- Build temiz; TR render (curl) + Playwright snapshot/screenshot teyit, AR stale-kopya doğru çalışıyor.

**TASK-1.01 — R1 Nasıl Çalışır 3→4 adım** (✅ 2026-06-28)
- `how` namespace 5 dilde `analyze`/`design`/`automate`/`report`'a yeniden adlandırıldı (atomik, tek commit); `listen`/`find` silindi, eksik anahtar yok.
- TR tam metin tek kaynak; non-TR cerrahi (stale + yalnız `design` çevirisi, `automate`→`report` ölçüm bölme/tekrar önleme), başlık sayı-sözcüğü güncel.
- `HowItWorks.tsx` 4-adım responsive grid + 4-düğüm bağlayıcı; build temiz, 5 locale 4 kart, AR RTL doğrulandı.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-1.03 (`tasks/TASK-1.03.md`)
**Aktif Faz:** 1 (Adım: task → `/devflow:run-task`)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-28 — run-task: TASK-1.02 tamam (R2 — gym paneli tek-otomasyona: `sectors.gyms.automation/.body` TR "Kaçan üyeyi geri kazanma" anlatısı; saf i18n, component+korunan dallar dokunulmadı; build temiz, TR render + AR stale teyit); İlerleme 2/3, sıradaki TASK-1.03.
