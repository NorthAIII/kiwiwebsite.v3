# TASK-3.01: Kanonik Doğrulama Ortamı + Build-Temizliği Tabanı

**Durum:** ⬜ Bekliyor
**Modül:** M6 — SEO & Deploy (modules/M6-SEO-Deploy.md) (+ tüm modüllerin yayın tabanı)
**Feature:** S8 (build-temizliği kalemi) + Faz 3 ortam altyapısı
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** Yok (fazın ilk task'i — diğer tüm senaryo task'ları buna dayanır)

---

## Hedef

Faz 3 senaryo testlerinin koşacağı **kanonik ortamı** kur: `next build` temiz geçer (0 hata / 0 uyarı = S8 "regresyon tabanı" kalemi), prod sunucu (`next start`) temiz bir portta ayağa kalkar, portu dinleyen PID'nin **az önce başlatılan fresh process** olduğu teyit edilir. Çıktı: doğrulanmış temiz build + sonraki task'ların yeniden kullanacağı, dokümante edilmiş serve prosedürü. Build temiz + prod serve yanıt veriyor + PID teyitli + prosedür kaydedildiğinde tamamlanmış sayılır.

---

## Bağlam

Araştırma kararı **TK2:** kanonik doğrulama ortamı = *fresh prod build* (`next build` → `next start`). Gerekçe: (a) canlıya giden çıktı budur — SSG prerender (`.next/server/app/*.html`) ground-truth, redirect/middleware prod davranışı gerçek; (b) `next build` zaten S8'in "temiz build = regresyon tabanı" kalemi; (c) dev server'ın HMR/error-overlay/minify-yok gürültüsü versiyon-sonu doğrulamayı kirletir. Build-clean'i faza başlarken çalıştırmak erken risk azaltır — build kırıksa faz peşinen bloke olur. Memory disiplini: önceki oturumdan kalan **stray/stale `next-server`** portu tutup eski build sunabilir (yanlış-negatif); serve eden PID'nin fresh process olduğu zorunlu teyit.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M6-SEO-Deploy.md` — next config / build / redirect / deploy katmanı
- `_dev/phases/PHASE-3.md` — Araştırma Bulguları → "Ortam Kararı (kanonik)" + TK2 + Dikkat (stray next-server)
- `_dev/MEMORY.md` → Süreç Disiplinleri — PID teyit + loadavg gözlem

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.01 durumu

---

## Alt Görevler

- [ ] **1. Temiz prod build**
  - `next build` çalıştır (package.json script).
  - Çıktıda TS hatası / build hatası / uyarı olmadığını doğrula → **S8 regresyon tabanı**. `three` transpile sorunsuz (transpilePackages, next.config.ts).
  - Build çıktısını (özet) task kaydına al.

- [ ] **2. Prod serve (temiz port)**
  - `next start` ile prod sunucuyu ayağa kaldır. Tercihen 3000; doluysa boş bir port seç.
  - `curl -I http://localhost:PORT/` → 200 (TR home) ile yanıt verdiğini doğrula.

- [ ] **3. Listening-PID teyidi (memory disiplini)**
  - `ss -ltnp` (veya `lsof -i`) ile portu dinleyen PID'nin **az önce başlattığın** `next-server` olduğunu teyit et (stray/stale değil).
  - Şüphede `.next/server/app/*.html` prerender ground-truth ile karşılaştır.

- [ ] **4. Serve prosedürünü kaydet**
  - Sonraki senaryo task'larının yeniden kullanacağı komut + port + PID-teyit adımlarını bu task dokümanına yaz.
  - Not: kod değişmediği sürece `.next/` build yeniden kullanılır; bir **triyaj-fix** kaynak kodu değiştirdiyse o task rebuild eder.

---

## Etkilenen Dosyalar

```
(Doğrulama/altyapı task'i — kaynak kod değişikliği yok.)
.next/                 # build artefaktı (gitignore) — diske yazılır, sonraki task'lar yeniden kullanır
```

Bulgular bu task dokümanına (Oturum Kayıtları / Test Sonuçları) kaydedilir.

---

## Dikkat Noktaları

- **Build-clean = S8'in build kalemi** — TASK-3.09'da tekrar edilmez (orası JS-off SSG + race). 3.09 bu task'ın tabanına dayanır.
- **Stray/stale `next-server` yanlış-negatifi** (memory Süreç Disiplinleri): port tutan eski build edit-öncesi metni sunabilir → "metin bulunamadı" yanılır. PID teyidi zorunlu.
- **`package.json` / bağımlılıklara dokunma** — Playwright MCP projede kurulu DEĞİL ve kurulmayacak (oturuma bağlı sürücü; CLAUDE.md Dokunulmazlar).
- Serve stabilitesi için `cat /proc/loadavg` (perf ölçümü değil ama yük gözlemi — memory).
- Çalışan sunucu süreci oturum sonunda ölür → kalıcı çıktı = disk build (`.next/`) + dokümante prosedür + build-clean teyidi.

---

## Test Kriterleri

- [ ] `next build` 0 hata / 0 uyarı ile tamamlandı (çıktı kaydedildi).
- [ ] `next start` prod sunucu 200 veriyor (`curl -I localhost:PORT` → TR home 200).
- [ ] Portu dinleyen PID = az önce başlatılan fresh `next-server` (teyit kaydı var).
- [ ] Serve prosedürü dokümante edildi (sonraki task'lar referans alır).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** ⬜ Bekliyor

---

**Oluşturulma:** 2026-06-29
