# TASK-1.03: Ana Sayfa Ses & Dürüstlük — F6 Hero CTA + F5/R3 Doğrulama Checkpoint

**Durum:** ✅ Tamamlandı
**Modül:** M2 (Hero/Bunker/Forum/SectorSolutions) + M4 (i18n) — `modules/M2-Sayfalar-Bolumler.md` (F2.2, F2.5), `modules/M4-i18n.md`
**Feature:** R4 — Ana sayfa ses & dürüstlük (F6 hero ikincil CTA + F5 dürüstlük taraması) + R3 Crew OS içerik teyidi
**Faz:** Phase 1 (`phases/PHASE-1.md`)
**Bağımlılıklar:** TASK-1.01 (R1) · TASK-1.02 (R2) — son ses/dürüstlük süpürmesi, R1+R2 indikten sonra ana sayfanın tamamını kapsar

---

## Hedef

İki iş bir arada: (1) **F6** — hero ikincil CTA etiketini belirsiz "Canlı gör"den çıktı-odaklı net bir etikete ("İşleyen örnekleri gör") getirmek (tek TR i18n metin değişimi; link hedefi `#sectors` zaten doğru, component dokunulmaz). (2) **F5 + R3 doğrulama checkpoint'i** (kodsuz) — ana sayfada render edilen tüm sonuç/sayı-imalı metnin dürüstlük konvansiyonuna uyduğunu (gerçek = gerçek, kurgu = öngörü/örnek) ve Crew OS bölümünün içerik/taksonomi olarak doğru olduğunu teyit etmek. F6 etiketi net, F5 taraması kayda bağlanmış (bulgu yoksa "temiz" kaydı) ve R3 teyidi geçtiğinde **tamamlanmış** sayılır.

---

## Bağlam

Research net sonucu: **F5 ve R3 = doğrulama checkpoint'leri (kod yok)**; F6 = tek i18n metin değişimi. Discuss kararı: "R3 ayrı task'e bölünmez; F5/ses taraması içinde tek doğrulama adımı olarak ele alınır" → R3 bu task'in bir adımıdır. F6 da R4 "ses revizesi"nin tek somut edit'i olduğundan aynı task'te toplanır (gereksiz tek-satırlık standalone task şişmesi önlenir).

**F5 ana sayfa riski düşük (research):** PRD'nin saydığı ihlaller (`forum.articles.one/two` — "…indirdik"/"…yarıya düşürdük") ve şemsiye `proof.note` ana sayfada **render EDİLMİYOR** (ölü anahtar — `src/`'de tüketim yok; teyit: `Forum.tsx` yalnız `featured.*` + `featured2.*` render eder). Render edilen tek sayı-imalı metin: `forum.featured.excerpt` "110.000$+" (sektör/pazar çerçevesi — "vaat ediyor"/"derledik" der; Kiwi müşteri sonucu değil) + "7/24" yetenek tanımı. → kodsuz teyit beklenir.

**R3 büyük ölçüde çözülmüş (research):** `bunker.{title,body,points}` platform kimliğini doğru anlatıyor; `bunker.flows` (Kaçan üye / Gelmeyen randevu / Sepet yanıtı / Aday→görüntüleme) "platformda çalışan gerçek akışlar" çerçevesinde **bırakıldı** (PRD kararı). Taksonomi: bayrak katman her yüzeyde **"Crew OS"** (iç ad "Bunker OS" görünmez). → teyit beklenir, değişiklik yok.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-1.md` — Kapsam (R4/F5 cümle-içi çerçeveleme, F6 etiket kararı, R3 checkpoint) + Araştırma (F5 ölü-anahtar bulgusu, R3 teyit)
- `_dev/PRD/features/kopya-revizesi.md` — R4 PRD kaynağı (F5 dürüstlük konvansiyonu + F6 hero ikincil CTA)
- `_dev/PRD/features/crew-os-bolumu.md` — R3 PRD kaynağı (ana metin doğru, flows bırakıldı)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.2 (hero CTA edge case), F2.5 (Crew OS R3)
- `_dev/docs/DECISIONS.md` — dil stratejisi + "● online/canlı" niyet-bazlı yasak (2026-06-28) + taksonomi (Crew OS/Bunker OS)
- `_dev/QUALITY.md` — §1 Marka & Craft, §4 Yerelleştirme (dürüstlük konvansiyonu)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task durumu/özeti
- `_dev/phases/PHASE-1.md` — Task Listesi tablosunda 1.03 durumunu güncelle
- `_dev/docs/DECISIONS.md` — F5 taraması yeni bir karar/erteleme üretirse (örn. ölü anahtar hijyeni) **özet** kayıt

---

## Alt Görevler

- [x] **1. F6 — Hero ikincil CTA etiketini güncelle**
  - Dosya: `messages/tr.json` → `hero.ctaSecondary` (satır 21)
  - Mevcut: "Canlı gör" (belirsiz — aslında `#sectors`'a kaydırıyor).
  - Yeni: "İşleyen örnekleri gör" (çıktı-odaklı, marka sesine yakın). Sabit çapalar korunur: hero başlığı ("İşinizi analiz ederiz. Sonra otomatikleştiririz."), birincil CTA ("Ücretsiz keşif görüşmesi al").
  - Link hedefi `#sectors` (`Hero.tsx:77`) zaten doğru → **component dokunulmaz**; non-TR stale kabul (aynı anahtar, değişen değer). ✅ Uygulandı.

