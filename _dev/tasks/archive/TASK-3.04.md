# TASK-3.04: S6 — 5-Dil Bütünlük & non-TR Tutarlılığı

**Durum:** ✅ Tamamlandı
**Modül:** M4 — i18n & Yerelleştirme (modules/M4-i18n.md) (+ M2)
**Feature:** S6 — 5-dil bütünlük & non-TR tutarlılığı (versiyon-sonu çekirdek validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (runtime MISSING_MESSAGE avı için prod serve gerekir)

---

## Hedef

i18n bütünlüğünü iki katmanda doğrula (TK4): (1) **yapısal parite** — node key-diff ile 5 dil aynı leaf-key setini taşıyor mu (araştırma tabanı: 183 leaf-key, 0 eksik / 0 fazla; re-teyit); (2) **runtime boşluk** — 5 dil home render'da `MISSING_MESSAGE` yok; (3) **bilinçli-stale tutarlılık** — non-TR değerleri görünür kopukluk (yarım-çeviri) yaratmıyor + AR-RTL aynalama bütün. TR tek kaynak; stale içeriğin *kalitesi* kapsam dışı. Üç katman koşulup kaydedildiğinde tamamlanmış sayılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M4-i18n.md` — F4.2 çeviri içerikleri (eksik anahtar vs stale ayrımı), F4.3 RTL
- `_dev/phases/PHASE-3.md` — Araştırma → Dikkat (parite zaten 183/temiz) + TK4 + S6 araç satırı
- `_dev/MEMORY.md` → Süreç Disiplinleri — "anahtar varlığı ≠ değer tazeliği" ayrımı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.04 durumu

---

## Alt Görevler

- [x] **1. Yapısal parite (node key-diff)**
  - Bir node script ile `messages/{tr,en,ar,de,es}.json` recursive leaf-key setlerini çıkar; 5 dili karşılaştır → eksik/fazla 0 (taban 183). Eksik anahtar = **pazarlık-dışı** hata. **Sonuç: 5 dil de 183 leaf-key, 0 eksik / 0 fazla — PARİTE TEMİZ; 183 taban re-teyit.**

- [x] **2. Runtime boşluk (5 dil render)**
  - 5 dil home render HTML'de `MISSING_MESSAGE` (next-intl runtime hata string'i — **lib**) grep → 0. **Sonuç: 5 dil home HTTP 200, MISSING_MESSAGE = 0 (ayrıca IntlError 0, "Could not resolve" 0).**

- [x] **3. TD1-senkron kalemleri**
  - R1 step (`report`/4. adım), R2 gym paneli, F6 hero ikincil CTA değerleri 5 dilde **hizalı** (anahtar var; non-TR değer stale olabilir ama mevcut). **Sonuç: 3 kalem de 5 dilde anahtar-hizalı VE tam çevrili (`how.steps.report`, `sectors.items.gyms` [6 sektör paritesi tam], `hero.ctaSecondary`).**

- [x] **4. Bilinçli-stale tutarlılık gözlemi**
  - non-TR home render'da yarım-çeviri / karışık-dil / görünür kopukluk yok (anahtar var → render bütün). Stale = "eski ama tam cümle" kabul; boşluk/MISSING değil. **Sonuç: kaynak-seviyesi 18/183 birebir-TR değer, tamamı meşru (16 marka/sayı + 2 ortak-kelime "Form"/"WhatsApp", ikisi de `/bunker-os` alt-sayfasında, home değil); render-seviyesi 4 non-TR'de TR-cümle leak = 0, pozitif kontrol 3/3 her dilde, görünür-metin uzunlukları dengeli (3347–4572 char). Gerçek stale-leak = 0.**

- [x] **5. AR-RTL aynalama (parite bağlamı)**
  - `/ar` home `<html dir="rtl">` + layout mantıksal aynalama bütün (derin degradasyon S3'te; burada parite/render-bütünlük bağlamı). **Sonuç: `<html lang="ar" dir="rtl">` doğru, diğer 4 dil `dir="ltr"`; AR render bütün (3/3 AR string). Physical `left-0/left-1` util'leri 5 dilde birebir aynı (scroll-progress bar `w-full origin-left` + custom cursor `fixed left-0 top-0`, JS-transform çapalı) → AR'ye özgü kırılma değil, yön-nötr.**

- [x] **6. Triyaj (TK6)**
  - **Kapsam-içi (ana sayfa) gerçek bug yok.** i18n bütünlüğü 3 katmanda (yapısal parite / runtime boşluk / bilinçli-stale tutarlılık) + AR-RTL parite bağlamında GREEN. **S3'e taşınan gözlem (sahipli, fix değil):** scroll-progress bar `origin-left scale-x-0` — RTL'de derin yön-davranışı (sol→sağ büyüme) S3/TASK-3.06 kapsamında değerlendirilir; render-bütünlük kırılması değil, tüm dillerde ortak bileşen.

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Key-diff için geçici node script `scratchpad`'de tutulabilir (repo'ya commit edilmez). Bulgular bu task dokümanına. İstisna: eksik anahtar (yapısal) bulunursa → fix-task (5 dile ekle — pazarlık-dışı).

