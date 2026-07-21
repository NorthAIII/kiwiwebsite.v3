# TASK-18.01: Branch finalize — v0.4 doc-merge → main + v0.5 branch aç

**Durum:** ✅ Tamamlandı
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

- [x] **1. Temiz pencere + merge hazırlığı**
  - `git status` temiz; `revize/v0.4-versiyon-sonu` push'lu (plan-phase commit'i dahil)
  - `git fetch` + main güncel çek

- [x] **2. main'e ff-only merge**
  - `git checkout main` → `git merge --ff-only revize/v0.4-versiyon-sonu` (yalnız doküman commit'leri; ff-only = yeni kod commit'i yok teyidi) → `git push`
  - Not: main push → Vercel rebuild tetikler; çıktı v0.4 ile aynı → canlı **değişmez**

- [x] **3. Canlı no-op doğrulama**
  - main push sonrası Vercel deploy tetiklendi mi + canlı HTML v0.4 ile birebir aynı (immutable chunk 200, yeni-string yok)
  - Deploy tetiklenmezse → Git-disconnect tuzağı (Dikkat Noktaları)

- [x] **4. v0.5 branch aç**
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

- [x] `git log main` v0.4 doküman commit'lerini + plan-phase 18 commit'ini içeriyor (ff-merge temiz, yeni kod commit'i yok).
- [x] Canlı site v0.4 ile birebir aynı (no-op rebuild teyidi — immutable chunk 200, yeni string yok).
- [x] `revize/v0.5-chatbot-groq` branch'i main'den açıldı + push'landı + aktif branch.

---

## Risk ve Geri Dönüş Planı

- **Risk:** main'e yanlışlıkla kod sızması → merge öncesi diff kontrolü (yalnız doküman) + `--ff-only`.
- **Rollback:** v0.5 branch main'den açıldığı için sorunsuz; doc-only merge gerekirse geri alınabilir ama içerik değişmediğinden gereksiz.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (bu task'ta "commit" = merge + branch push; ayrıca doküman güncellemesi)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-22

**Durum:** ✅ Tamamlandı (tek oturum)

**Yapılanlar:**
- **Alt görev 1 (temiz pencere):** `git status` temiz, `revize/v0.4-versiyon-sonu` = `df7c293` push'lu (verify-plan commit'i dahil), `git fetch --all` güncel. `git merge-base --is-ancestor main <branch>` → main (`f173234`) branch'in atası, ff-only ön-koşulu sağlandı; ters yön (`branch..main`) boş.
- **Alt görev 2 (ff-only merge):** `git checkout main` → `git merge --ff-only revize/v0.4-versiyon-sonu` → `f173234..df7c293` fast-forward (merge commit **yok**) → `git push origin main` (`f173234..df7c293`). main artık `df7c293`, branch ile aynı commit.
- **Alt görev 3 (canlı no-op doğrulama):** Push → Vercel Production deploy tetiklendi **ve** tamamlandı — GitHub `/deployments` Production kaydı `df7c293` + commit-statuses `context=Vercel` `state=success` "Deployment has completed" (`Djmdfa4WaXrZweyqozBFJ5gSuhJK`). Git-disconnect tuzağı **yok**. Deploy'un merged ağaçtan build edildiği kanıtı: 4 orphan `/gym/*.png` cache-bust ile **200→404** (Next.js 404 sayfası, `<html lang="tr">`). Ana sayfa sağlık: `html lang="tr"` ✓ · "Crew OS" var ✓ · "Bunker" sızıntısı **0** ✓ · immutable chunk `webpack-1fbb0914...js` → **200** ✓ · 67KB tam sayfa.
- **Alt görev 4 (v0.5 branch):** `main`'den `git checkout -b revize/v0.5-chatbot-groq` → `git push -u origin` → aktif branch. HEAD = main = v0.5 = `df7c293` (benzersiz commit sayısı 1).

