# Tarayıcı-tabanlı doğrulamada `/` (prefixsiz TR) Accept-Language ile otomatik locale'e yönlenir

**Davranış:** next-intl `localeDetection` (varsayılan açık); örn. `Accept-Language: en-US` → `/en`. curl bunu **tetiklemez** (header göndermez) → aynı sayfa curl'de TR-200 ama Playwright/tarayıcıda `/en` görünebilir; bu tutarsızlık **bug değil**, beklenen davranış.

**TR-birincil testlerde** `NEXT_LOCALE=tr` cookie kullan (cookie precedence > Accept-Language).

**Lighthouse de Chrome → tetikler:** cookie'siz koşu `/` yerine `/en` ölçer; bu yüzden v0.1 perf baseline'ı yanlışlıkla `/en` ölçmüş (artifact `finalUrl=/en` ile TASK-4.08'de kanıtlandı, "TR `/`" diye etiketlenmişti). **Perf ölçümünde TR `/` için `--extra-headers='{"Cookie":"NEXT_LOCALE=tr"}'` şart; regresyon karşılaştırmasında hep aynı locale.**

TR `/` sayfası `/en`'den ağır (uzun hero metni) → farklı perf/LCP, regresyon değil.

(Faz 3 S5/S6/S8 + Faz 4 TASK-4.08; detay → `phases/PHASE-3.md`, `phases/PHASE-4.md` 4.08 İcra Notu, `docs/perf/README.md`.)
