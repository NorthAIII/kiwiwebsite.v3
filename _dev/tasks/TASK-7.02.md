# TASK-7.02: Umami sonrası before/after Lighthouse perf regresyon doğrulaması

**Durum:** ⬜ Bekliyor
**Modül:** M6 — SEO & Deploy (modules/M6-SEO-Deploy.md)
**Feature:** E1 — Umami self-hosted analytics
**Faz:** Phase 7 (phases/PHASE-7.md)
**Bağımlılıklar:** TASK-7.01 ✅ (Umami entegrasyonu yerinde olmalı)

---

## Hedef

Umami entegrasyonu (7.01) sonrası ana sayfa TR `/` mobil + masaüstü Lighthouse perf/LCP'sini ölç ve Faz 6 **korunan tabana** karşı regresyon olmadığını doğrula. Yeni bir 3rd-party script + yeni origin'e (`umami.kiwiailab.com`) bağlantı ekleniyor — Lantern network lever'ları lab skorunda **görünür**, o yüzden özellikle mobil LCP izlenir.

**Tamamlanmış sayılır:** Aynı-ortam before/after ölçümü alındı; LCP/FCP/CLS Faz 6 tabanının altına düşmedi; artefaktlar `docs/perf/`'e kaydedildi; regresyon varsa preconnect/strategy kararı verildi ve DECISIONS'a yazıldı (yoksa "regresyon yok, preconnect eklenmedi" kaydı).

---

## Bağlam

Araştırma (PHASE-7 · D) preconnect/dns-prefetch'i **ölç-önce, ekleme (YAGNI)** kararına bağladı: deferred analytics script için preconnect kazancı marjinal, ilk-yükte bağlantı yarışına girip LCP'yi hafif kötüleştirebilir. Bu task o "ölç-önce" adımıdır — veri regresyon gösterirse preconnect/strategy yeniden değerlendirilir. Faz 6 korunan taban (regresyon yasağı, ILKELER §2a) bu fazın guardrail'i.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/perf/README.md` — perf metodolojisi + koşu tablosu + Faz 6 taban değerleri
- `_dev/phases/PHASE-7.md` — Araştırma D (preconnect ölç-önce) + perf ölçüm disiplini bölümü
- MEMORY pointer'ları: `lighthouse-lantern-render-timing-korligi` (network lever'ları görünür!), `a11y-olcum-tema-tuzagi`, `perf-olcum-devcontainer-kurulumu` (araç kurulumu + Chrome flags), + Süreç Disiplinleri (host-yük / stray-PID)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/docs/perf/README.md` — koşu tablosuna Faz 7 before/after satırı
- `_dev/DURUM.md` — Aktif task + task durumu + son task özeti
- `_dev/phases/PHASE-7.md` — Task Listesi tablosunda 7.02 durumu
- `_dev/docs/DECISIONS.md` — yalnızca regresyon çıkıp preconnect/strategy değişirse

---

## Alt Görevler

- [ ] **1. Ölçüm ortamını hazırla (gerekirse, kullanıcı onayıyla)**
  - node20 + Chrome 150 + LH 13.3.0 (npx-cache) — `perf-olcum-devcontainer-kurulumu` MEMORY reçetesi.
  - Chrome flags ŞART: `--disable-dev-shm-usage` + `--enable-unsafe-swiftshader` (yoksa Living Flow `TARGET_CRASHED`).
  - Her koşu öncesi `cat /proc/loadavg` → düşük yük (≤ ~6) doğrula; stray `next-server`/`chrome` process kontrolü.

- [ ] **2. Same-environment before/after ölç**
  - **after** = mevcut branch (Umami'li): TR `/`, `NEXT_LOCALE=tr` cookie, mobil + masaüstü, çok-koşu median.
  - **before** = Umami'siz durum **aynı ortamda/oturumda** (7.01 öncesi commit / geçici stash) — perf skoru/TBT ortamlar arası kıyaslanamaz olduğundan same-env before şart.
  - LCP/FCP/CLS Faz 6 tabanıyla da doğrudan kıyaslanabilir (Lantern-deterministik).

- [ ] **3. Karşılaştır + artefakt kaydet**
  - LCP/FCP/CLS Faz 6 tabanının altına düşmemeli; same-env perf skoru before→after regresyon göstermemeli.
  - Artefaktları `docs/perf/`'e yaz (`home-{mobile,desktop}-<tarih>.{html,json}`), README koşu tablosunu güncelle.

- [ ] **4. Karar**
  - Regresyon **yoksa:** "preconnect eklenmedi, regresyon yok" olarak kaydet (README + PHASE-7).
  - Regresyon **varsa:** preconnect/dns-prefetch dene veya strategy yeniden değerlendir (araştırma D, veri-güdümlü); değişiklik 7.01 dosyalarına dokunur → kararı `docs/DECISIONS.md`'ye yaz.

---

## Etkilenen Dosyalar

```
_dev/docs/perf/
├── README.md                            # koşu tablosuna Faz 7 before/after satırı — zaten var
├── home-mobile-<tarih>.{html,json}      # YENİ (ölçüm artefaktı)
└── home-desktop-<tarih>.{html,json}     # YENİ (ölçüm artefaktı)

