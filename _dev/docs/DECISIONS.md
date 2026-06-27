# DECISIONS — Karar Günlüğü

**Amaç:** Önemli mimari ve tasarım kararlarının kaydı. "Neden X yerine Y tercih edildi?" sorusunun cevabı burada.
**Ne zaman güncellenir:** Önemli bir teknik, mimari veya tasarım kararı alındığında.

---

## Kararlar

<!-- Her yeni karar aşağıdaki formatta en üste eklenir (en yeni en üstte) -->

### 2026-06-28 — "● online/canlı" yasağı niyet-bazlı yorumlanır (dürüst canlı gösterge serbest)

**Bağlam:** prd-refine'da bölüm-bölüm kopya analizinde, Hero stat şeridinde (Alpfit "Şu an canlı" + nabız atan yeşil nokta) ve Sektörler gym panelinde ("Canlı — Alpfit" + animate-pulse nokta) **gerçek nabız atan canlı noktaları** bulundu. ILKELER/VIZYON ise pazarlık-dışı yasaklar arasında *"● online/canlı noktası yok"* diyor. Literal okunursa bu dürüst göstergeler de kalkmalı. Gerilim sessizce çözülmedi, kullanıcıya getirildi.

**Seçenekler:**
1. Niyet-bazlı: yasak *sahte presence-tiyatrosu* içindir; Alpfit gerçekten canlı → dürüst gösterge kalır.
2. Literal: hiçbir nabız atan "canlı" noktası kalmaz (statikleştir/kaldır).
3. Orta yol: "canlı" kelimesi/etiketi kalır ama nabız/ping animasyonu kaldırılır.

**Karar:** Seçenek 1 — niyet-bazlı.

**Gerekçe:** Yasağın amacı (brief §0/§9) *sahte canlılık* uydurmak — olmayan bir "şu an aktif" hissi vermek. Alpfit **canlıda gerçekten çalışıyor**; bunu nabızla göstermek dürüstlüktür, tiyatro değil. Bu, F5 dürüstlük konvansiyonuyla (gerçek=gerçek gibi, kurgu=öngörü/örnek) tam uyumlu. Craft (üst eksen) canlılık sinyalinden fayda görür. ILKELER ve VIZYON §4 bu ayrımı taşıyacak şekilde güncellendi.

**İlgili Task/Faz:** prd-refine (v0.1)

---

### 2026-06-27 — Dil senkronu: TR tek kaynak, çeviri versiyon-sınırında

**Bağlam:** Güçlü revize TR-öncelikli ilerleyecek. Her kopya değişikliğini 5 dile (özellikle kalitesi gözle doğrulanamayan Arapça'ya) anında yetiştirmek hem yük hem kalite riski. Kullanıcı "Türkçe'ye odaklanalım, Arapça beni korkutuyor, gerekirse çıkaralım" dedi.

**Seçenekler:**
1. 5 dil kalsın; TR tek kaynak; çeviri her versiyon kapanırken tek seferde.
2. Arapça'yı tamamen çıkar (RTL yükü/QC sorunu gider, ama çalışan altyapı + MENA erişimi feda).
3. Sadece TR+EN aktif, AR/DE/ES dondur.

**Karar:** Seçenek 1.

**Gerekçe:** AR/DE/ES çevirileri zaten yapılmış ve çalışıyor (RTL dahil) — silmek çalışan değeri çöpe atmak (kalıcılık ilkesine ters). Asıl sorun "Arapça'nın varlığı" değil, "sürekli 5× senkron" yükü. Senkron modelini değiştirmek (sürekli → versiyon-sınırı) hem TR-odağı hem craft'ı korur: kopya TR'de durulunca tek seferde çevrilir. Revize sürerken TR-dışı diller geçici eski kopyada kalır (kontrollü tutarsızlık).

**İlgili Task/Faz:** prd (v0.1)

---

### 2026-06-27 — Bayrak katman: public ad "Crew OS", iç ad "Bunker OS"

**Bağlam:** Brief (MASTER_PROMPT v2 §1) bayrak katmana "Bunker OS" derken sitenin tamamı 5 dilde "Crew OS" diyor; ikisi de aynı katmanı tanımlıyor. Bu karışıklık ana sayfadaki içerik hatasının da köküydü.

**Seçenekler:**
1. Public "Crew OS", iç kod adı "Bunker OS" (kullanıcı: "biz Bunker OS kullanıyoruz ama insanlar anlasın diye ismini Crew OS yapıyoruz").
2. Brief'e uyup her yerde "Bunker OS" kullan.

**Karar:** Seçenek 1 — sitede her zaman **Crew OS**; **Bunker OS** kullanıcıya görünmez (yalnızca iç ad).

**Gerekçe:** Site zaten 5 dilde "Crew OS" ile canlı; bu, müşterinin anlaması için bilinçli seçilmiş public ad. Brief bu noktada eski. Bunker OS = aynı şeyin iç kod adı (ayrı geliştirme projesi), iki ürün değil. Alpfit ise tamamen ayrı bir dikey ürün.

**Sonuç (takip):** Brief §1, OVERVIEW ve MODULE-MAP'teki "Bunker OS/Crew OS" ifadeleri ve `/bunker-os` route adlandırması kickoff'ta hizalanacak (PRD/SESSION-NOTES'ta işaretli).

**İlgili Task/Faz:** prd (v0.1)

---

### 2026-06-27 — Güçlü revize, yeni repo yerine v3'te yerinde + branch ile yürütülecek

**Bağlam:** kiwiailab.com'un güçlü revizesine başlanırken, "eski siteye hiç dokunmadan `websitev4` adıyla yeni bir repo açıp orada çalışma" seçeneği değerlendirildi. Canlı siteyi bozmama isteği vardı.

**Seçenekler:**
1. v3'te yerinde, `revize/...` branch'inde çalış — basit, hiçbir şey kaybolmaz, `main` canlı kalır.
2. `websitev4` reposu (v3 kodundan tohumlanmış) — ayrı repo/Vercel projesi, ama bakım/eşitleme yükü.
3. `websitev4` sıfırdan — Living Flow, i18n, tema sistemi yeniden inşa (yüksek maliyet/risk).

**Karar:** Seçenek 1 seçildi (v3'te yerinde, branch ile).

**Gerekçe:** Tespit edilen sorunların tamamı içerik + cila kalemi (mimari arıza değil); v3 sofistike ve sağlam (custom GLSL, 5 dilli i18n, tema sistemi). Sıfırdan yazmak bu değeri çöpe atıp aylarca yeniden inşa demek. `main`'i canlı tutup `revize/...` branch'inde çalışmak "canlıya dokunma" isteğini risksiz karşılıyor.

**İlgili Task/Faz:** map-codebase (DevFlow kurulumu)

---