- [x] **2. F5 — Ana sayfa dürüstlük taraması (kodsuz teyit)** → **SONUÇ: TEMİZ (kod değişimi yok).**
  - Ana sayfada **render edilen** sonuç/sayı-imalı metni tara: `Hero` (stats şeridi), `SectorSolutions` (her panel `automation`/`body`/`flow` + `note`), `Bunker` (panel metrikleri yoksa `points`), `Forum` (`featured.excerpt`, `featured2.excerpt`).
  - Her birinin ya **gerçek-veriye dayandığını** ya **öngörü/örnek** çerçevesinde okunduğunu teyit et. Uydurma müşteri-sonucu (örn. "no-show'u yarıya düşürdük" tarzı) ana sayfada render EDİLMEMELİ.
  - Cümle-içi çerçeveleme yöntemi (ayrı rozet/etiket EKLENMEZ — clutter yok, craft). Bir ihlal bulunursa cümle içinde öngörü/örneğe çevir (yalnız TR).
  - **Ölü anahtarlara dokunma** (`forum.articles.*`, `proof.*` render edilmiyor) — v0.1-dışı hijyen; bulgu DECISIONS'a not edilebilir.
  - **Bulgu:** Render edilen hiçbir metin uydurma müşteri-sonucu okutmuyor (detay → Oturum Kaydı tablosu). İhlal yok → TR değer değişimi gerekmedi; ölü anahtarlara dokunulmadı.

- [x] **3. R3 — Crew OS bölümü içerik & taksonomi teyidi (kodsuz)** → **SONUÇ: TEYİT GEÇTİ (değişiklik yok).**
  - `Bunker.tsx` render'ında bayrak katman adının her yerde **"Crew OS"** göründüğünü teyit et (iç ad "Bunker OS" hiçbir yüzeyde yok). `bunker.label/title/body/points` platform kimliğini doğru anlatıyor mu?
  - `bunker.flows` (4 akış adı) "platformda çalışan gerçek akışlar" çerçevesinde tutarlı mı (Crew OS *tanımı* gibi okunmuyor)? → karar: bırakıldı, teyit yeterli.
  - "Keşfet" linki `/bunker-os`'a gidiyor (route iç ad sızıntısı — public `/crew-os` kararı M6'ya ertelendi, bu fazda dokunulmaz).
  - **Bulgu:** `grep "Bunker OS" messages/ src/` → eşleşme yok; tüm "bunker" kalıntıları namespace/component/route/anchor identifier'ı (kullanıcıya görünmez). Render değerleri "Crew OS"; `bunker.*` içerik tutarlı; flows çerçevesi doğru.

---

## Etkilenen Dosyalar

```
messages/
└── tr.json     # hero.ctaSecondary (21) — yalnız F6, TR değer değişimi — zaten var
```

> **Yalnız F6** kod/içerik değişimi getirir (tek anahtar değeri). **F5 ve R3 doğrulamadır** — beklenen sonuç "değişiklik yok"; tarama bir ihlal bulursa ilgili TR anahtar değeri düzeltilir (kapsam ana sayfa, yalnız TR). Yeni dosya/anahtar yok; `Hero.tsx`/`Bunker.tsx`/`Forum.tsx`/`SectorSolutions.tsx` dokunulmaz.

