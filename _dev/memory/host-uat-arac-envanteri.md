# Host'ta UAT araç envanteri (verify-phase Adım 4)

Ölçüm: 2026-10-02, verify-phase 18 (4. koşum). Oturum host'ta koşuyordu (container değil: PID 1 systemd, `/.dockerenv` yok).

**Kurulu ve çalışan:**
- node v24.21.0 · npm 11.19.0
- System Google Chrome 153 → Playwright `chromium.launch({ channel: "chrome" })`.
- `gh` CLI, `NorthAIII` hesabıyla yetkili.
- `vercel` CLI 59.x, `northaiii` hesabıyla yetkili ve proje bağlı (`.vercel/project.json`).

**Bu host'ta `next start` + gerçek Chrome çalışıyor.** Exit 144 görülmedi; yerel sunucu, sahte üst-akış sunucusu ve Chrome aynı node sürecinden başlatılıp kapatıldı. [Cloud devcontainer'daki `page.route` çaresi](sandbox-runtime-browser-page-route.md) burada zorunlu değil. Yine de ortam değişince önce kendin ölç.

**Pratik notlar:**
- **Auth'suz GitHub REST limiti 60 istek/saat ve IP başına.** Paralel oturumlarla paylaşıldığı için koşum ortasında tükenebilir (403 `rate limit exceeded`). O durumda aynı uçları yetkili `gh api` ile oku.
- **Canlı chatbot arızasının kök nedeni `vercel logs` ile okunur:** `vercel logs --environment production --since 30m --level error --json`. `--status-code <kod>` filtresi de çalışıyor; bilinen bir 400/413 ile kontrol et, boş sonuç tek başına kanıt değildir.
- **Playwright'i scratchpad'den kullanmak için CJS + mutlak yol yeter:** `require("/home/kivanc/projects/kiwiwebsite.v3/node_modules/playwright")`. Harness'ı proje ağacına yazmak gerekmez.
- **Streaming `/api/chat` yanıtında Playwright `response.finished()` dönmeyebilir.** Ölçümde süresiz asıldı. Akışın bittiğini DOM'dan oku: Thinking göstergesinin kaybolması ya da balon metninin beklenen sonla bitmesi.
- **Canlıda hata yolunu tetiklemek:** Groq ücretsiz tier'ın OTPM limiti (1000) dar. 8–12 eşzamanlı istek, sonraki isteği büyük olasılıkla 429'a düşürür. Günlük kota (1000 istek) ziyaretçilerle ortaktır; çağrı sayısını kayda geçir.
