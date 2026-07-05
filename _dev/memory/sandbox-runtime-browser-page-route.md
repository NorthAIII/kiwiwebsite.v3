# Cloud devcontainer'da runtime tarayıcı doğrulaması: server yerine `page.route`

Bu cloud devcontainer'ın sandbox'ı **detached/uzun-süreli veya çok-process'li** işleri sinyal-16 (`exit 144`) ile öldürüyor. Ampirik (Faz 14 S9, 2026-07-05):

- **Ölenler (exit 144 / signal 16):** `next start` ve `next dev` (3 farklı başlatma yöntemi: shell `nohup … &`, harness-background, `exec … &` — hepsi, Next port'u bağlamadan, log yazamadan ölür; 14.08 birebir). **Ayrıca** arka planda çalışan basit bir Node statik-server + system Chrome (Playwright) **kombinasyonu** da ölüyor — server+Chrome birlikte process eşiğini/kaynağı aşıyor.
- **Yaşayanlar:** `next build` (senkron foreground, worker fork'lasa da tamamlanır), `curl`, Vitest, trivial `setContent('<h1>')` Chrome sayfası, **ve tek-process çözümü aşağıda**.

**Çözüm — tek-process Playwright `page.route` interception (ayrı server YOK):** Chrome'u `.next` build-ground-truth'undan diskten servis et; her şey tek node process'inde kalır → sandbox öldürmez.
- `page.route('**/*', …)` ile: `/_next/<x>`→`.next/<x>`, `/`→`.next/server/app/tr.html`, `/<path>`→`.next/server/app/<path>.html` (yoksa `tr/<path>.html` = prefixsiz-TR middleware taklidi), gerisi `public/`. `route.fulfill({body: fs.readFileSync(...)})`.
- WebGL için **yine system Chrome şart** (`channel:'chrome'` + `--enable-unsafe-swiftshader` + `--disable-dev-shm-usage` + `--no-sandbox`) — [bundled chromium WebGL vermez](playwright-bundled-chromium-webgl-yok.md). FlowBackdrop nabız canvas=1 (mode=high) ayırt-edicilik sanity'si burada da geçerli.
- Harness'ı **proje içine** yaz (`tests/_verify-*.mjs`) — scratchpad'de ESM `playwright` paketini çözemez (node_modules dosyanın dizininden yukarı aranır, cwd değil). Koşu sonrası sil → git temiz.
- `served==disk`: route-intercept diskten birebir servis ettiği için **construction gereği** served==disk; ayrıca stray `next-server` olmadığını teyit et.

**Uyarı — kayıp çıktı:** 144-kill olan bir Bash komutunun **tüm dosya yazımları kaybolur** (redirect dosyası bile oluşmaz). Başarılı koşu çıktısı persist eder; teşhis için önce trivial probe ile yaşayan-ölen sınırını bul.

**Bağlam:** Ortam **per-session flaky** — Faz 14'te 14.05/14.06/14.07 ayrı oturumlarda system Chrome + server'ı koşturabildi; 14.08 ve 14.09 oturumlarında `next start` öldü. `page.route` yöntemi server'a hiç ihtiyaç duymadığından bu flakiliği **tümüyle atlar** → gelecek runtime-tarayıcı doğrulamalarında (S3/S4/S9 tipi) ilk tercih olsun. [Runtime harness selector-teyidi](runtime-harness-selector-teyidi.md) ile birlikte uygulanır.