---

## Dikkat Noktaları

- **F6 saf metin:** `Hero.tsx` dokunulmaz; yalnız `hero.ctaSecondary` TR değeri. Link `#sectors` doğru. Non-TR stale (versiyon-sınırı).
- **F5 yöntemi — cümle-içi, rozet yok:** Dürüstlük çerçevesi cümlenin içinde verilir; ekstra rozet/etiket eklemek clutter → craft ihlali (yasak). Mevcut `proof.note` ana sayfada render edilmiyor (ölü) — şemsiye olarak *koda* dönmez.
- **F5 düşük risk teyidi:** Render edilen `forum.featured.excerpt` "110.000$+" = pazar/sektör çerçevesi ("vaat ediyor"), Kiwi müşteri sonucu değil → muhtemelen dokunulmaz; yine de gözle teyit.
- **R3 değişiklik yok beklenir:** `bunker.*` doğru; `flows` bırakıldı (PRD). Yalnız taksonomi (Crew OS görünür, Bunker OS gizli) + içerik tutarlılığı teyidi.
- **Sahte presence yasağı (niyet-bazlı):** Gerçek canlı gösterge (Alpfit rozeti, `sectors.live`) serbest; uydurma "● online" yasak. Tarama bu ayrımı gözetir.
- **Anahtar kaynağı:** `hero.ctaSecondary`, `bunker.*`, `forum.featured*`, `sectors.*` hepsi **repoda-tanımlı** (`messages/*.json`). Bu fazda **yeni anahtar yaratılmaz**.
- **R1/R2 sonrası süpürme:** Bu task son sırada; R1 (Nasıl Çalışır) ve R2 (gym) yeni TR metinleri de F5 dürüstlük + marka sesi açısından bu süpürmeye dahildir.

---

## Test Kriterleri

- [x] `next build` temiz geçer.
- [x] Ana sayfa (TR `/`) hero ikincil CTA "İşleyen örnekleri gör" (veya teyit edilen final etiket) gösterir ve tıklayınca `#sectors`'a kaydırır. (Prerender `tr.html`'de yeni etiket var; eski "Canlı gör" hiç yok; link hedefi `Hero.tsx:77` `#sectors` dokunulmadı.)
- [x] F5 taraması kayıtlı: ana sayfada render edilen sonuç/sayı-imalı her metin gerçek-veri ya öngörü/örnek çerçevesinde — uydurma müşteri-sonucu render edilmiyor (bulgu listesi + "temiz" sonucu oturum kaydında).
- [x] R3 teyidi kayıtlı: bayrak katman her render yüzeyinde "Crew OS"; iç ad "Bunker OS" görünmüyor; `bunker.*` içerik tutarlı.
- [x] Yeni rozet/etiket eklenmedi (cümle-içi çerçeveleme korundu); ölü anahtarlara (`forum.articles.*`, `proof.*`) dokunulmadı.
- [x] Bir düzeltme yapıldıysa yalnız TR değeri değişti (non-TR stale korundu); F6 dışında diff yok.

---

## Karar Noktaları

