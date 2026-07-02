# RELEASE — v0.2 Production Release (Runbook & Checklist)

**Tür:** Hafif operasyonel oturum (faz döngüsü değil — kullanıcı kararı 2026-07-02). Numaralı faz **değil**; içerik "merge + canlı doğrulama", geliştirme değil.
**Amaç:** Tüm revize işini (v0.1 + v0.2, `revize/devflow-kurulum` branch'i) ilk kez `main`'e (= canlı/production) alıp Vercel deploy'unu tetiklemek; **Faz 7'den beri bekleyen Umami canlı +1** doğrulamasını ve genel canlı duman testini burada kapatmak.
**Ne zaman:** **Hemen / sonraki oturum** — `run-task 10`'dan **ÖNCE** (kritik pencere, aşağıda). verify-plan 10 (kod yok) release'in iki yanında da olabilir; öneri: önce release.

> **⚠️ Bu adım canlıya dokunur.** `main` = production (her push → Vercel deploy). "Canlıya dokunma" kuralının bilinçli istisnası budur — release **yalnız kullanıcı (Kivanç) açık onayıyla** yürütülür. Bu doküman runbook'tur; merge'i otomatik yapma.

---

## 0. Neden şimdi? — Temiz v0.2 penceresi

Branch şu an tam olarak **temiz bir v0.2-kod durumunda**:
- `origin/main` @ `617ce76` (2026-06-26, revize öncesi) — canlıdaki mevcut sürüm.
- Branch main'in **125 commit önünde, 0 geride**. `src/` + `messages/` = **19 dosya** (v0.1+v0.2 kodu, yayınlanacak olan); `_dev/` = ~129 dosya (doküman, `_dev/` bilinçli commit'lenir — public repo).
- **Faz 10 (v0.3) henüz `src/`/`messages/`'a DOKUNMADI** — yalnız task dokümanı yazıldı. Çalışma ağacı temiz.

**Sabit kural:** Release, **`run-task 10` (ilk v0.3 kodu)'ndan önce** yapılmalı. `run-task 10` çalışınca branch'e v0.3 görsel-cila kodu girer ve "temiz v0.2 milestone" penceresi kapanır (v0.2 + v0.3-yarım birlikte yayınlanır). plan-phase/verify-plan kod eklemez → pencere onlarla açık kalır; kapanış noktası **run-task 10**.

---

## 1. Ön-koşul kontrolü (merge öncesi, branch'te)

- [ ] Çalışma ağacı temiz: `git status --short` boş.
- [ ] Pencere hâlâ temiz (v0.3 kodu girmemiş): `git log origin/main...HEAD --oneline -- src messages | grep -i "TASK-10"` → **boş** olmalı. (Boş değilse run-task 10 çalışmış — pencere kapanmış; kullanıcıyla konuş.)
- [ ] `git fetch origin` sonrası branch main'in **0 geride** (aksi halde önce `main`'i branch'e merge/rebase et — çakışma çöz).
- [ ] Build temiz: `next build` hatasız (proje test konvansiyonu: test yoksa "test" = temiz build + gözle doğrulama — CLAUDE.md #7).
- [ ] CI yeşil: son commit için GitHub Actions `fast` + `a11y` job `conclusion=success` (public repo, auth'suz REST ile de bakılır — MEMORY → Ortam & Araç Notları).

## 2. Merge & deploy (PR-tabanlı — repo konvansiyonu)

Repo PR ile ilerliyor (`main` son commit = "Merge pull request #5"). Aynı deseni koru:

- [ ] PR aç: `revize/devflow-kurulum` → `main` (`gh pr create`).
- [ ] PR'ın Vercel **preview** deploy'unu bekle → preview URL'de hızlı bir ön-duman testi yap (Umami HARİÇ — `data-domains=kiwiailab.com` preview'da saymaz; bu beklenen).
- [ ] PR'ı merge et (squash **değil** — 125 commit'lik geçmiş + `_dev/` izi korunur; normal merge commit).
- [ ] Merge → `main` push → **Vercel production deploy otomatik tetiklenir.** Vercel dashboard'da production deploy'un "Ready" olduğunu doğrula.

## 3. Canlı duman testi (production — `kiwiailab.com`)

Deploy "Ready" olduktan sonra **gerçek canlı domain**de:

