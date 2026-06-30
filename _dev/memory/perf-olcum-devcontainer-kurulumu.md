# Perf Ölçüm Araç Zinciri — Taze Devcontainer Kurulumu + Chrome Tuzakları

Taze cloud devcontainer'da node/npm/Chrome **kurulu olmayabilir** (MEMORY Ortam Notları). Lighthouse perf ölçümü (Faz 6 ve sonrası) gerektiğinde araç zinciri kurulur. Bu, ortam mutasyonu olduğu için **kullanıcı onayı ister** (TASK-6.01'de onaylandı: passwordless sudo + internet mevcuttu).

## Kurulum (TASK-6.01'de doğrulandı, 2026-06-30)

```bash
# node 20 (NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
# Google Chrome 150 (resmi repo)
curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt-get update && sudo apt-get install -y google-chrome-stable
# proje bağımlılıkları: lock dokunulmaz → npm install + lock'u geri al
npm install                       # `npm ci` REDDEDER: lock @swc/helpers eksik (npm sürüm drift'i, iyi huylu)
git checkout -- package-lock.json # dokunulmaz dosya korunur; node_modules gitignore'da
```

Lighthouse `npx -y lighthouse@13.3.0` ile (npx-cache; `package.json`'a EKLENMEZ — metodoloji `docs/perf/README.md`). CLI yolu: `~/.npm/_npx/<hash>/node_modules/lighthouse/cli/index.js`. EBADENGINE (node20 < LH'nin istediği node22) yalnızca **uyarı** — LH tam çalışır, Lantern deterministik (node sürümü simülasyonu değiştirmez).

## Chrome-flags ŞART (yoksa TARGET_CRASHED)

```
--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader
```

- **`--enable-unsafe-swiftshader`:** Chrome 150 headless'ta yazılım-WebGL (SwiftShader) için **şart**. Bu flag olmadan Living Flow WebGL context alamayıp tab `TARGET_CRASHED` ile çöker (json'da `runtimeError` ama kısmi trace metrikleri yine yazılır → yanlış-pozitif "ölçüm var" sanma).
- **`--disable-dev-shm-usage`:** Docker `/dev/shm` 64M varsayılanı → Chrome çöker; bu flag /tmp'ye yönlendirir.
- Çökme tespiti: `node -e 'process.exit(require(f).runtimeError?1:0)'` ile her koşu sonrası kontrol et, çökerse tekrar dene.

## LH 13.3.0 — LCP elementi insight audit'inde

Eski `largest-contentful-paint-element` audit'i LH 13.x'te **YOK** (insight audit'lerine taşındı). LCP elementi `audits["lcp-breakdown-insight"].details.items` içindeki `type:"node"` öğesinden okunur (selector + snippet). Research'ün K-R4'te varsaydığı audit adı eskimişti.

## Ortam-karşılaştırılabilirlik (kritik — kayıtta dürüstlük)

Software-WebGL (SwiftShader) ortamı **perf/TBT'yi şişirir** — TASK-6.01'de mobil TBT 1842ms / perf 62, önceki Faz-4 ortamında ~200ms / 84. Fark host gürültüsü değil (düşük yükte tutarlı), software-GL main-thread maliyeti. **Ama LCP/FCP/CLS Lantern-deterministik** → ortamlar arası birebir (LCP 3608 vs 3604, FCP 1666 vs 1656). Sonuç: **perf/TBT mutlak değeri ortamlar arası kıyaslanamaz**; faz-içi lever delta'ları (6.04/6.07 aynı ortamda) self-tutarlı; brief bütçe değerlendirmesinde LCP/FCP/CLS güvenilir sinyal. (Bu host-yük gürültüsünden farklı bir eksen — host yükü için ayrıca `cat /proc/loadavg`, → [perf ölçüm host-yük disiplini](../MEMORY.md) Süreç Disiplinleri.)
