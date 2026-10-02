# Entegrasyon eklerken canlıda gözle doğrula, iddiayı kanıt artefaktına bağla

Entegrasyon/analytics/3rd-party script eklerken **canlıda (production) gerçekten çalıştığını gözle doğrula** — "kod ekledim, tamamdır" deme; etkiyi panelde/ağ sekmesinde gör.

**"Canlıda gördüm" iddiasını her zaman kanıt-artefaktına bağla** (panel ekran görüntüsü / canlı HTML grep / `git merge-base --is-ancestor <feat-sha> origin/main`). Yapısal olarak o oturumda gerçekleştirilemeyen bir doğrulamayı (ör. `main` unmerged, preview `data-domains` saymaz) **geçmiş-gibi kaydetme** — ⏳ merge-bekliyor işaretle.

(Faz 7 verify re-run'da "canlı +1 gördüm" iddiası tam bu şekilde çürütüldü: `main` HEAD 89 commit geride, canlıda Umami yok. Örn. Umami → `docs/UMAMI-ANALYTICS.md`, `phases/PHASE-7.md`.)

İlgili: [Vercel Git-disconnect](vercel-git-disconnect-deploy-tetiklenmez.md) (auth'suz deploy teyidi + canlı-kod teyidi).
