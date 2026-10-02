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