**Sorunlar:**
- **Merge "doc-only" değildi (kullanıcı onayıyla çözüldü):** Task premisi "içerik değişmez / no-op" diyordu ama merge öncesi diff kontrolü (task'ın kendi risk-kapısı) 5 doküman-dışı değişiklik gösterdi: `.gitignore` (+3 satır audit-canvas hariç tutma, `40e6652`) + 4 orphan `public/gym/*.png` **silme** (`d876054` TASK-16.01, Faz 16 versiyon-sonu). Doğrulama: PNG'ler `src/`+`messages/`'te **0 referans** (gerçekten orphan; Faz 16'da da 0-tüketici teyitliydi), gitignore runtime'da etkisiz, **0 `src/` değişikliği** → render edilen site kullanıcı-görünür açıdan birebir aynı; yalnız 4 referanssız asset URL 200→404. Production'a dokunduğu + premisle çeliştiği için kullanıcıya soruldu → "Devam et, merge'i yap" onayı alındı.

**Kararlar:**
- Merge premisinin kesinleştirilmesi: "doc-only / no-op" → gerçekte "35 doküman + 1 Faz-16 refactor (orphan asset temizliği) + gitignore"; kullanıcı-görünür çıktı yine byte-identical. docs/DECISIONS.md'ye eklendi: **Hayır** (mimari karar değil; task-icra tutarsızlığı, oturum kaydında yeterli).

**Dosya Değişiklikleri:**
- Kod/asset içeriği bu oturumda **elle değiştirilmedi** — git branch/merge operasyonu (v0.4 dokümanları + Faz 16 orphan-PNG silme main'e taşındı, `revize/v0.5-chatbot-groq` açıldı).

**Test Sonuçları:**
- ff-merge temiz: `f173234..df7c293` fast-forward, merge commit yok, `git log main` verify-plan 18 (`df7c293`) + plan 18 (`5644f91`) commit'lerini içeriyor. ✅
- Canlı no-op: Vercel deploy `df7c293`'ten tamamlandı (build production'da geçti = `next build` yeşil); render edilen site byte-identical (0 src/ değişikliği); homepage 200 + Crew OS + Bunker-sızıntısı 0 + immutable chunk 200; 4 orphan PNG beklendiği gibi 404. ✅
- v0.5 branch: `revize/v0.5-chatbot-groq` main'den açıldı + push'landı + aktif (HEAD=main=`df7c293`). ✅

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-07-22

**Ne Yapıldı:**
- `revize/v0.4-versiyon-sonu` (`df7c293`) → `main` **ff-only** merge (merge commit yok) + push; Faz 16/17/18 versiyon-sonu dokümanları + Faz 16 orphan-PNG temizliği main'e taşındı.
- Canlı no-op doğrulama: Vercel Production deploy `df7c293`'ten tetiklendi+tamamlandı (GitHub deployment + Vercel status success); render edilen site v0.4 ile byte-identical, Git-disconnect yok.
- Temiz `revize/v0.5-chatbot-groq` branch'i main'den açıldı, push'landı, aktif — sonraki tüm Faz 18 task'ları (18.02+) burada koşacak.

**Öğrenilenler:**
- **Vercel Production deploy'un tetiklenip tamamlandığı, dashboard'suz/auth'suz teyit edilebilir:** repo public → GitHub `/repos/.../deployments` (Production kaydı + sha) ve `/repos/.../commits/<sha>/statuses` (`context=Vercel`, `state=success`, "Deployment has completed"). "Git-disconnect tuzağı" teşhisini dashboard'a gitmeden verir — [MEMORY vercel-git-disconnect] notuna eklendi.
- Merge öncesi diff kontrolü ("yalnız doküman mı") gerçek bir kapı: task premisi "doc-only" dese bile branch içindeki refactor commit'lerini (Faz 16 orphan-asset temizliği) yakaladı → premis-gerçeklik farkı production'a dokunmadan önce kullanıcıya taşındı.

---

**Oluşturulma:** 2026-07-22
