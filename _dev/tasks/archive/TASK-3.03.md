# TASK-3.03: S5 — Taksonomi & Dürüstlük Tutarlılığı (5 dil render)

**Durum:** ✅ Tamamlandı
**Modül:** M2 — Sayfalar & Bölümler (modules/M2-Sayfalar-Bolumler.md) (+ M4)
**Feature:** S5 — Taksonomi & dürüstlük tutarlılığı (çapraz/sahipsiz validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (kanonik prod serve gerekir)

---

## Hedef

Render edilen **görünür metinde** ürün taksonomisi ve dürüstlük konvansiyonunun 5 dilde tutarlı olduğunu doğrula: "Crew OS" her yüzeyde görünür, "Bunker" hiçbir görünür yüzeyde yok; render'da uydurma müşteri-sonucu / sahte "● online" presence / yasak metafor (doktor/teşhis/hekim/reçete, zayıf adım adı) yok. Araç: curl ile 5 dil home HTML çek + grep. Beş dilde tarama bitip sonuçlar kaydedildiğinde tamamlanmış sayılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.5 Crew OS teaser (taksonomi), F2.4 dürüst canlı rozet
- `_dev/phases/PHASE-3.md` — Araştırma → Dikkat ("Bunker" anahtar ≠ render yüzeyi) + S5 araç satırı
- `_dev/ILKELER.md` — Marka sesi yasakları + "● online" niyet-bazlı kapsam

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.03 durumu

---

## Alt Görevler

- [x] **1. "Crew OS" varlığı (5 dil)** ✅
  - 5 dil home render görünür metinde bayrak katman **"Crew OS"** olarak **7'şer kez** geçer (nav, hero stat, 4. adım, teaser bölümü başlık/gövde, CTA, canlı panel başlığı, chatbot soru-çipi). Tüm dillerde marka adı Latin "Crew OS" korunur (AR dahil).

- [x] **2. "Bunker" sızıntısı yok (5 dil)** ✅
  - Render edilen **görünür metinde** "Bunker" (case varyasyonları dahil) **5 dilde de 0**. Ham HTML'de 7'şer geçiş tamamen **iç kalıntı** ve render yüzeyi değil: `id="bunker"` (section anchor), `href="#bunker"` (nav anchor), `href="/bunker-os"` (route, M6 ertelendi), RSC flight payload'daki `bunker`/`bunkerOs` namespace anahtarları (değer `"Crew OS"` olarak çözülüyor). Araştırma notuyla birebir uyumlu.

- [x] **3. Yasak metafor taraması (5 dil)** ✅
  - Render görünür metinde doktor/teşhis/hekim/reçete + çok-dilli karşılıkları (doctor/diagnos/طبيب/Arzt/médico/تشخيص/Diagnose/physician/reçete/prescri/Rezept/receta/وصفة) **5 dilde de 0**.
  - Zayıf adım adı "Dinle/Listen" + karşılıkları (escuch/zuhör/hören/استمع/إصغ) **5 dilde de 0**. 4 adım hepsinde güçlü aktif fiille başlıyor (Analiz/Analyze/التحليل/Analysieren/Analizar · Çözüm/Design · Otomasyon/Automate · Raporlama/Report).

- [x] **4. Sahte presence & uydurma sonuç (5 dil)** ✅
  - Sahte "● online/canlı" presence tiyatrosu **yok**: "●" karakteri ham HTML'de 5 dilde de 0; "online/çevrimiçi/en línea/متصل" görünür metinde 0. Mevcut "canlı/live" göstergeleri **dürüst çerçevede** (niyet-bazlı yasağın dışında): Alpfit "Şu an canlı"/"Canlı — Alpfit" (Alpfit gerçekten canlı), chatbot "Canlı demo" (gerçek streaming ürün), Crew OS paneli "canlı · 4 akış" (M2 F2.5 kararı: platformda çalışan gerçek akışlar çerçevesi — bırakıldı).
  - Uydurma müşteri sonucu **yok**: "%" sembolü 5 dilde de 0; tek "$" geçişi (110.000$) bülten makale teaser'ında **sektörel kıyas** ("insan bir SDR yılda 110.000$+ tutarken… AI SDR araçları *vaat ediyor*"), Kiwi sonucu değil. Sektör akışı örneği ("üye 30 gündür giriş yapmadı") açıkça **örnek-işaretli** ("aşağıdaki her örnek… özellik listesi değil" / "not a feature list" / كل مثال / Jedes Beispiel / Cada ejemplo). Dürüstlük konvansiyonu ("kazanç varsayılmaz, ölçülür" / "measured not assumed" / يُقاس / gemessen / se mide) **5 dilde de mevcut** (R4/F5).

- [x] **5. Triyaj (TK6)** ✅
  - Kapsam-içi (ana sayfa) gerçek bug **bulunmadı** — taksonomi (Crew OS var / Bunker yok) ve dürüstlük (sahte presence yok / uydurma sonuç yok / yasak metafor yok) **5 dilde tutarlı**. Kaynak kod değişmedi; düzeltme task'ı açılmadı.

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Bulgular bu task dokümanına kaydedilir; özet verify-phase'de PHASE-3 UAT'ına taşınır. İstisna: kapsam-içi bug → ayrı fix-task.

---

## Dikkat Noktaları

- **"Bunker" anahtar-adı/komponent/route ≠ render yüzeyi.** messages JSON'da `bunker` bir namespace anahtarı; değeri her dilde **"Crew OS"** **(repo:** messages/*.json:10**).** `Bunker.tsx` + `/bunker-os` href iç kalıntı (public `/crew-os` ertelendi — M6). S5 yalnız **render edilen görünür metni** denetler; kaynak/URL değil.
- **"● online" yasağı niyet-bazlı** (ILKELER + DECISIONS 2026-06-28): sahte presence tiyatrosu yasak; gerçek canlı ürünün dürüst göstergesi serbest.
- **Ortam:** TASK-3.01 prod serve; PID fresh teyit (memory).

---

## Test Kriterleri

- [x] 5 dil görünür metinde "Crew OS" mevcut (7'şer kez). ✅
- [x] 5 dil görünür metinde "Bunker" YOK (route/komponent/namespace iç kalıntısı hariç — ham HTML'de 7 kalıntı, görünür metinde 0). ✅
- [x] 5 dil render'da yasak metafor yok (medikal metafor + zayıf adım adı 0). ✅
- [x] Sahte "● online" presence yok (● 0); sonuç imaları "öngörü/örnek" çerçeveli, uydurma müşteri sonucu yok (% 0; $110k sektörel kıyas; dürüstlük konvansiyonu 5 dilde mevcut). ✅

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
- Kanonik ortam ayağa kaldırıldı (TASK-3.01 serve prosedürü): host load 0.58 (düşük), git temiz (kaynak değişmedi → rebuild yok), `.next` BUILD_ID `3XVc2JiI9bd7YwfUGuwYx`, fresh prod serve port 3000 (`✓ Ready 507ms`). Listening-PID 3166644 fresh-teyitli (bugün 00:34, sahip kivanc) + ground-truth (served `<title>` == disk `tr.html`; 5 dil çekilen HTML boyutu disk prerender ile birebir eşleşti). Stray PID 12708 (uid 1001, portsuz) zararsız bırakıldı.
- **Yöntem:** curl ile 5 dil home HTML çekildi → node ile **görünür metin** ayıklandı (`<script>`/`<style>` blokları + tüm tag'ler çıkarıldı, entity decode; RSC flight payload script'te olduğundan dışlandı) → 5 dilde sistematik grep. Görünür metin tabanı: render edilen DOM metni (kaynak/URL/flight değil).
- **AG1 — Crew OS varlığı:** 5 dilde de görünür metinde **7'şer kez** (tutarlı). Marka adı Latin korunur (AR dahil).
- **AG2 — Bunker sızıntısı:** görünür metinde **5 dilde 0**. Ham HTML'deki 7'şer kalıntının hepsi iç (section id, anchor href, `/bunker-os` route href, RSC namespace anahtarı `bunker`→değer "Crew OS"). Render yüzeyi temiz.
- **AG3 — yasak metafor:** medikal metafor (doktor/teşhis/hekim/reçete + çok-dilli karşılıkları) **5 dilde 0**; zayıf adım adı (Dinle/Listen + karşılıkları) **5 dilde 0**. 4 adım güçlü aktif fiil.
- **AG4 — sahte presence + uydurma sonuç:** "●" ham HTML'de 5 dilde 0; online/çevrimiçi 0. "canlı/live" göstergeleri dürüst (Alpfit canlı, chatbot gerçek streaming, Crew OS paneli platform-akış çerçevesi). "%" 0; tek "$" (110.000$) sektörel kıyas (bülten makale, "vaat ediyor"), Kiwi sonucu değil; sektör akışı örnek-işaretli; dürüstlük konvansiyonu 5 dilde mevcut.
- **AG5 — triyaj:** kapsam-içi gerçek bug yok; taksonomi + dürüstlük 5 dilde tutarlı.

**Sorunlar:**
- Yok. (Beklenen iç kalıntılar — `/bunker-os` route, `bunker` namespace anahtarı — render yüzeyi olmadığından bulgu değil; M6'da public `/crew-os` kararıyla zaten sahipli/ertelenmiş.)

**Kararlar:**
- Doğrulama task'i; kaynak kod değişmedi, düzeltme task'ı açılmadı. docs/DECISIONS.md'ye ekleme: Hayır (yeni karar yok; mevcut taksonomi + dürüstlük konvansiyonu kararlarının render-seviyesi teyidi).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- Kaynak kod değişikliği yok (S5 doğrulama task'i). Disk: `.next/` yeniden kullanıldı (rebuild yok). Serve prosesi oturum sonunda öldürüldü, port 3000 temiz.
- `_dev/tasks/TASK-3.03.md` → alt görevler/test/tamamlanma ✅, oturum kaydı.
- `_dev/DURUM.md`, `_dev/phases/PHASE-3.md` → durum güncellemeleri.

**Test Sonuçları:**
- Crew OS: 5 dil × 7 görünür-metin geçişi. ✅
- Bunker: görünür metin 5 dil × 0 (iç kalıntı hariç). ✅
- Yasak metafor (medikal + zayıf adım): 5 dil × 0. ✅
- Sahte presence (●/online): 0; uydurma sonuç: 0 (% 0, $110k sektörel kıyas, dürüstlük konvansiyonu 5 dilde mevcut). ✅

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-29

**Ne Yapıldı:**
- S5 taksonomi & dürüstlük tutarlılığı 5 dil render görünür metninde uçtan-uca koşuldu (curl + node görünür-metin ayıklama + grep): Crew OS her dilde var (7×), Bunker görünür yüzeyde yok (iç kalıntı route/namespace ayrıştırıldı), yasak metafor yok, sahte presence yok, uydurma müşteri sonucu yok (dürüstlük konvansiyonu 5 dilde mevcut).
- Kapsam-içi ana sayfa taksonomi/dürüstlük katmanında gerçek bug yok; kaynak kod değişmedi.

**Öğrenilenler:**
- Görünür-metin denetiminde RSC flight payload (`self.__next_f`) ham HTML'de görünür ama script-tag'de — `bunker` namespace anahtarı orada geçer, değeri "Crew OS"a çözülür; script bloklarını çıkararak render yüzeyini izole etmek "anahtar ≠ render yüzeyi" ayrımını mekanik olarak güvence altına alır.

---

**Oluşturulma:** 2026-06-29
