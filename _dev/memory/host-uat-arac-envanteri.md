# Host'ta UAT araç envanteri (verify-phase Adım 4)

Ölçüm: 2026-10-02, verify-phase 18 (4. koşum). Oturum host'ta koşuyordu (container değil: PID 1 systemd, `/.dockerenv` yok).

**Kurulu ve çalışan:**
- node v24.21.0 · npm 11.19.0
- System Google Chrome 153 → Playwright `chromium.launch({ channel: "chrome" })`.
- `gh` CLI, `NorthAIII` hesabıyla yetkili.
- `vercel` CLI 59.x, `northaiii` hesabıyla yetkili ve proje bağlı (`.vercel/project.json`).
- Devcontainer'da da `vercel` CLI (62.2.0) kurulu, proje bağlı, ama oturum kapalı gelebilir (2026-10-03). `vercel login` device akışını arka planda başlat; URL'yi kullanıcı onaylar.

**Bu host'ta `next start` + gerçek Chrome çalışıyor.** Exit 144 görülmedi; yerel sunucu, sahte üst-akış sunucusu ve Chrome aynı node sürecinden başlatılıp kapatıldı. [Cloud devcontainer'daki `page.route` çaresi](sandbox-runtime-browser-page-route.md) burada zorunlu değil. Yine de ortam değişince önce kendin ölç.

**Bu host'ta `npm run test:e2e` olduğu gibi koşmaz (ölçüm 2026-10-02, TASK-19.01):**
- `:3000` (ve `:3100`) sahibi okunamayan yabancı bir dinleyicide. Repo `playwright.config.ts` `:3000`'e sabit ve yerelde `reuseExistingServer: true`, yani suite yabancı sunucuyu ölçer: yanlış ölçüm, hata vermez.
- Bundled `chromium_headless_shell` kurulu değil; launch hatası verir.
- **Çare (repo'ya dokunmadan):** scratchpad'de override config yaz:
  - aynı `testDir` (mutlak yol), `testMatch` ve `retries: 0`;
  - `Desktop Chrome` descriptor + `channel: "chrome"`;
  - boş bir port (ör. `3217`) için `baseURL`.
  - Sunucuyu kendin `next start -p <port>` ile başlat, dinleyen PID'i doğrula, sonra `npx playwright test --config <override>` koştur. Cookie domain'i `localhost` olduğu için baseURL'de `localhost` kalmalı.

**Pratik notlar:**
- **Auth'suz GitHub REST limiti 60 istek/saat ve IP başına.** Paralel oturumlarla paylaşıldığı için koşum ortasında tükenebilir (403 `rate limit exceeded`). O durumda aynı uçları yetkili `gh api` ile oku.
- **Canlı chatbot arızasının kök nedeni `vercel logs` ile okunur:** `vercel logs --environment production --since 30m --level error --json`. `--status-code <kod>` filtresi de çalışıyor; bilinen bir 400/413 ile kontrol et, boş sonuç tek başına kanıt değildir.
- **Playwright'i scratchpad'den kullanmak için CJS + mutlak yol yeter:** `require("/home/kivanc/projects/kiwiwebsite.v3/node_modules/playwright")`. Harness'ı proje ağacına yazmak gerekmez.
- **Streaming `/api/chat` yanıtında Playwright `response.finished()` dönmeyebilir.** Ölçümde süresiz asıldı. Akışın bittiğini DOM'dan oku, ama **Thinking'in kaybolmasından değil**: `Chatbot.tsx` onu yalnız balon içeriği boşken gösterir, ilk parçada kaybolur (TASK-19.03'te bekleme 402 ms'de döndü, harness tarayıcıyı akış ortasında kapattı).
  - **Belirleyici işaret:** gönderdikten sonra inputa metin yaz (gönderme). Submit `disabled={streaming || !input.trim()}` olduğu için düğme yalnız `streaming=false` iken etkinleşir.
  - **Kontrolü chatbot'un "Gönder" düğmesine daralt** (TASK-19.07): sayfada bülten formunun submit'i de var ve hep etkin. `button[type=submit]` geneline bakan bekleme anında döner, tarayıcı akış ortasında kapanır, Groq çağrısı boşa gider.
  - **Hidrasyonu bekle:** `load` sonrası kısa bekleme + `pressSequentially`. Erken `fill` React state'ine ulaşmaz, düğme hiç etkinleşmez.
  - Akış ortasında kapanan tarayıcı sunucu logunda `chat stream error TypeError: Invalid state: Controller is already closed` doğurur — harness artefaktıdır, üst-akış arızası değil.
  - Tamamlanmış akışta bile Playwright tarayıcı kapanırken `requestfailed: net::ERR_ABORTED` raporlayabilir; tek başına arıza kanıtı değildir.
- **Yerelde "model çağrılmadı"yı kotayı yakmadan ölçmek (TASK-19.05):** `next start` sürecine `GROQ_BASE_URL=http://127.0.0.1:<port>` ver. groq-sdk 1.3.0 bu değişkeni okur; o port'ta istekleri sayan bir sahte sunucu dinlesin. Asıl ölçümden sonra sayaç 0 olmalı. Ardından geçerli gövdeli tek bir aynı-origin istek gönder: sayaç 1 olmalı (pozitif kontrol — sayacın gerçekten bağlı olduğunu kanıtlar). Gerçek Groq hiç çağrılmaz. Anahtarı yalnız sunucu sürecinin env'ine ver (`export` + `exec`; argümanla verirsen `ps`'te görünür).
- **Canlıda hata yolunu tetiklemek:** Groq ücretsiz tier'ın OTPM limiti (1000) dar. 8–12 eşzamanlı istek, sonraki isteği büyük olasılıkla 429'a düşürür. Günlük kota (1000 istek) ziyaretçilerle ortaktır; çağrı sayısını kayda geçir.
