# TASK-4.01: a11y otoriter re-ölçüm — başarısız-denetim envanterini sabitle

**Durum:** ⬜ Bekliyor
**Modül:** M1/M2/M3 (a11y yüzeyleri) — ölçüm yöntemi `docs/perf/README.md`
**Feature:** A11Y1/A11Y2/A11Y3 — başarısız-denetim envanteri teyidi
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** Yok (faz açılış task'ı)

---

## Hedef

Ana sayfanın **current build**'inde otoriter bir a11y re-ölçümü yaparak Faz 4 fix'lerinin hedefleyeceği **kesin başarısız-denetim envanterini** sabitlemek. `docs/perf/README.md` a11y tabanı (2026-06-28, 89) **stale** — başarısız öğeleri kaba/hesaplanmış renk olarak kaydetmiş ve bazı kalemler (örn. baseline "CTA `a.group` #8af28a") current kodda zaten çözülmüş olabilir. Bu task kod **değiştirmez**; yalnızca Lighthouse (light gate) + axe (her iki tema, mobil+masaüstü) ile gerçek başarısız 4 denetimi (color-contrast / definition-list / dlitem / label-content-name-mismatch) ve flag'lenen öğeleri saptar, araştırmadaki kontrast envanteriyle uzlaştırır. Tamamlanma: teyitli envanter task oturum kaydına yazıldı ve sonraki fix task'larının kapsamı doğrulandı.

---

## Bağlam

Milestone #1 ("ölç + doğrula") ve araştırma kararı **K6**: stale baseline → current build'de otoriter ölçümle başarısız-denetim listesi sabitlenir; sonra fixler; sonra a11y=100 doğrulanır (TASK-4.07). Lighthouse light-mode ölçer → a11y=100 **kapısı LIGHT mode**; dark mode kontrastı da düzeltilir (K2 token koyulaştırma her iki temayı kapsar) ama dark için axe ile elle teyit gerekir. Bu task fix'lerin değil **gerçeğin** task'ı: ne kadar denetim, hangi öğelerde başarısız, hangi temada.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — "Araştırma Bulguları" → Baseline-kod drift'i, Kontrast Envanteri, K6
- `_dev/docs/perf/README.md` — kanonik Lighthouse yöntemi + "Accessibility 89" kırılımı (stale taban)
- `_dev/QUALITY.md` — §2 Erişilebilirlik kontrol noktaları

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.01 durumunu güncelle; teyitli envanter araştırma envanterinden **materyal olarak** sapıyorsa "Araştırma Bulguları"na kısa "Task 4.01 re-ölçüm teyidi" notu ekle (sapma yoksa eklenmez)

---

## Alt Görevler

- [ ] **1. Fresh prod serve kur (kanonik disiplin)**
  - `rm -rf .next && next build` (exit 0, 0 uyarı beklenir) → `next start` net portta
  - Serve eden PID'in **az önce başlattığın fresh process** olduğunu `ss -ltnp` / `lsof -i` ile teyit et (stray `next-server` yanlış-negatifine dikkat — MEMORY Süreç Disiplinleri)
  - `cat /proc/loadavg` → düşük yük (≤~6); yüksekse bekle/temizle (perf koşusu için kritik; a11y skoru ortamdan bağımsız ama aynı oturumda perf tabanı da okunacak)

- [ ] **2. Lighthouse a11y ölçümü (light gate, mobil + masaüstü)**
  - `docs/perf/README.md` kanonik yöntemi (npx lighthouse, cache sürüm); ana sayfa (TR `/`, `NEXT_LOCALE=tr` cookie — Accept-Language locale-redirect tuzağı, MEMORY Teknik Tuzaklar)
  - Çoklu koşu, a11y skorunu kaydet (pre-fix; ~89 beklenir)
  - **4 denetimi** ayıkla: `color-contrast`, `definition-list`, `dlitem`, `label-content-name-mismatch` — her birinde flag'lenen öğe listesini çıkar

- [ ] **3. axe denetimi — her iki tema**
  - Light (Lighthouse gate teması) + dark (`html.dark`) için axe çalıştır (araç TASK kapsamında: Playwright MCP `browser_evaluate` ile axe-core CDN enjekte **veya** `npx @axe-core/cli` — package.json'a EKLENMEZ, lighthouse precedent'i)
  - Dark'a özel kontrast başarısızlıklarını ayrıca not et (research: dark `text-ink-faint` #7d8073 → 4.17 ❌)

- [ ] **4. Envanteri uzlaştır ve sabitle**
  - Teyitli başarısız öğeleri PHASE-4 "Kontrast Envanteri" + fix kararlarıyla (K1/K3/K4/K5) karşılaştır
  - Çözülmüş/yeni/kayıp kalemleri işaretle; **materyal sapma** varsa (planlanan bir fix'in hedefi artık başarısız değil, ya da plansız yeni başarısız öğe) **dur, kullanıcıya bildir** (Durma koşulu: kapsam belirsizliği) — fix task kapsamı buna göre verify-plan/run-task'ta ayarlanır

---

## Etkilenen Dosyalar

```
(kaynak kod değişmez — yalnız ölçüm)
_dev/tasks/TASK-4.01.md   # oturum kaydı: teyitli envanter
.next/                     # geçici build (commit edilmez)
```

> Lighthouse JSON/HTML çıktısı pre-fix referansı olarak `_dev/docs/perf/`'e dated artifact kaydedilebilir (opsiyonel; kanonik README taban tablosu TASK-4.07'de post-fix koşuyla güncellenir — burada README **değişmez**, çift-güncelleme önlenir).

---

## Dikkat Noktaları

- **Kod değişmez.** Bu task yalnız ölçüm/teşhis; herhangi bir fix bu task'ta yapılmaz (fix'ler 4.02-4.06).
- **Lighthouse light gate.** a11y=100 hedefi light mode'da ölçülür; dark axe ile ayrı teyit. İki temayı da raporla.
- **Fresh-prod-serve + listening-PID teyidi** zorunlu (stray next-server eski build'i sunarsa "düzeldi/bozuldu" yanlış okunur — MEMORY Süreç Disiplinleri).
- **TR-birincil test** `NEXT_LOCALE=tr` cookie ile (curl Accept-Language göndermez; tarayıcı `/`'ı locale'e yönlendirebilir — MEMORY Teknik Tuzaklar).
- **Host yükü** `/proc/loadavg` ile gözlemlenir; yüksek-yük perf koşusunu bozar (a11y'yi değil). Aynı oturumda perf/CLS tabanını da oku (TASK-4.07 regresyon karşılaştırması için referans noktası).

---

## Test Kriterleri

- [ ] Fresh prod serve listening-PID teyit edildi; `/proc/loadavg` düşük kaydedildi
- [ ] Lighthouse a11y skoru (mobil + masaüstü) ölçüldü ve kaydedildi (pre-fix)
- [ ] 4 denetim (color-contrast / definition-list / dlitem / label-content-name-mismatch) flag'lenen öğeleriyle envantere yazıldı
- [ ] axe her iki temada (light + dark) çalıştı; dark-özel başarısızlıklar ayrıca not edildi
- [ ] Teyitli envanter PHASE-4 araştırma envanteriyle uzlaştırıldı; sapma varsa kullanıcıya bildirildi

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman güncellendi (oturum kaydı: teyitli envanter)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

**Yapılanlar:**
- [doldurulacak — teyitli envanter buraya]

---

**Oluşturulma:** 2026-06-29
