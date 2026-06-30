# Lighthouse Lantern render-timing körlüğü (mobil perf)

**Proje-geneli ölçüm tuzağı (çapraz-faz).** Lighthouse **mobil** skoru *Lantern simülasyonudur*: observed trace **throttle'sız** (veya hafif) toplanır, sonra 4× CPU + yavaş ağ *simüle* edilir. Bu yüzden **render-zamanlamasına dayanan lever'lar lab skorunda görünmez** — gerçek-cihaz-doğru olsalar bile.

İki somut kanıtlı vaka (TASK-6.04, Faz 6):

1. **`requestIdleCallback` idle-deferral'ı (L2):** throttle'sız observed trace'te main-thread hemen boşalır → `requestIdleCallback({timeout})` **anında ateşler** → ertelenen iş (WebGL init) erken yakalanır → Lantern bunu LCP penceresinde bloke iş olarak *simüle eder*. Gerçek meşgul main-thread'de rIC LCP sonrasına ertelerdi; Lantern bunu modelleyemez. TBT/LCP **birebir** değişmedi (1898≈1842ms, 3615≈3608ms).

2. **opacity-gate kaldırma (L1, hero reveal opacity→transform):** observed trace'te un-throttled GSAP reveal hızlı tamamlanır → opacity:0 gözlemde zaten darboğaz değildi → kaldırmak skoru oynatmaz. LCP breakdown `elementRenderDelay` lever öncesi (6.01) = 173.3ms, sonrası (6.04) = 172.9ms (**birebir**). Gerçek throttle altında opacity:0 reveal LCP'yi geciktirirdi; lab göremez.

**Sonuç / disiplin:**
- WebGL-ağır bu sitede mobil LCP skoru (~3.6s) **simüle CPU-bound** rakamdır; observed render ~185ms. Render-zamanlama lever'larının (L1/L2) etkisini **bu lab'da ölçmeye çalışma** — "delta yok" lab limiti olabilir, lever hatası değil. Doğrula: lever build'de mi (commit/kaynak) + LCP elementi + observed `elementRenderDelay` birebir mi → kök neden Lantern artefaktı mı?
- Lab'da simüle-LCP'yi gerçekten düşürmenin tek yolu **WebGL gerçek iş yükünü azaltmak** (particle/DPR cap/erken-static = P2). Render-zamanlama değil, iş-yükü lever'ı.
- Bu sitede perf bütçesinin (≥95 / LCP<2.5s) **temiz doğrulaması gerçek-cihaz / Vercel field verisi gerektirir** — lab (Lantern + software-GL) hem perf/TBT'yi şişirir hem render-timing kazancını gizler.

İlişkili: [a11y/perf ölçüm tema tuzağı](a11y-olcum-tema-tuzagi.md), [perf ölçüm araç-zinciri devcontainer kurulumu](perf-olcum-devcontainer-kurulumu.md). Software-GL perf/TBT şişmesi ayrı ama tamamlayıcı: LCP/FCP/CLS Lantern-deterministik (kıyaslanabilir), perf/TBT software-GL şişkin.