---

## Dikkat Noktaları

- **Parite zaten GREEN** (183 leaf-key, research'te node ile doğrulandı **(repo)**) → ağırlık runtime + tutarlılıkta, yapısal değil. Re-teyit yine de yapılır (regresyon kontrolü).
- **Eksik anahtar ≠ stale değer** (memory Süreç Disiplini): eksik anahtar (yapısal) = pazarlık-dışı runtime boşluk; stale değer = kabul (versiyon-sınırı, TR tek kaynak — ILKELER, DECISIONS dil stratejisi). Ayrımı koru.
- **`MISSING_MESSAGE`** = next-intl runtime string **(lib)** — render'da aranır, JSON'da değil.
- **Ortam:** runtime grep için TASK-3.01 prod serve; key-diff serve gerektirmez (statik JSON). PID fresh teyit (memory).

---

## Test Kriterleri

- [x] node key-diff: 5 dil leaf-key paritesi temiz (eksik/fazla 0; 183 taban re-teyit). ✅
- [x] 5 dil render'da `MISSING_MESSAGE` = 0. ✅
- [x] TD1-senkron 3 kalem (report / gym / CTA) 5 dilde anahtar-hizalı. ✅
- [x] non-TR home görünür kopukluk yok (bilinçli-stale tutarlı). ✅
- [x] `/ar` `dir=rtl` + mantıksal aynalama bütün. ✅

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

**Son Yaklaşım:** Üç-katman i18n doğrulaması (TK4) + AR-RTL parite bağlamı, hibrit araç (node key-diff statik JSON + fresh prod serve curl/grep render). Kaynak değişmeyen doğrulama task'i.

**Yapılanlar:**
- **Kanonik ortam (TASK-3.01 prosedürü):** host load 0.17 (düşük); git temiz; fresh `next build` (route tablosu üretildi, hata yok) → `next start -p 3005` temiz portta. Listening-PID 3239603 fresh-teyitli (etimes 7s, sahip kivanc, parent `npm exec next start -p 3005`). Stray PID 12708 (uid 1001, ~24h, port 3001/3002) **benim değil** → izole bırakıldı, kullanılmadı. Oturum sonunda 3005 prosesi öldürüldü (reparent olan next-server child PID ile), port temiz; Jun28 stray'e dokunulmadı.
- **AG1 — Yapısal parite (node key-diff):** `messages/{tr,en,ar,de,es}.json` recursive leaf-key setleri çıkarıldı → **5 dil de 183 key, 0 eksik / 0 fazla. PARİTE TEMİZ; araştırma tabanı 183 re-teyit.**
- **AG2 — Runtime boşluk:** 5 dil home render (TR `/`, `/en` `/ar` `/de` `/es`) HTTP 200; `MISSING_MESSAGE` grep **5 dil × 0** (ek olarak `IntlError` 0, "Could not resolve" 0). Parite temiz olduğundan statik-keyli lookup'ta MISSING yapısal olarak imkânsız; grep dinamik-key miss'i de eler → 0.
- **AG3 — TD1-senkron 3 kalem:** `how.steps.report` (4. adım), `sectors.items.gyms` (R2 tek-otomasyon; 6 sektör `gyms/clinics/ecommerce/realestate/education/restaurants` 5 dilde hizalı), `hero.ctaSecondary` (F6) — **5 dilde anahtar-hizalı VE tam çevrili** (stale değil). Dürüstlük konvansiyonu (ölçülür/measured/يُقاس/gemessen/se mide) `report` adımında 5 dilde mevcut.
- **AG4 — Bilinçli-stale tutarlılık:** Kaynak-seviyesi: her non-TR'de TR ile birebir-aynı string **18/183**, tamamı meşru (16 marka/sayı/kısa-işaret + 2 ortak-kelime `bunkerOs.diagram` "Form"/"WhatsApp" — ikisi de `/bunker-os` alt-sayfası, home değil). Render-seviyesi: 10 distinkt TR görünür-cümlesi 4 non-TR render'da **0 leak**; pozitif kontrol her dilin kendi metni **3/3 bütün**; görünür-metin uzunlukları dengeli (tr 4016 / en 3843 / ar 3347 / de 4572 / es 4405 char, anormal-kısa dil yok). **Gerçek stale TR-leak = 0; non-TR esasen tam çevrili.**
- **AG5 — AR-RTL aynalama (parite bağlamı):** `<html lang="ar" dir="rtl">` doğru; diğer 4 dil `dir="ltr"`. AR render bütün. Physical `left-0`(×3)/`left-1`(×1) util'leri **5 dilde birebir aynı** → AR'ye özgü kırılma değil; bağlam scroll-progress bar (`w-full origin-left`, full-width) + custom cursor (`fixed left-0 top-0`, JS-transform çapalı), ikisi de yön-nötr.
- **AG6 — Triyaj (TK6):** Kapsam-içi gerçek bug yok.

**Sorunlar:**
- Yok. (Beklenen iç kalıntılar — `bunkerOs.diagram` "Form"/"WhatsApp" ortak-kelimeleri, `/bunker-os` alt-sayfasında ve zaten home-dışı; M6'da public `/crew-os` kararıyla sahipli/ertelenmiş.)

**Kararlar:**
- Doğrulama task'i; kaynak kod değişmedi, düzeltme task'ı açılmadı. `docs/DECISIONS.md` ekleme: Hayır (yeni karar yok; mevcut i18n parite + TR-tek-kaynak + versiyon-sınırı çeviri kararlarının runtime/render teyidi).
- **S3'e taşınan gözlem (sahipli, fix değil):** scroll-progress bar `origin-left scale-x-0` RTL'de sol→sağ büyür — derin RTL yön-davranışı S3/TASK-3.06'da değerlendirilir; render-bütünlük kırılması değil, tüm dillerde ortak bileşen.

**Kalan İşler:** Yok.

**Sonraki Adım Detayı:** Faz 3 senaryo testi sürüyor — sıradaki TASK-3.05 (S2 tam TR yolculuğu, curl link + Playwright CTA/anchor). Yeni oturum.

**Dosya Değişiklikleri:**
- Kaynak kod değişikliği yok (S6 doğrulama task'i). Disk: fresh `.next/` rebuild (regresyon-temiz); serve prosesi oturum sonunda öldürüldü, port 3005 temiz. Geçici node script'ler `scratchpad`'de (repo'ya commit edilmez).
- `_dev/tasks/TASK-3.04.md` → alt görevler/test/tamamlanma ✅, oturum kaydı (bu).
- `_dev/DURUM.md`, `_dev/phases/PHASE-3.md` → durum güncellemeleri.

**Test Sonuçları:**
- Yapısal parite: 5 dil × 183 key, 0 eksik / 0 fazla. ✅
- Runtime: 5 dil home `MISSING_MESSAGE` = 0. ✅
- TD1-senkron 3 kalem (report/gym/CTA): 5 dilde anahtar-hizalı + tam çevrili. ✅
- Bilinçli-stale: render TR-leak 5 dil × 0, pozitif kontrol 3/3 her dilde. ✅
- AR-RTL: `dir=rtl` doğru, render bütün, physical-util AR-spesifik değil. ✅

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-29

**Ne Yapıldı:**
- S6 5-dil bütünlük & non-TR tutarlılığı üç katmanda uçtan-uca koşuldu: (1) yapısal parite (node key-diff, 5 dil × 183 leaf-key 0 eksik/fazla), (2) runtime boşluk (fresh prod serve, 5 dil render `MISSING_MESSAGE` = 0), (3) bilinçli-stale tutarlılık (kaynak + render seviyesi: gerçek TR-leak 0, non-TR esasen tam çevrili) + AR-RTL parite bağlamı (`dir=rtl` doğru, render bütün).
- TD1-senkron 3 kalem (R1 `report` / R2 gym / F6 hero ikincil CTA) 5 dilde anahtar-hizalı ve çevrili teyit edildi.
- Kapsam-içi ana sayfa i18n bütünlük katmanında gerçek bug yok; kaynak kod değişmedi.

**Öğrenilenler:**
- **Parite GREEN + MISSING_MESSAGE 0 birlikte iki-katman güvence:** statik key-diff yapısal eksiği eler, render grep dinamik-key miss'i (runtime) eler — biri diğerinin göremediğini kapatır.
- **"Birebir-TR değer" stale değil, leak metriğidir:** 18/183 birebir-aynı değerin tamamı marka/sayı/ortak-kelime çıktı; gerçek stale-leak ayırmak için marka-filtreli sayım + render-seviyesi distinkt-cümle leak kontrolü birlikte gerekir (tek başına "identical count" yanıltır).

---

**Oluşturulma:** 2026-06-29
