# TASK-18.01: Branch finalize — v0.4 doc-merge → main + v0.5 branch aç

**Durum:** ⬜ Bekliyor
**Modül:** M6-SEO-Deploy (operasyonel — yayın/branch katmanı)
**Feature:** C1 (operasyonel ön-koşul)
**Faz:** Phase 18 (phases/PHASE-18.md)
**Bağımlılıklar:** Yok (Faz 18'in ilk task'ı)

---

## Hedef

v0.5 kod çalışması için temiz branch zemini kur. `revize/v0.4-versiyon-sonu` → `main` **doc-only** merge finalize edilir (v0.4 kodu zaten canlı → içerik değişmez, no-op rebuild); ardından `main`'den temiz `revize/v0.5-chatbot-groq` branch'i açılır. Sonraki tüm Faz 18 task'ları (18.02+) bu branch'te koşar. Tamamlanma: main v0.4 dokümanlarını içeriyor + canlı v0.4 ile birebir aynı + v0.5 branch açık/aktif.

---

## Bağlam

discuss-phase 18 **branch stratejisi kararı:** mevcut branch adı (`revize/v0.4-versiyon-sonu`) v0.5 için bayat kalırdı; geçmiş temiz kalsın diye önce v0.4 doküman merge'i finalize edilir, sonra doğru-adlı v0.5 branch açılır. `main` = canlı/production (her push → Vercel deploy). Bu merge doc-only olduğu için deploy **etkisiz** — v0.4 kodu `f173234` zaten canlı, çıktı aynı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` — Kapsam Tartışması → "Branch stratejisi" kararı
- `_dev/MEMORY.md` — "Vercel Git-disconnect → deploy tetiklenmez" tuzağı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [ ] **1. Temiz pencere + merge hazırlığı**
  - `git status` temiz; `revize/v0.4-versiyon-sonu` push'lu (plan-phase commit'i dahil)
  - `git fetch` + main güncel çek

- [ ] **2. main'e ff-only merge**
  - `git checkout main` → `git merge --ff-only revize/v0.4-versiyon-sonu` (yalnız doküman commit'leri; ff-only = yeni kod commit'i yok teyidi) → `git push`
  - Not: main push → Vercel rebuild tetikler; çıktı v0.4 ile aynı → canlı **değişmez**

- [ ] **3. Canlı no-op doğrulama**
  - main push sonrası Vercel deploy tetiklendi mi + canlı HTML v0.4 ile birebir aynı (immutable chunk 200, yeni-string yok)
  - Deploy tetiklenmezse → Git-disconnect tuzağı (Dikkat Noktaları)

- [ ] **4. v0.5 branch aç**
  - `main`'den `revize/v0.5-chatbot-groq` oluştur → push → checkout (aktif)

---

## Etkilenen Dosyalar

Kod/doküman **içeriği değişmez** — git branch/merge operasyonu (v0.4 dokümanları main'e taşınır, v0.5 branch açılır).

---

## Dikkat Noktaları

- **Canlıya dokunma kuralı korunur:** merge doc-only, kod değişmez → canlı v0.4 (`f173234`) aynen kalır. `--ff-only` ile yeni kod commit'i olmadığı teyit edilir; merge öncesi diff'in yalnız `_dev/` + repo-kök doküman değişiklikleri olduğunu doğrula.
- **Vercel Git-disconnect tuzağı** (MEMORY): main push deploy tetiklemezse Settings → Git bağlantısını kontrol et → yeniden bağla + `--allow-empty` boş commit push et. Canlı-kod teyidi: immutable chunk 200 + `age:` düşük.
- **Yanlış branch tuzağı:** 18.02+ tüm task'lar `revize/v0.5-chatbot-groq`'ta koşar; bu task bitmeden kod task'ına geçme.

---

## Test Kriterleri

- [ ] `git log main` v0.4 doküman commit'lerini + plan-phase 18 commit'ini içeriyor (ff-merge temiz, yeni kod commit'i yok).
- [ ] Canlı site v0.4 ile birebir aynı (no-op rebuild teyidi — immutable chunk 200, yeni string yok).
- [ ] `revize/v0.5-chatbot-groq` branch'i main'den açıldı + push'landı + aktif branch.

---

## Risk ve Geri Dönüş Planı

- **Risk:** main'e yanlışlıkla kod sızması → merge öncesi diff kontrolü (yalnız doküman) + `--ff-only`.
- **Rollback:** v0.5 branch main'den açıldığı için sorunsuz; doc-only merge gerekirse geri alınabilir ama içerik değişmediğinden gereksiz.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (bu task'ta "commit" = merge + branch push; ayrıca doküman güncellemesi)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(run-task oturumunda doldurulacak)_

---

**Oluşturulma:** 2026-07-22
