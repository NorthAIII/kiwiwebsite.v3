# TASK-3.01: Kanonik Doğrulama Ortamı + Build-Temizliği Tabanı

**Durum:** ✅ Tamamlandı
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

- [x] **1. Temiz prod build**
  - `next build` çalıştırıldı (`npm run build`). Çıktı: `✓ Compiled successfully in 1147ms`, type-check hatasız, `✓ Generating static pages (37/37)` → **0 hata / 0 uyarı = S8 regresyon tabanı**. `three` transpile sorunsuz (transpilePackages, next.config.ts). BUILD_ID: `3XVc2JiI9bd7YwfUGuwYx` (2026-06-29 00:17:36).

- [x] **2. Prod serve (temiz port)**
  - `npm run start` (`next start`, port 3000) ile prod sunucu ayağa kaldırıldı (`✓ Ready in 349ms`). `curl -I http://localhost:3000/` → **200 OK** (TR home). 5 locale smoke (/, /en, /ar, /de, /es) → hepsi **200**.

- [x] **3. Listening-PID teyidi (memory disiplini)**
  - `ss -ltnp` ile port 3000'i dinleyen PID = **3125540**, başlangıç **Mon Jun 29 00:18:11 2026** (bugün, fresh process — stray/stale değil). Ground-truth çapraz-kontrol: served `<title>` == disk `.next/server/app/tr.html` `<title>` (birebir eşleşme) → fresh build sunuluyor.
  - **Stray temizliği:** Önceki oturumdan kalan kendi stale `next-server`'ım (PID 2880857 + parent shell 2880856, Jun28 22:25 — port 3000'i eski build'le tutuyordu) `kill` ile temizlendi; port kanonik olarak boşaltıldıktan sonra fresh serve başlatıldı.

- [x] **4. Serve prosedürünü kaydet**
  - Aşağıdaki "Serve Prosedürü (kanonik)" bölümü yazıldı — sonraki senaryo task'ları (3.02–3.09) referans alır.

---

## Serve Prosedürü (kanonik — sonraki task'lar referans alır)

> Sonraki senaryo task'ları (3.02–3.09) bu prosedürle aynı kanonik ortamı ayağa kaldırır. **Kod değişmediği sürece** `.next/` build yeniden kullanılır — rebuild gerekmez; yalnız bir **triyaj-fix** kaynak kodu değiştirdiyse o task `npm run build` ile rebuild eder.

```bash
# 0) Host yükü gözle (perf-bitişik ölçüm yapan task'lar için; memory Süreç Disiplinleri)
cat /proc/loadavg

# 1) Stray/stale next-server avı (memory: yanlış-negatif kaynağı)
ss -ltnp 2>/dev/null | grep ":3000"        # 3000'i tutan biri var mı?
ps aux | grep next-server | grep -v grep    # eski oturumdan kalmış mı?
# Kendi stale process'in port 3000'i tutuyorsa öldür, portu boşalt:
#   kill <stale_pid> <parent_shell_pid>

# 2) (yalnız kod değiştiyse) temiz build — S8 tabanı
npm run build        # bekle: 0 hata / 0 uyarı, "Generating static pages (37/37)"

# 3) Fresh prod serve (kanonik port 3000)
npm run start        # next start → http://localhost:3000  ("✓ Ready in ~350ms")

# 4) Hazır olana dek bekle + 200 teyit
for i in $(seq 1 15); do curl -sf -o /dev/null http://localhost:3000/ && break; sleep 1; done
curl -sS -I http://localhost:3000/ | head -1   # bekle: HTTP/1.1 200 OK

# 5) Listening-PID teyidi — dinleyen PID az önce başlattığın FRESH process mi?
ss -ltnp 2>/dev/null | grep ":3000"            # users:(("next-server...",pid=<PID>))
ps -o pid,user,lstart,etime,cmd -p <PID>       # STARTED bugün + düşük ELAPSED = fresh
# Şüphede ground-truth: served HTML == .next/server/app/<locale>.html prerender
```

