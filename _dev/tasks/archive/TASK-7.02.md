# TASK-7.02: Umami sonrası before/after Lighthouse perf regresyon doğrulaması

**Durum:** ✅ Tamamlandı
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

- [x] **1. Ölçüm ortamını hazırla** — node 20.20.2 + Chrome 150 + LH 13.3.0 (npx-cache `906bfb1e...`) **zaten kurulu** (bu devcontainer'da mevcuttu; kurulum gerekmedi). Flags birebir kullanıldı (`--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`). Her koşu öncesi `/proc/loadavg` gözlendi (load ~1–2.8, düşük); stray `next-server`/`chrome` yok; listening-PID her serve'te teyit edildi.

- [x] **2. Same-environment before/after ölç** — **after** = HEAD (Umami'li): TR `/` (`NEXT_LOCALE=tr` cookie, finalUrl `/` teyit), mobil ×5 + masaüstü ×3 median. **before** = aynı ortamda `layout.tsx` f065700'e (Umami öncesi) döndürülüp yeniden build, aynı ölçüm. LCP/FCP/CLS Faz 6 tabanıyla da kıyaslandı.

- [x] **3. Karşılaştır + artefakt kaydet** — regresyon yok (aşağıda). Artefaktlar `docs/perf/`'e yazıldı (`home-{mobile,desktop}-20260701-faz7.{html,json}` = after kanonik + `-before.json` = attribution). README'ye Faz 7 before/after bölümü + kanonik-artefakt satırı eklendi.

- [x] **4. Karar** — Regresyon **YOK** → "preconnect eklenmedi, regresyon yok" kaydedildi (README + PHASE-7). 7.01 dosyalarına dokunulmadı; DECISIONS'a girdi gerekmedi (regresyon-tetikli strateji değişikliği olmadı).

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

- [x] Same-env before/after alındı (mobil ×5 + masaüstü ×3, TR `/` cookie, median, düşük host yükü ~1–2.8).
- [x] **LCP/FCP/CLS Faz 6 tabanının altına düşmedi** — mobil LCP after 2714 ms ≤ 3164 ms; masaüstü 660 ms ≤ 0.69 s; CLS 0.000 her yerde.
- [x] Same-env perf skoru before→after regresyon göstermiyor — mobil 90→88 (bantlar örtüşük, 2 puan gürültü); masaüstü 100→100.
- [x] Artefaktlar `docs/perf/`'e kaydedildi (`*-faz7.{html,json}` + `-before.json`), README Faz 7 bölümü güncellendi.
- [x] Karar kaydedildi: "preconnect eklenmedi, regresyon yok" (README + PHASE-7); DECISIONS'a girdi gerekmedi.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md + PHASE-7.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-01

**Durum:** ✅ Tamamlandı

**Son Yaklaşım:** Same-env before/after Lighthouse. after = HEAD (Umami'li) fresh build; before = `layout.tsx` f065700'e döndürülüp aynı ortamda yeniden build. Her ikisi TR `/` (`NEXT_LOCALE=tr` cookie), mobil ×5 + masaüstü ×3 median, düşük host yükü. Kod değişikliği yapılmadı (yalnız ölçüm + doküman); before ölçümü sonrası `layout.tsx` HEAD'e geri alındı (working tree temiz).

**Sonraki Adım Detayı:** Task tamamlandı — fazdaki tüm task'lar (7.01 ✅, 7.02 ✅) bitti → sıradaki adım `/devflow:verify-phase 7` (canlı +1 doğrulaması dahil, merge sonrası kiwiailab.com panelinde).

**Yapılanlar:**
- **Ortam:** node 20.20.2 + Chrome 150 + LH 13.3.0 (npx-cache) zaten kuruluydu — kurulum gerekmedi. Flags: `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`.
- **Ölçüm:** mobil TR `/` — before perf 90 / LCP 3009ms, after perf 88 / LCP 2714ms (dağılımlar örtüşük, delta gürültü bandı). Masaüstü — before/after perf 100, LCP 611→660ms. CLS 0.000 her yerde.
- **Regresyon YOK:** LCP/FCP/CLS Faz 6 tabanının (mobil LCP 3164ms, masaüstü 0.69s) altında/eşit. `network-requests` audit'i Umami isteğinin ölçümde fiilen alındığını (after'da var, before'da yok) gösterdi — yani script yüklendiği halde LCP'ye zarar vermedi (`afterInteractive` LCP penceresinden sonra enjekte eder → hero-metni LCP elementiyle yarışmaz).
- **Karar:** preconnect/dns-prefetch eklenmedi (araştırma D · YAGNI); 7.01 dosyalarına dokunulmadı; DECISIONS'a girdi gerekmedi.
- **Artefaktlar:** `docs/perf/home-{mobile,desktop}-20260701-faz7.{html,json}` (after kanonik) + `-before.json` (attribution). README'ye Faz 7 bölümü + intro güncellendi.
- **Test:** npm test yeşil (7/7); build temiz (before + after).

---

**Oluşturulma:** 2026-07-01
