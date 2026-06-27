# TASK-1.03: Ana Sayfa Ses & Dürüstlük — F6 Hero CTA + F5/R3 Doğrulama Checkpoint

**Durum:** ⬜ Bekliyor
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

- [ ] **1. F6 — Hero ikincil CTA etiketini güncelle**
  - Dosya: `messages/tr.json` → `hero.ctaSecondary` (satır 21)
  - Mevcut: "Canlı gör" (belirsiz — aslında `#sectors`'a kaydırıyor).
  - Yeni: "İşleyen örnekleri gör" (çıktı-odaklı, marka sesine yakın). Sabit çapalar korunur: hero başlığı ("İşinizi analiz ederiz. Sonra otomatikleştiririz."), birincil CTA ("Ücretsiz keşif görüşmesi al").
  - Link hedefi `#sectors` (`Hero.tsx:77`) zaten doğru → **component dokunulmaz**; non-TR stale kabul (aynı anahtar, değişen değer).

- [ ] **2. F5 — Ana sayfa dürüstlük taraması (kodsuz teyit)**
  - Ana sayfada **render edilen** sonuç/sayı-imalı metni tara: `Hero` (stats şeridi), `SectorSolutions` (her panel `automation`/`body`/`flow` + `note`), `Bunker` (panel metrikleri yoksa `points`), `Forum` (`featured.excerpt`, `featured2.excerpt`).
  - Her birinin ya **gerçek-veriye dayandığını** ya **öngörü/örnek** çerçevesinde okunduğunu teyit et. Uydurma müşteri-sonucu (örn. "no-show'u yarıya düşürdük" tarzı) ana sayfada render EDİLMEMELİ.
  - Cümle-içi çerçeveleme yöntemi (ayrı rozet/etiket EKLENMEZ — clutter yok, craft). Bir ihlal bulunursa cümle içinde öngörü/örneğe çevir (yalnız TR).
  - **Ölü anahtarlara dokunma** (`forum.articles.*`, `proof.*` render edilmiyor) — v0.1-dışı hijyen; bulgu DECISIONS'a not edilebilir.

- [ ] **3. R3 — Crew OS bölümü içerik & taksonomi teyidi (kodsuz)**
  - `Bunker.tsx` render'ında bayrak katman adının her yerde **"Crew OS"** göründüğünü teyit et (iç ad "Bunker OS" hiçbir yüzeyde yok). `bunker.label/title/body/points` platform kimliğini doğru anlatıyor mu?
  - `bunker.flows` (4 akış adı) "platformda çalışan gerçek akışlar" çerçevesinde tutarlı mı (Crew OS *tanımı* gibi okunmuyor)? → karar: bırakıldı, teyit yeterli.
  - "Keşfet" linki `/bunker-os`'a gidiyor (route iç ad sızıntısı — public `/crew-os` kararı M6'ya ertelendi, bu fazda dokunulmaz).

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

- [ ] `next build` temiz geçer.
- [ ] Ana sayfa (TR `/`) hero ikincil CTA "İşleyen örnekleri gör" (veya teyit edilen final etiket) gösterir ve tıklayınca `#sectors`'a kaydırır.
- [ ] F5 taraması kayıtlı: ana sayfada render edilen sonuç/sayı-imalı her metin gerçek-veri ya öngörü/örnek çerçevesinde — uydurma müşteri-sonucu render edilmiyor (bulgu listesi + "temiz/düzeltildi" sonucu oturum kaydında).
- [ ] R3 teyidi kayıtlı: bayrak katman her render yüzeyinde "Crew OS"; iç ad "Bunker OS" görünmüyor; `bunker.*` içerik tutarlı.
- [ ] Yeni rozet/etiket eklenmedi (cümle-içi çerçeveleme korundu); ölü anahtarlara (`forum.articles.*`, `proof.*`) dokunulmadı.
- [ ] Bir düzeltme yapıldıysa yalnız TR değeri değişti (non-TR stale korundu); değişiklik yoksa F6 dışında diff yok.

---

## Karar Noktaları

- **F6 final etiketi:** "İşleyen örnekleri gör" (önerilen — PRD/discuss) vs "Çözümleri gör" / "Çalışan örnekleri gör". Çıktı-odaklı ve `#sectors` hedefini doğru imleyen önerilen kullanılır; gerekirse kullanıcıya teyit.
- **F5 ihlal bulunursa:** kapsam ana sayfa + yalnız TR + cümle-içi çerçeveleme; daha geniş bir düzeltme (ör. ölü anahtar render'ı) gerekirse v0.1-dışı not olarak DECISIONS/BACKLOG'a yazılır, bu task'te yapılmaz.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`feat(TASK-1.03): ...` — F6 metin değişimi baskın; salt teyitse `docs(TASK-1.03): ...`)
- [ ] Bu doküman güncellendi (oturum kaydı + F5/R3 tarama sonuçları)
- [ ] DURUM.md + PHASE-1.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** 🔄 Devam edecek

**Yapılanlar:**
- [doldurulacak — F5 tarama bulguları + R3 teyit sonucu buraya]

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
- [doldurulacak]

---

**Oluşturulma:** 2026-06-28