- **F6 final etiketi:** "İşleyen örnekleri gör" (önerilen — PRD/discuss) vs "Çözümleri gör" / "Çalışan örnekleri gör". Çıktı-odaklı ve `#sectors` hedefini doğru imleyen önerilen kullanılır; gerekirse kullanıcıya teyit.
- **F5 ihlal bulunursa:** kapsam ana sayfa + yalnız TR + cümle-içi çerçeveleme; daha geniş bir düzeltme (ör. ölü anahtar render'ı) gerekirse v0.1-dışı not olarak DECISIONS/BACKLOG'a yazılır, bu task'te yapılmaz.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (`feat(TASK-1.03): ...` — F6 metin değişimi baskın)
- [x] Bu doküman güncellendi (oturum kaydı + F5/R3 tarama sonuçları)
- [x] DURUM.md + PHASE-1.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-28

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **F6:** `messages/tr.json` → `hero.ctaSecondary` "Canlı gör" → "İşleyen örnekleri gör" (tek TR değer değişimi). `Hero.tsx` dokunulmadı; link hedefi `#sectors` (satır 77) zaten doğru. 5 dilde anahtar mevcut (eksik anahtar yok); en/ar/de/es stale değer korundu (versiyon-sınırı).
- **F5:** Ana sayfada render edilen tüm sonuç/sayı-imalı metin tarandı → uydurma müşteri-sonucu YOK (tablo aşağıda). İhlal bulunmadı → kod değişimi yok. Ölü anahtarlar (`forum.articles.*`, `proof.*`) render edilmiyor, dokunulmadı.
- **R3:** Crew OS bölümü + taksonomi teyidi geçti. `grep "Bunker OS" messages/ src/` → eşleşme yok; render değerleri her yerde "Crew OS"; `bunker.*` içerik + `flows` çerçevesi tutarlı.

**F5 dürüstlük tarama sonucu (render edilen ana sayfa metinleri):**

| Bölüm | Render metin | Değerlendirme |
|-------|--------------|---------------|
| Hero stats | "Şu an canlı / Alpfit", "Crew OS / İşletim katmanı" | Gerçek canlı ürün göstergesi (DECISIONS niyet-bazlı) + kimlik etiketi — temiz |
| Sektörler (6 panel) | `automation`/`body`/`flow` + `note` | Hepsi otomasyonun *nasıl çalıştığını* anlatan yetenek/öngörü dili; uydurma sonuç-metriği yok. `sectors.note` Alpfit'i canlı, diğerlerini "işletmenize göre kuruyoruz" diye dürüst çerçeveliyor — temiz |
| Crew OS panel | `title/body/points`, `flows` (canlı/aktif/sırada) | "Sonuçlar varsayılmaz, ölçülür" = süreç ifadesi; flows "platformda çalışan akışlar" (PRD kararı) — temiz |
| Forum | `featured.excerpt` "110.000$+", `featured2.excerpt` | "110.000$+" = insan SDR'ın yıllık sektör maliyeti ("vaat ediyor"/"derledik" — Kiwi sonucu DEĞİL); ikincisi bilgilendirici — temiz |
| Credibility | "Vaat değil, ölçüm" / "sayılarıyla teslim" | Süreç vaadi (spesifik uydurma metrik değil) — temiz |
| HowItWorks (R1) | `report.body` "sayılarla görürsünüz — kazanç varsayılmaz, ölçülür" | Süreç/ölçüm felsefesi — temiz |

**Sorunlar:**
- Yok.

**Kararlar:**
- F5 = TEMİZ, R3 = TEYİT GEÇTİ: Yeni karar/erteleme üretmedi (ölü anahtar hijyeni zaten research-phase'de v0.1-dışı not edilmiş). → docs/DECISIONS.md'ye eklendi: Hayır (yeni karar yok).
- F6 final etiketi "İşleyen örnekleri gör" (PRD/discuss kararı) doğrudan uygulandı; kullanıcı teyidine gerek olmadı (etiket faz dokümanında kararlı).

**Dosya Değişiklikleri:**
- `messages/tr.json` → `hero.ctaSecondary` değeri güncellendi (F6). Başka kod/içerik diff'i yok.

**Test Sonuçları:**
- `next build` temiz (5 locale prerender, hata/uyarı yok).
- Prerender doğrulaması: `tr.html` "İşleyen örnekleri gör" içeriyor; "Canlı gör" hiçbir prerender çıktısında yok.
- `messages/tr.json` JSON geçerliliği doğrulandı (node JSON.parse).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-28

**Ne Yapıldı:**
- **F6 (tek somut değişiklik):** Hero ikincil CTA TR etiketi "Canlı gör" → "İşleyen örnekleri gör" (çıktı-odaklı, `#sectors` hedefini doğru imler). Component + non-TR değerler dokunulmadı.
- **F5 doğrulama checkpoint:** Ana sayfada render edilen sonuç/sayı-imalı metnin tamamı gerçek-veri ya öngörü/örnek çerçevesinde — uydurma müşteri-sonucu render edilmiyor. İhlal yok → kod değişimi yok.
- **R3 doğrulama checkpoint:** Bayrak katman her render yüzeyinde "Crew OS"; iç ad "Bunker OS" görünmüyor (yalnız namespace/component/route identifier'ı). `bunker.*` içerik tutarlı, flows çerçevesi doğru → değişiklik yok.
- Faz 1'in tüm task'ları (1.01 R1, 1.02 R2, 1.03 R4/F5/R3) tamamlandı → sıradaki adım `/devflow:verify-phase 1`.

---

**Oluşturulma:** 2026-06-28