**Kanonik değerler (bu oturum):** port **3000** · prefixsiz TR home = `/` · 5 locale = `/ /en /ar /de /es` · prerender ground-truth = `.next/server/app/{tr,en,ar,de,es}.html` · `/api/chat` = dinamik (ƒ) · redirect/sitemap/robots SSG.

**Not:** Çalışan sunucu süreci oturum sonunda öldürülür → kalıcı çıktı = disk build (`.next/`) + bu dokümante prosedür + build-clean teyidi. Sonraki task kendi fresh serve'ünü başlatır (yukarıdaki adımlar).

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

- [x] `next build` 0 hata / 0 uyarı ile tamamlandı (çıktı kaydedildi — 37/37 static page, three transpile temiz).
- [x] `next start` prod sunucu 200 veriyor (`curl -I localhost:3000` → TR home 200; 5 locale 200).
- [x] Portu dinleyen PID = az önce başlatılan fresh `next-server` (PID 3125540, STARTED Jun 29 00:18, ground-truth eşleşti).
- [x] Serve prosedürü dokümante edildi (sonraki task'lar referans alır — "Serve Prosedürü (kanonik)" bölümü).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- Ortam haritalandı: host load 0.42 (düşük), node v24.16.0, npm 11.13.0, 20 çekirdek.
- `npm run build` → temiz: `✓ Compiled successfully (1147ms)`, type-check hatasız, `✓ Generating static pages (37/37)`, 0 hata/0 uyarı. **S8 regresyon tabanı kuruldu.** BUILD_ID `3XVc2JiI9bd7YwfUGuwYx`.
- Stray temizliği (memory disiplini): Jun28'den kalan kendi stale `next-server`'ım (PID 2880857 + parent 2880856) port 3000'i eski build'le tutuyordu → `kill` ile temizlendi, port kanonik boşaltıldı.
- `npm run start` → fresh prod serve port 3000 (`✓ Ready 349ms`). `curl -I /` → 200; 5 locale → 200.
- Listening-PID teyidi: PID 3125540, STARTED Jun 29 00:18 (fresh). Ground-truth: served `<title>` == disk `tr.html` `<title>` (eşleşme) → fresh build sunuluyor.
- Kanonik "Serve Prosedürü" task dokümanına yazıldı (3.02–3.09 referansı).

**Sorunlar:**
- Port 3000 stale `next-server` (Jun28 leftover) tutuyordu — tam da memory'nin uyardığı yanlış-negatif kaynağı: Öldürülüp fresh process ile kanonik port yeniden kuruldu, PID + ground-truth ile teyit edildi.

**Kararlar:**
- Kanonik port = 3000 (boşaltıldı, fresh serve sahibi). Gerekçe: öngörülebilir tek port; stray landmine kaldırıldı.
- docs/DECISIONS.md'ye eklendi: Hayır (mimari karar değil; TK2 zaten PHASE-3 araştırmada).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- Kaynak kod değişikliği yok (doğrulama/altyapı task'i). Disk çıktısı: `.next/` (gitignore) yeniden üretildi.
- `_dev/tasks/TASK-3.01.md` → alt görevler/test kriterleri ✅, kanonik serve prosedürü eklendi, oturum kaydı.
- `_dev/DURUM.md`, `_dev/phases/PHASE-3.md` → durum güncellemeleri.

**Test Sonuçları:**
- `next build`: 0 hata / 0 uyarı, 37/37 static page. ✅
- `curl -I http://localhost:3000/`: HTTP/1.1 200 OK (TR home). ✅
- 5 locale (/, /en, /ar, /de, /es): hepsi 200. ✅
- Listening-PID = fresh (3125540, bugün) + ground-truth title eşleşmesi. ✅

---

**Oluşturulma:** 2026-06-29
