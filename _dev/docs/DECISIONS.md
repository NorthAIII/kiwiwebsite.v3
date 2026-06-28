# DECISIONS — Karar Günlüğü

**Amaç:** Önemli mimari ve tasarım kararlarının kaydı. "Neden X yerine Y tercih edildi?" sorusunun cevabı burada.
**Ne zaman güncellenir:** Önemli bir teknik, mimari veya tasarım kararı alındığında.

---

## Kararlar

<!-- Her yeni karar aşağıdaki formatta en üste eklenir (en yeni en üstte) -->

### 2026-06-28 — Performans tabanı `npx lighthouse` ile yerel production build üzerinde ölçülür

**Bağlam:** Faz 2 TD3, ana sayfa Lighthouse bütçesini (≥95 perf / ≥100 a11y / LCP < 2.5s / near-zero CLS) doğrulayıp taban kaydedecek. `package.json` dokunulmaz → ölçüm aracı **bağımlılık eklemeden** seçilmeli. discuss "yerel build'de ölç" demişti; research-phase ortam yoklamasında lighthouse@13.3.0'ın npx cache'te ve `/usr/bin/google-chrome` (149) hazır olduğu, ayrıca Vercel **preview** deploy'ının (main'e dokunmadan) da bir seçenek olduğu görüldü.

**Seçenekler:**
1. Yerel prod build (`next build && next start`) + `npx lighthouse` (npx cache, dep değil) + sistem Chrome; mobil+masaüstü; JSON/HTML artefakt repo'ya.
2. Vercel preview deploy (revize branch push → preview URL, canlı güvende) + PageSpeed/Lighthouse — production'a yakın ağ ama deploy-bağımlı.
3. Chrome DevTools Lighthouse paneli (manuel) — sıfır kurulum ama artefakt yok, tekrarlanamaz.

**Karar:** Seçenek 1 (kullanıcı onayı, 2026-06-28).

**Gerekçe:** `package.json`'a dokunmaz (npx cache → dokunulmaz kuralı korunur), indirme yok (zaten cache'te), kanonik Chrome ile kanonik skor, ve **artefakt arşivlenir** → tekrarlanabilir regresyon tabanı (kalıcılık ilkesi). Localhost ağ-iyimserdir (CDN/latency yok) ama a11y skoru ortamdan bağımsız ve perf mobil preset 4× CPU-throttle uygular → anlamlı "yerel taban". Preview deploy (Seçenek 2) network metrikleri için daha gerçekçi; merge sonrası production teyidi için ileride saklanır, bu fazın self-yeten tabanı için gerekmedi. **Taban evi:** yeni `_dev/docs/perf/` (raporlar) + faz/DURUM özet skorları.

**İlgili Task/Faz:** research-phase (Faz 2 / v0.1 teknik borç)

---

### 2026-06-28 — i18n anahtar-adı değişimi "stale kopya" istisnasının dışındadır (5 dil zorunlu)

**Bağlam:** Faz 1 R1'de "Nasıl Çalışır" 3→4 adıma çıkarken discuss kararı **semantik rename** (anahtarlar `listen/find/automate` → `analyze/design/automate/report`). research-phase'de bileşenin anahtarı *adıyla* okuduğu doğrulandı (`HowItWorks.tsx:15` sabit dizi). Dil stratejisi (2026-06-27 kararı) "TR tek kaynak, çeviri versiyon-sınırında; stale kopya geçici kabul" diyor. Soru: rename de "stale kopya" kapsamında mı (yani non-TR ertelenebilir mi)?

**Seçenekler:**
1. Cerrahi: rename'i 5 dile uygula; eşleşen adımları mevcut çevirilerden stale-kopya taşı; yalnız sıfırdan-yeni adımı ("Çözüm") non-TR'de şimdi çevir.
2. Tam senkron: 4 adımı 5 dilde şimdi düzgün çevir (versiyon-sınırını R1 için esnetir).
3. Katı versiyon-sınırı: rename + yeni slota non-TR'de geçici TR metni (non-TR ana sayfada Türkçe adım görünür).

**Karar:** Seçenek 1 — **Cerrahi.**

**Gerekçe:** Anahtar *adı* değişimi, "aynı anahtar / eski değer = stale kopya" tanımının dışındadır: eski ad silinince o dilde **eksik anahtar = runtime boşluk/hata** doğar (pazarlık-dışı yasak). Dolayısıyla rename mekanik olarak 5 dilin de dokunmasını zorunlu kılar — versiyon-sınırı ertelemesi burada uygulanamaz. Değer tarafında erteleme korunur: eşleşen adımlar stale çeviriyle taşınır, yalnız karşılığı hiç olmayan tek yeni slot ("Çözüm") çevrilir (craft: non-TR flagship'te Türkçe-metin sızıntısı yok). **Genel ilke (çapraz-faz):** gelecekte her i18n anahtar yeniden-adlandırması/yapısal değişimi 5 dili eşzamanlı dokunmayı gerektirir; yalnız *değer* değişimi versiyon-sınırına ertelenebilir.

**İlgili Task/Faz:** research-phase (Faz 1 / v0.1)

---

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
