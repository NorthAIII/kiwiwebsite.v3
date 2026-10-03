# NOTES — PRD Çalışma Notları (Log)

> Geliştirme sırasında ortaya çıkan fikir / analiz / karar notlarının **append-only log'u**. Her not en alta eklenir, mevcut notlar tüketilmez. **Konsolidasyon versiyon sonu `prd-review`'da** yapılır (not orada ilgili PRD dokümanına/DECISIONS'a mezun edilir, sonra buradan silinir).

---

(Chatbot Groq/llama sağlayıcı notu prd-review 2026-07-21'de `docs/DECISIONS.md` + `PRD/VERSIONS.md`'ye mezun edildi.)

---
### Ana sayfa ilk-ekran anlaşılırlığı — "giren kim olduğumuzu anlamadan çıkıyor"
**Tarih:** 2026-10-02
**Bağlam:** Faz 18 (v0.5 chatbot) verify'ı kapandıktan sonra kullanıcı asıl revize gerekçesini yeniden dile getirdi: siteye giren ziyaretçi kim olduğumuzu ve ne yaptığımızı neredeyse hiç anlamadan çıkıp gidiyor. Bu, v0.1'den beri koşulan 18 fazın **hiç ölçmediği** bir eksen: UAT senaryoları craft/a11y/i18n/güvenlik/perf eksenlerinde yoğunlaştı, "ziyaretçi ilk ekranda ne anlıyor" diye bir kriter hiç yazılmadı.

**Tartışma:** Ana sayfa ziyaretçi sırasıyla okundu (`messages/tr.json` + `[locale]/page.tsx` bölüm sırası: Hero → HowItWorks → SectorSolutions → Bunker → Forum → Chatbot → Credibility).

Bulgu: sorun **içerik yokluğu değil, sıralama ve ilk-ekran yoğunluğu**.
- En güçlü malzeme Sektörler bölümündeki akışlar ("Bir üye 30 gündür giriş yapmadı → kişisel teklif + PT randevusu WhatsApp'tan gider → dönüş tahmin edilmez, takip edilir"). Bu tam "ne yapıyoruz" cevabı: somut, ayırt edici, anlaşılır. Ama 2.–3. scroll'da duruyor.
- İlk ekran (`hero.lineOne/lineTwo/sub` + `hero.eyebrow`) dört şeyi taşımıyor: (1) **kimlik** — ne tür şirket olduğumuz söylenmiyor, ajans mı yazılım şirketi mi belirsiz; eyebrow "Ölçülebilir AI otomasyonu" kategori adı, kimlik değil. (2) **hedef kitle** — hangi işletmeler olduğu aşağıdaki bölümde, ziyaretçi ilk ekranda kendini görmüyor. (3) **tek somut örnek** — "rutin görevler, mesajlar, onay zincirleri" kategori; sitede zaten var olan bir akış cümlesi bunların hepsinden güçlü. (4) **ayırt edicilik** — iki çapa cümlesini her AI otomasyon ajansı söyleyebilir, dolayısıyla aşağı inmek için sebep üretmiyor. Sebebi veren malzeme aşağıda bekliyor.
- İkinci eksen **hiyerarşi**: ajans hizmeti + Crew OS + Alpfit aynı anda sunuluyor, `hero.stats` şeridinde Alpfit ile Crew OS yan yana ve ilişkileri açıklanmadan. Taksonomi `VIZYON.md` §3'te net ama ziyaretçiye anlatılmıyor.

**Çelişki (bilinçle kayda geçiyor):** `VIZYON.md` §4 hero kopyasını **"sabit kalan çapa"** ilan etmiş ("revize bunları korur/güçlendirir, bozmaz"). Kullanıcının gözlemi tam o çapayı sorguluyor → bu bir cila kalemi değil, **PRD-seviyesi karar**. Kullanıcı 2026-10-02'de "emin değilim, birlikte karar verelim" dedi: alternatif hero kopyaları `prd-refine` oturumunda yan yana yazılıp karşılaştırılacak, çapa kararı orada bilinçle teyit ya da geri alınacak.

**Ölçüm imkânı:** Umami canlıda yüklü ve veri topluyor (`umami.kiwiailab.com`, script canlı HTML'de teyitli). Pageview-only kurulduğu için scroll derinliği **yok**, ama ziyaret süresi ve tek-sayfada-ayrılma oranı var → "ilk ekranda mı kaybediyoruz" sorusu tahminden ölçüme çevrilebilir. MODULE-MAP'te E1 hâlâ 🟡 (canlı gözle-doğrulama kalemi) — bu iş o kalemi de kapatma fırsatı.

**Sonuç:** **Sonraki versiyonun (v0.6 adayı) ana konusu: ana sayfa mesaj netliği / ilk-ekran anlaşılırlığı.** Sıra kullanıcı kararıyla belirlendi (2026-10-02): **önce Faz 18 kapanır** (TASK-18.12 + 18.13), sonra bu konuya temiz zeminde girilir — faz ortasında yeni konu açılmaz. Girilecek kapı `prd-refine` (versiyon tanımı + hero çapası kararı + alternatif kopya karşılaştırması). Mevcut v0.6 adayı booking/takvim bu konuyla **önceliği yarışır** — sıralama prd-refine'da damgalanır.
---
### Kalıcı yetki dokümanlarında kalan bayatlık — brief'in yetkisi yeniden değerlendirilmeli
**Tarih:** 2026-10-02
**Bağlam:** TASK-18.13 (UAT 39), ürün ağacındaki bayat Anthropic referanslarını kapattı. `MASTER_PROMPT_v2.md` §6/§7'de yalnız sağlayıcı satırları hizalandı, çünkü task'ın sınırı buydu. Task dokümanı geri kalanın "ayrı bir kalem olarak kayda geçtiğini" söylüyordu, ama DURUM/PRD/PHASES'te böyle bir kayıt yoktu. Bu not o kaydı açar.

**Açık kalanlar:**
- **Brief'in geri kalanı v0.1'den beri gerçeklikten kopuk.** Örnekler: §5 «Nasıl çalışır (3 adım)» (v0.1'de 4 adım oldu), «Bunker OS sayfası (`/bunker-os`)» (v0.3'te `/crew-os` oldu), `/forum/...` (şimdi `/bulten/...`), §2 «AR/DE/ES EN'i aynalıyor».
- **Brief'in yetkisi.** `OVERVIEW.md:12` brief için "çelişkide v2 geçerli" diyor. Pratikte karar kaynağı artık `PRD/VIZYON.md` + `docs/DECISIONS.md` (VIZYON §3 bunu taksonomi için zaten söylüyor: "brief eski; PRD geçerli"). Seçenekler: (a) brief tarihsel ilan edilir ve OVERVIEW cümlesi düzeltilir, (b) brief baştan hizalanır. OVERVIEW Korumalı → kullanıcı kararı gerekir.
- **`ILKELER.md:34`** sır ilkesinin örneğinde hâlâ `ANTHROPIC_API_KEY` yazıyor (ilke doğru, örnek bayat). ILKELER Korumalı ve doğal güncelleme noktası prd/prd-refine/prd-review olduğu için TASK-18.13'te dokunulmadı.
- **Kardeş yüzeyler.** `README.md:5` hâlâ v1'e (`MASTER_PROMPT.md`) bağlanıyor ve "Phase 1" diyor (TASK-18.05 bunu kapsam-dışı bırakmıştı). v1'in §6.7'si Claude'u tarif ediyor; v1 tarihsel olduğu için bu beklenen bir durum.

**Sonuç:** Konu prd-review'a (ya da daha önce açılırsa prd-refine'a) aittir. Tek kararla kapanabilir: brief'in yetkisi belirlenir, sonra OVERVIEW cümlesi + ILKELER örneği + README bağlantısı o karara göre hizalanır.
---
### Ana sayfa mesajı — yön kararları (ilk-ekran notunun devamı)
**Tarih:** 2026-10-03
**Bağlam:** prd-refine açıldı ama v0.5 aktif olduğu için ertelendi. Ardından kullanıcıyla serbest tartışmada revizenin rotası yeniden değerlendirildi.

**Kararlar (kullanıcı onaylı):**
- **2026-06-27 "v3'te yerinde" kararı korunur.** Altyapı (Living Flow, 5 dil, tema, chatbot) sağlam; sıfırdan başlanmaz.
- **2026-06-28 "cerrahi kopya" reframe'i geri alınır.** REVIZE-BACKLOG A2'deki ilk tespit ("ciddi yeniden yazım gerek") haklı çıktı. Ana sayfa mesajı ve akışı gerçekten baştan yazılır. VIZYON §4'teki hero "sabit çapa" statüsü düşer.
- **Hedef:** ziyaretçi ilk ekranda 8 saniye içinde kim olduğumuzu, kime hitap ettiğimizi ve ne yaptığımızı anlamalı.
- **"AI / yapay zekâ" kelimesi mesajda kullanılmaz.** Yalnız marka adında (Kiwi AI Lab) kalır.
- **Süreç:** (1) TR + global rakiplerin ilk ekran taraması → (2) 3 mesaj yönü (metin) → (3) seçilen 2-3 yönle ilk-ekran mockup'ları → (4) mevcut sitede uygulama. Keşif adımları hafif yürür, ağır faz ritüeli yok.
- **Çalışma yönü:** Yön A (düz/net kimlik + kitle) ile yön B'nin (sektöre göre somut örnek) birleşimi; rakip taraması sonrası teyit edilir.

**Sonuç:** VIZYON §4 ve versiyon damgası prd-review / prd-refine'da bu kararlara göre güncellenir. Faz 19'un kalan iki task'ı (19.07, 19.06) beklemede kalabilir; keşif koda dokunmuyor.
---
### Ana sayfa mesajı — kullanıcı fikirleri (Crew OS adı + tanışma kanıtı)
**Tarih:** 2026-10-03
**Bağlam:** Rakip taraması ve 3 mesaj yönü sunulduktan sonra kullanıcı iki fikir getirdi.

- **Crew OS / Alpfit ayrımı korunur** (VIZYON §3 ile uyumlu).
- **Ad fikri: "Ekip OS".** Kullanıcı Crew OS yerine Türkçe bir ad düşünüyor ("belki"). Açık soru: site 5 dilli ve public ad v0.3'te `/crew-os` olarak yerleşti (redirect, sitemap, namespace). Türkçe ad yalnız TR'de mi kullanılır, her dilde mi, yoksa Crew OS mu kalır? Mesaj revizesi netleşince karar verilir; şimdilik mockup'larda "Crew OS" kullanılır.
- **Tanışma kanıtı fikri.** Crew OS bölümüne şu tür bir satır: "Bizimle nasıl tanıştınız? Size e-postayı otomasyonumuz gönderdi." Ajansın kendi işini kendi sistemiyle yürüttüğünün canlı kanıtı. Dürüstlük şartı: satır yalnız gerçekten o kanaldan gelen ziyaretçiye gösterilmeli (örn. e-posta linkindeki bir parametreyle). Herkese gösterilirse sahte iddia olur. Ticari e-posta mevzuatı (İYS, tacir/esnaf istisnası) ayrıca teyit edilmeli.
---
### Ana sayfa mesajı — yön seçildi
**Tarih:** 2026-10-03
**Bağlam:** 3 ilk-ekran mockup'ı (A net tanım · B tek sahne · C uçtan uca akış) Design tuvalinde yan yana sunuldu (claude.ai artifact, sahibine özel).

**Karar (kullanıcı):** **Yön B — Tek sahne.** Başlık: "Siz müşterinizle ilgilenirken, WhatsApp'ta bekleyen diğeri kaybolmasın." Alt metin: "Cevap, randevu, hatırlatma, takip: işletmenize biz kurarız, kendiliğinden çalışır." Altında sektör seçicili sahne kartı (spor salonu · klinik · e-ticaret · emlak): sahne cümlesi + Ne olur / Sistem / Sonuç. Spor salonu kartı "Alpfit'te şu an canlı" etiketini taşır, diğerleri dürüstçe "Örnek akış". Eyebrow "Kiwi AI Lab · İşletmeler için otomasyon".

**Sıra (kullanıcı):** Önce Faz 19'un kalan iki task'ı (19.07 → 19.06) bitirilir. Ardından v0.5 kapanışı yapılır ve sonraki versiyon "ana sayfa mesajı" olarak tanımlanır. Kapsam adayları: yeni hero + sahne kartı + ana sayfa bölüm sırası (sektörler yukarı) + opsiyonel Crew OS tanışma kanıtı. Önce TR; diğer 4 dile anahtarlar eklenir.
---
