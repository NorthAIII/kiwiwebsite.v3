# Lighthouse/perf ölçerken host yükünü gözlemle

Her koşudan önce `cat /proc/loadavg`. Yüksek yük (load avg ≫ çekirdek sayısı = aşırı yük) TBT/LCP/perf skorunu bozar (a11y/CLS'yi **değil** — onlar ortamdan bağımsız), tek atışta perf 49↔90 savrulur. Düşük yükte (≤ ~6) çok-koşu al, median kaydet; yüksek-yük koşularını ele.

**Çekirdek sayısı makineye bağlıdır — `nproc` ile al.** Kural ilk yazıldığında makine 20 çekirdekti (≤ ~6 eşiği o makinede ölçüldü); bugünkü host 32 çekirdek (`nproc`, 2026-10-02).

Bu host gürültüsü orphan chrome process'ten farklıdır (onu da `ps` ile kontrol et).

(Detay/metodoloji: `docs/perf/README.md`; ilk taban TASK-2.03.)

İlgili: [Perf ölçüm araç-zinciri devcontainer kurulumu](perf-olcum-devcontainer-kurulumu.md) (software-GL şişmesi ayrı eksen) · [Lighthouse Lantern render-timing körlüğü](lighthouse-lantern-render-timing-korligi.md).
