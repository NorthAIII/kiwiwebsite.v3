# Kiwi AI Lab Website — Ürün Vizyonu (PRD)

**Versiyon bağlamı:** kiwiailab.com güçlü revize · v0.1 başlangıcı
**Bu doküman:** PRD'nin merkezi vizyon dosyası — projenin *ne* olduğu, *kime* hizmet ettiği, ürün taksonomisi, mesaj stratejisi ve dil yaklaşımı. Self-contained; karar kaynağı budur. (Statik proje kimliği özeti `_dev/OVERVIEW.md`'de; yön/öncelik `_dev/ILKELER.md`'de.)

---

## 1. Vizyon & Problem

Kiwi AI Lab bir **AI otomasyon ajansı**. Bir işi analiz eder, tekrarlayan işin zamanı/parayı nerede sızdırdığını bulur ve otomasyona bağlar (rutin görevler, SMS/WhatsApp mesajları, onay zincirleri). Sektöre hazır ürünler, 7/24 asistanlar, kurucuyla birebir.

Site, bu teklifi **şablon kokusu olmadan**, çıktı-odaklı ve kendinden emin bir dille; immersive ama performanslı bir deneyimle (imza: **The Living Flow** WebGL alanı) anlatır. Hedef: ziyaretçiyi **ücretsiz keşif görüşmesine** ve canlı chatbot'a yönlendirmek.

**Problem (revizenin var oluş sebebi):** Site mimari olarak sağlam ama **içerik + cila** zayıf — kopya jenerik, bazı bölümler sığ/tekrarlı ve bayrak ürün (Crew OS) bölümü yanlış içerik taşıyor. Güçlü revize bu boşluğu kapatır; mimariyi yeniden yazmaz, üstüne inşa eder.

---

## 2. Hedef Kullanıcı

Tekrarlayan operasyonel işi otomatikleştirmek isteyen **işletmeler ve karar vericileri**: spor salonu, klinik, e-ticaret, emlak, eğitim & danışmanlık, restoran & kafe. Türkiye-öncelikli; çok dilli erişim (bkz. §5).

Ziyaretçinin zihinsel durumu: "Bu ajans şablon mu, gerçek mi? Bana somut ne kazandırır?" — Site bu soruyu **kanıt + çıktı diliyle** (varsayım değil, ölçülen sonuç) cevaplamalı.

---

## 3. Ürün Taksonomisi (kritik — netleştirildi)

Bu taksonomi revizenin en kritik içerik hatasının köküdür; net tutulması zorunludur.

| Ad | Nedir | Sitede görünür mü? |
|----|-------|---------------------|
| **Crew OS** | Bayrak katman. Müşterinin tüm otomasyonlarının çalıştığı, Kiwi'nin kurup işlettiği tek operasyon katmanı. Müşteri bir panelde *neyin çalıştığını, ne kazandırdığını, sıradakini* görür; 7/24 açık, gözlemlenebilir, ölçülebilir. | **Evet** — sitenin her yerinde kullanılan public marka adı. |
| **Bunker OS** | Crew OS'un **iç kod adı** (ekibin kendi arasında kullandığı, ayrı bir geliştirme projesi). Crew OS ile **aynı şeydir** — iki ürün değil. | **Hayır** — kullanıcıya/site'a asla görünmez. |
| **Alpfit** | **Ayrı, bağımsız dikey ürün** (spor salonu yazılımı). Crew OS'un parçası veya üstünde koşan bir şey **değildir**. Kendi sayfası var (`/spor-salonu-yazilimi`). | **Evet** — kendi başına bir ürün showcase'i olarak. |

**Bundan çıkan içerik kuralları:**
- Sitede bayrak katman **her zaman "Crew OS"** olarak anılır; "Bunker OS" adı hiçbir yüzeyde geçmez (brief §1 "Bunker OS" der — brief eski; PRD geçerli).
- Ana sayfadaki **Crew OS bölümü platformun kendisini** anlatır (ne olduğu + gözlemlenebilir/ölçülebilir/hep-açık kanıtı) — bir sektörün örneklerini değil. Sektör örnekleri **Sektörler bölümüne** aittir.
- Alpfit, Crew OS ile karıştırılmaz; spor-salonu örnekleri Crew OS'u tanımlamaz.