# Kod değişikliği YOK — yalnızca regresyon çıkarsa 7.01 dosyalarına (layout/bileşen)
# preconnect/strategy müdahalesi eklenir + DECISIONS güncellenir.
```

---

## Dikkat Noktaları

- **Lantern network-lever görünürlüğü (kritik):** CPU/render-zamanlama lever'ları lab'da görünmez AMA **network/asset lever'ları görünür**. Umami YENİ origin'e (`umami.kiwiailab.com`) DNS+TLS+istek ekler → mobil LCP'de görünebilir. **Özellikle LCP izle** (bu tam da ölçmenin sebebi).
- **TR `/` cookie ŞART:** `--extra-headers='{"Cookie":"NEXT_LOCALE=tr"}'` yoksa Chrome Accept-Language ile `/en` ölçer (MEMORY). Regresyon kıyasında hep aynı locale; TR `/` `/en`'den ağır (uzun hero).
- **Ortam varyansı:** software-GL ortamı perf/TBT'yi şişirir → **perf/TBT mutlak kıyası SADECE same-env before/after** ile yapılır; Faz 6 mutlak perf/TBT ile kıyaslama (ortam farkı). **LCP/FCP/CLS Lantern-deterministik** → Faz 6 tabanıyla doğrudan kıyaslanabilir.
- **Host yükü:** her koşu öncesi `cat /proc/loadavg`; yüksek yük perf/TBT bozar (a11y/CLS'yi değil). Düşük yükte çok-koşu al, median kaydet, yüksek-yük koşularını ele.
- **Stray-PID:** lokal prod'u serve eden PID'nin senin fresh process'in olduğunu `ss -ltnp` ile teyit et (stale build yanlış negatif verir).
- **Faz 6 korunan taban:** mobil perf 90 / LCP 3164ms, masaüstü 100 / LCP 0.69s, CLS≈0.
- **Nihai brief mobil açık:** gerçek-cihaz/Vercel field gerektiren metodolojik duvar bu task'ın konusu değil — burada yalnız **regresyon yok** doğrulanır.

---

## Test Kriterleri

- [ ] Same-env before/after alındı (mobil + masaüstü, TR `/` cookie, çok-koşu median, düşük host yükü).
- [ ] **LCP/FCP/CLS Faz 6 tabanının altına düşmedi** (mobil LCP ≤ ~3164ms, masaüstü LCP ≤ ~0.69s, CLS≈0).
- [ ] Same-env perf skoru before→after regresyon göstermiyor.
- [ ] Artefaktlar `docs/perf/`'e kaydedildi, README koşu tablosu güncellendi.
- [ ] Karar kaydedildi: regresyon yoksa "preconnect eklenmedi, regresyon yok"; varsa preconnect/strategy müdahalesi + DECISIONS girdisi.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-7.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-01