- [ ] Ana sayfa (`/` TR) yükleniyor; Living Flow render / degradasyon çalışıyor.
- [ ] 5 dil: `/` (tr), `/en`, `/ar`, `/de`, `/es` açılıyor; **AR RTL** aynalama doğru.
- [ ] Alt sayfalar: `/spor-salonu-yazilimi`, `/bunker-os` (Crew OS showcase), `/vaka-calismalari`, `/bulten` + 2 makale, `/bulten`e redirect (`/forum` → `/bulten`).
- [ ] Tema toggle (light/dark) çalışıyor, FOUC yok; dil değiştirici path'i koruyor.
- [ ] Chatbot: canlıda `ANTHROPIC_API_KEY` Vercel env'de tanımlı → streaming yanıt geliyor (key yoksa zarif offline).
- [ ] Konsol/network belirgin hata yok (404 asset, CORS vb.).

## 4. Umami canlı +1 doğrulaması (Faz 7'den beri bekleyen — kapanış)

Kod hazır: `src/components/analytics/umami-script.tsx` (`data-website-id=c7031c49-…`, `data-domains=kiwiailab.com`). Spec: `docs/UMAMI-ANALYTICS.md`.

- [ ] Canlı domaini gerçekten ziyaret et (reklam engelleyici KAPALI bir tarayıcıda — uBlock/Brave `script.js`'i engelleyebilir, spec §3).
- [ ] Umami panelinde (`umami.kiwiailab.com`) pageview/ziyaret sayısının **+1 arttığını GÖZLE gör**.
- [ ] **Kanıt-artefaktına bağla** (panel ekran görüntüsü / canlı HTML'de `umami.kiwiailab.com/script.js` grep'i). "Gördüm, tamam" **yetmez** — MEMORY → Süreç Disiplinleri (Faz 7'de "canlı +1 gördüm" iddiası tam bu sebeple çürümüştü: `main` unmerged'di). `git merge-base --is-ancestor <feat-sha> origin/main` ile kodun gerçekten canlıda olduğunu da teyit et.

## 5. Rollback planı (bir şey ters giderse)

- **Hızlı:** Vercel dashboard → önceki (v3 pre-revize, `617ce76`) production deployment → "Promote to Production" (anında geri alır).
- **Git:** `main`'de merge commit'i `git revert -m 1 <merge-sha>` → push → yeni deploy eski koda döner.
- Kritik olmayan kusur (tek sayfa/tek dil) → rollback yerine `revize/...`'de düzelt, yeni PR. Rollback yalnız yaygın/kırık durumda.

## 6. Kabul kriterleri

- [ ] `main` = revize (v0.1+v0.2) kodu; `git merge-base --is-ancestor HEAD origin/main` sonrası revize main'de.
- [ ] Canlı duman testi (§3) tüm maddeler ✓.
- [ ] Umami canlı +1 **kanıt-artefaktıyla** doğrulandı (§4).
- [ ] Guardrail regresyonu yok: a11y=100 çift-tema / perf korunan taban / i18n 5-dil parite (canlıda gözle + gerek/opsiyonel Lighthouse). Not: brief mobil perf lab-açığı **bilinen/kabul** (gerçek-cihaz duvarı, ILKELER #2b) — release engeli değil.

## 7. Sonuç kaydı (release sonrası)

- [ ] **Bu dokümanın başına** "Durum: ✅ Yayınlandı — <tarih>, canlı sürüm = <merge-sha>" satırı ekle (aşağıdaki Durum alanını güncelle).
- [ ] Umami kabul kriterleri → `docs/UMAMI-ANALYTICS.md` durumunu ⬜→✅ çevir (canlı +1 doğrulandı, artefakt referansı).
- [ ] `PRD/VERSIONS.md`: v0.2 Umami satırı 🟡→✅ (canlı +1 kapandı).
- [ ] DURUM.md: "run-task öncesi bekleyen v0.2 production release" uyarısını kaldır (adım tamamlandı) → v0.3 run-task artık serbest.
- [ ] Tek commit: `chore: v0.2 production release — live smoke + Umami +1 verified` (release-sonrası doküman kayıtları; kod zaten merge'de).

---

**Durum:** ⬜ Bekliyor — kullanıcı onayıyla yürütülecek (hemen/sonraki oturum, run-task 10'dan önce).
**Oluşturulma:** 2026-07-02 (kullanıcı talebi: "canlıya almayı yakın bir faz olarak planla" → hafif operasyonel oturum + checklist).
