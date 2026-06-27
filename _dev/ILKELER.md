# Kiwi Website v3 — Proje İlkeleri

---

## Bu Doküman Hakkında

**ILKELER.md** bu projenin yön-veren ilkelerini tutar — "kararsız kaldığında neye göre karar ver, neyi feda etme, bu projenin ufku ne?" Nadiren ve **bilinçli** değişir; karar-şekillendiren fazlarda (prd, prd-refine, prd-review, kickoff, discuss, research, plan) okunur ve önerileri yönlendirir. (kickoff bu dosyayı yalnızca varsa okur — PRD'siz akışta dosya kickoff-docs'ta doğar.)

**Nasıl kullanılır:** Q&A fazlarında Claude gri alan sorularını boş sormak yerine, ilgili ilkeye göre cevabı önceden doldurur ve kullanıcıya **teyit ettirir**. Bir ilkeyle gerçek bir gerilim doğarsa (ilke X diyor ama bu durum Y gerektiriyor) açıkça kullanıcıya getirir — sessizce bir tarafı seçmez.

### Bilginin Doğru Evi — bu doküman NE tutmaz

ILKELER yalnızca **yön ve önceliği** taşır, mekanizmayı/detayı değil. Tekrar = drift kaynağı.

- Değerlendirme ekseni / "şunu iyi yaptık mı?" kontrolü → `QUALITY.md`
- Somut teknik kural (framework versiyonu, lint kuralı, isimlendirme) → `CLAUDE.md` Projeye Özgü Kurallar
- Ürün vizyonu, feature, davranış kuralı → `_dev/PRD/`
- Spesifik mimari/tasarım kararı → `docs/DECISIONS.md`

Örnek: "Sırlar koda gömülmez, merkezi model" **ilkesi** burada yaşar; "şu vault'u, şu env-isim kuralını kullan" gibi somut mekanizma `CLAUDE.md` / `DECISIONS.md`'de.

---

## Temel İlkeler

Aşağıdakiler makul varsayılanlardır — projeye uymayanı çıkar, projeye özgü olanı ekle.

### Kalıcılık önceliği

En kalıcı ve ileriye dönük çözümü seç. Kısa vadeli hız uğruna uzun vadeli sağlamlığı feda etme; "şimdilik çalışıyor" bir bitiş kriteri değildir. İki yol arasında kararsızken daha sağlam olana eğil.

### Sır ve konfigürasyon yönetimi

Secret'lar ve ortama bağlı değerler koda gömülmez. Merkezi, değişken-tabanlı bir model kullanılır: aynı kod her ortamda farklı değerlerle çalışır. (Bu projede: `ANTHROPIC_API_KEY` vb. `.env`/Vercel env'de.)

### Kümülatif test altyapısı

Test atlanmaz. Test altyapısı her geliştirmeyle üstüne koyarak büyür — her yeni yetenek kendi güvencesini de getirir. Geriye dönük güven zamanla artmalı, azalmamalı. (Not: bu projede şu an test altyapısı **yok**; ilk kurulum bir teknik faz adayıdır.)

---

## Bu Projeye Özgü

Kickoff/PRD sırasında doldurulur. Boş bir alan "henüz konuşulmadı" demektir — varsayma, gerektiğinde kullanıcıya sor.

### Proje Ufku

**Uzun ömürlü amiral vitrin.** Bu site ajansın imza/amiral vitrinidir — kararlar yıllar ölçeğinde sağlamlığa göre alınır, kampanyalık/tek-kullanımlık değil. "Şimdilik çalışıyor" bir bitiş kriteri değildir; Awwwards SOTD çıtası kalıcı tutulur. İki yol arasında kararsızken daha kalıcı/sağlam olana eğil (mevcut sofistike altyapıyı — custom GLSL, 5 dilli i18n, tema sistemi — çöpe atmadan üstüne inşa et).

### En Yüksek Öncelikli Eksenler

Çatışmada öne geçen sıralama (eksen tanımları → QUALITY.md):

1. **Marka & Craft (imza)** — *tek ve net üst eksen.* Craft başka herhangi bir eksenle çatışınca craft kazanır. (QUALITY §1)
2. **Performans & Erişilebilirlik** — üst eksen değil ama **korunması gereken taban**: brief hedefleri (Lighthouse ≥95 perf / ≥100 a11y / LCP < 2.5s) her revize sonrası korunur — regresyona izin yok. (QUALITY §2, §3)
3. **Yerelleştirme & RTL** — kalite ekseni geçerli ama **sürekli senkron değil**: TR tek kaynak, çeviri versiyon-sınırında yapılır (bkz. `docs/DECISIONS.md` — dil stratejisi). (QUALITY §4)

### Pazarlık Konusu Olmayanlar

- **Zero template smell / Awwwards çıtası** — şablon/page-builder hissi, generic SaaS özellik-kartı ızgarası, stok robot/AI klipart, cheapness asla girmez. Bu, feda edilmeyecek tek kırmızı çizgidir: gerekirse **kapsam daralır** ama bu çıta düşmez.
- **Marka sesi yasakları** (craft'ın dil tarafı, brief §0/§9) — doktor/teşhis/hekim/reçete metaforu yok, **sahte "● online/canlı" presence-tiyatrosu yok**, zayıf adım adı ("Dinle/Listen") yok, lorem hissi veren dolgu metin yok.

> **"● online/canlı" yasağının kapsamı (niyet-bazlı, prd-refine 2026-06-28):** Yasak *sahte canlılık tiyatrosu* içindir — gerçekte olmayan bir "şu an aktif" hissi uydurmak. **Gerçekten canlı** bir ürünün (örn. Alpfit, canlıda) dürüst canlı göstergesi bu yasağın **dışındadır**; o, dürüstlük konvansiyonuyla (gerçek = gerçek gibi, kurgu = öngörü/örnek) uyumludur. Gerekçe → `docs/DECISIONS.md`.

> Not: Perf/a11y bütçesi "pazarlık dışı" değil ama "korunması gereken taban"dır (yukarıda, Öncelikli Eksenler). Fark: pazarlık-dışı = asla; taban = regresyon yapılmaz ama üst eksen craft'ın gerisindedir.

---

**Son Güncelleme:** 2026-06-28 — prd-refine: "● online/canlı" yasağına niyet-bazlı kapsam notu eklendi (sahte presence yasak; dürüst canlı ürün göstergesi serbest).
