# Lighthouse Lantern render-timing körlüğü (mobil perf)

**Proje-geneli ölçüm tuzağı (çapraz-faz).** Lighthouse **mobil** skoru *Lantern simülasyonudur*: observed trace **throttle'sız** (veya hafif) toplanır, sonra 4× CPU + yavaş ağ *simüle* edilir. Bu yüzden **render-zamanlamasına dayanan lever'lar lab skorunda görünmez** — gerçek-cihaz-doğru olsalar bile.

İki somut kanıtlı vaka (TASK-6.04, Faz 6):

1. **`requestIdleCallback` idle-deferral'ı (L2):** throttle'sız observed trace'te main-thread hemen boşalır → `requestIdleCallback({timeout})` **anında ateşler** → ertelenen iş (WebGL init) erken yakalanır → Lantern bunu LCP penceresinde bloke iş olarak *simüle eder*. Gerçek meşgul main-thread'de rIC LCP sonrasına ertelerdi; Lantern bunu modelleyemez. TBT/LCP **birebir** değişmedi (1898≈1842ms, 3615≈3608ms).

2. **opacity-gate kaldırma (L1, hero reveal opacity→transform):** observed trace'te un-throttled GSAP reveal hızlı tamamlanır → opacity:0 gözlemde zaten darboğaz değildi → kaldırmak skoru oynatmaz. LCP breakdown `elementRenderDelay` lever öncesi (6.01) = 173.3ms, sonrası (6.04) = 172.9ms (**birebir**). Gerçek throttle altında opacity:0 reveal LCP'yi geciktirirdi; lab göremez.

**Sonuç / disiplin:**
- WebGL-ağır bu sitede mobil LCP skoru (~3.6s) **simüle CPU-bound** rakamdır; observed render ~185ms. **CPU/render-zamanlama** lever'larının (L1/L2) etkisini **bu lab'da ölçmeye çalışma** — "delta yok" lab limiti olabilir, lever hatası değil. Doğrula: lever build'de mi (commit/kaynak) + LCP elementi + observed `elementRenderDelay` birebir mi → kök neden Lantern artefaktı mı?
- **AMA network/asset-boyutu lever'ları lab-GÖRÜNÜR (rafinaj — TASK-6.07).** Lantern simüle throttled ağı *modeller*, o yüzden **asset boyutunu küçülten** lever lab skorunda görünür. Kanıt: aynı temsilî ortamda L1+L2 tek başına mobil LCP 3604→3755ms (delta yok, CPU-timing), **L3 (Fraunces SOFT/WONK budama, ~113KB↓ woff2) eklenince 3755→3164ms** (−590ms) — LCP elementi Fraunces `display:swap` hero metni, küçük font simüle download'da öne çekiliyor. Yani "lab'da tek lever = WebGL iş yükü (P2)" **eksikti**: iş-yükü (CPU) **ve** asset-boyutu (network) lever'ları lab-görünür; gizlenen yalnızca saf CPU/render-**zamanlama** kazancı.
- ⚠️ **Ortam anomalisi:** 6.01/6.04 ağır-SwiftShader devcontainer'ı perf 62 / TBT 1842ms verdi; 6.07 temsilî ortamı baseline'ı perf 84 / TBT 261ms (Faz-4 birebir). Aynı flag'lerle bile devcontainer'lar arası software-GL yükü değişebilir — perf/TBT mutlak kıyasında ortamı baseline'la (aynı ortamda lever-öncesi build) sabitle.
- Bu sitede perf bütçesinin (≥95 / LCP<2.5s) **nihai doğrulaması gerçek-cihaz / Vercel field verisi gerektirir** — lab perf/TBT'yi şişirir + saf render-timing kazancını gizler; gerçek throttle + gerçek GPU lab'dan lehte olabilir.

İlişkili: [a11y/perf ölçüm tema tuzağı](a11y-olcum-tema-tuzagi.md), [perf ölçüm araç-zinciri devcontainer kurulumu](perf-olcum-devcontainer-kurulumu.md). Software-GL perf/TBT şişmesi ayrı ama tamamlayıcı: LCP/FCP/CLS Lantern-deterministik (kıyaslanabilir), perf/TBT software-GL şişkin.