> **Çözüldü (v0.3, Faz 11):** Crew OS sayfasının public URL'i artık `/crew-os` (i18n içerik namespace `bunker`→`crew` 5-dil eşzamanlı rename + eski `/bunker-os` kalıcı 308 redirect + sitemap/canonical/alternates). İç ad URL'de sızmıyor; yalnız kod-seviyesi tanımlayıcılar (nav id, dosya adı) taksonomi gereği iç-ad kalabilir. (Karar → `docs/DECISIONS.md`.)

---

## 4. Mesaj Stratejisi & Marka Sesi

**Ses:** çıktı-odaklı, sade, kendinden emin, metafor yok. Her cümle bir kazanç/sonuç ima eder; süslemeden, abartıdan, jenerik SaaS dilinden kaçınır.

**Pazarlık dışı yasaklar** (ILKELER → Pazarlık Konusu Olmayanlar, brief §0/§9):
- Doktor / teşhis / hekim / reçete metaforu **yok**.
- **Sahte "● online / canlı" presence-tiyatrosu yok.** (Niyet-bazlı yorum: yasak *sahte canlılık* içindir; Alpfit gibi **gerçekten canlı** bir ürün için dürüst canlı gösterge bu yasağın dışındadır — prd-refine 2026-06-28, `docs/DECISIONS.md`.)
- Zayıf adım adı ("Dinle / Listen") **yok**.
- Lorem hissi veren dolgu metin **yok**; her metin gerçek içerik taşır.

**Dürüstlük konvansiyonu (somut ama uydurma değil):** Sayısal/sonuç iması taşıyan her metin (sektör sonuçları, forum vaka başlıkları, panel metrikleri) **ya gerçek-veriye dayanır ya da "öngörü/örnek/temsili" çerçevesinde** okunur — "kesin gibi ama kurgusal" arası yasaktır. Somutluk korunur, dürüstlük bozulmaz. (Gerçek müşteri verisi gelene dek; uygulama → `PRD/features/kopya-revizesi.md` F5.)

**Sabit kalan çapa kopyalar** (revize bunları korur/güçlendirir, bozmaz):
- Hero: *"İşinizi analiz ederiz. Sonra otomatikleştiririz."*
- Birincil CTA: *"Ücretsiz keşif görüşmesi al."*

**Revizenin mesaj görevi:** Tüm görünür TR metnini bu sese taşımak — jenerik/sığ ifadeleri somut, çıktı-odaklı, sektöre özgü ifadelerle değiştirmek. (Bölüm-bölüm "neden zayıf" analizi prd-refine'da derinleşecek — bkz. SESSION-NOTES.)

---

## 5. Dil Stratejisi

- **Diller:** `tr` (varsayılan), `en`, `ar` (RTL), `de`, `es` — **5 dil de korunur.** (Arapça dahil; çalışan RTL altyapısı değerlidir, çıkarılmaz.)
- **TR tek kaynaktır.** Revize içeriği önce Türkçe'de mükemmelleştirilir.
- **Çeviri versiyon-sınırında, tek seferde.** Kopya değişirken sürekli 5× çeviri yapılmaz; bir versiyonun içeriği durulduğunda EN/AR/DE/ES'e tek seferde çevrilir. Revize sürerken TR-dışı diller geçici olarak eski kopyada kalabilir — bu **kontrollü, kabul edilmiş** bir tutarsızlıktır.
- Yani "5 dil senkron" = **sürekli senkron değil, versiyon-sınırında senkron.** (Karar gerekçesi: `docs/DECISIONS.md`.)

---

## 6. Kapsam

**Dahil (revize):** Tanıtım/pazarlama sitesinin içerik + cila + yapı + teknik revizesi — kopya, sektör derinliği, Crew OS bölümü, "Nasıl çalışır" yapısı, görsel cila, performans/test, analytics.

**Dahil değil:**
- Backend otomasyon ürününün kendisi (Crew OS / Bunker OS motoru) — ayrı repo.
- Forum/bülten için gerçek backend (şu an statik içerik), ödeme, kullanıcı hesapları.
- Gerçek müşteri metrikleri/vaka verileri (gelene dek "öngörü/örnek" işaretli kalır).

---

**Son Güncelleme:** 2026-07-05 — prd-review (v0.3): §3 "Açık konu (M6)" kapatıldı — Crew OS public URL'i v0.3 Faz 11'de `/crew-os`'a taşındı (namespace `bunker`→`crew` 5-dil rename + kalıcı redirect). Vizyon/taksonomi değişmedi.
