# REVIZE BACKLOG — Bilinen Sorunlar & Bekleyen İşler

**Amaç:** Güçlü revize için ham girdi — kullanıcı tespitleri ve brief'ten gelen bekleyen işler. Bu liste **PRD'ye tohum**dur; fazlara/feature'lara dönüşümü `/devflow:prd` ve `discuss-phase`'de yapılır. Burası kararların evi değil (o `DECISIONS.md`), aktif durumun evi de değil (o `DURUM.md`); burası "neyi ele alacağız" ham listesidir.

**Not:** Henüz hiçbiri faza/feature'a bağlanmadı. Bağlandıkça ilgili satır PRD/MODULE-MAP'e taşınır ve burada işaretlenir/silinir.

---

## A. Kullanıcı Tespitleri (2026-06-27)

| # | Konu | Detay | Tahmini modül |
|---|------|-------|----------------|
| A1 | Logo hizalama | Logo sol-en-üstte düzgün oturmamış (konumlama/hizalama). | M3 (Nav/PageHeader) |
| A2 | Kopya/wording zayıf | Genel metin kalitesi düşük — ciddi yeniden yazım gerek (TR öncelikli, 5 dil senkron). | M2 + M4 |
| A3 | CTA kartı affordance + ölçekleme | "Ücretsiz keşif görüşmesi" altındaki Alpfit / Crew OS kartları tıklanabilir görünmüyor; sağdaki scroll/"kaydır" göstergesinde ölçekleme bozuk. | M2 (Hero/istatistik şeridi) + M3 |
| A4 | "Nasıl çalışır" 3→4 adım | Analiz ile Tespit içerikçe örtüşüyor (aynı şey gibi). 4 ayrı kaleme çıkar (ör. **Analiz · Çözüm · Otomasyon · Raporlama**); altlarındaki ~15 kelimelik açıklamaları zenginleştir. | M2 (HowItWorks) + M4 |
| A5 | Sektörler çok sığ | Spor Salonları'nda siyah zemine 3 madde; tekrara düşüyor ve yetersiz. Her sektör için doyurucu, özgün içerik gerek. | M2 (SectorSolutions) + M4 |
| A6 | Crew OS bölümü yanlış içerik | Bunker (Crew OS) bölümünde siyah zemindeki 4 madde **Bunker OS ile alakasız** — Alpfit özellikleri yazılmış. Doğru Crew OS içeriğiyle değiştir. | M2 (Bunker) + M4 |

## B. Açık Tasarım Soruları (karar bekliyor)

| # | Soru | Notlar |
|---|------|--------|
| B1 | Living Flow yeşil nabızlarının kapsamı | Ana sayfada aşağı kayan yeşil nabızlar beğenildi. Sayfanın daha aşağısına da taşınsın mı? Göz yorgunluğu/okunabilirlik riski değerlendirilmeli (yoğunluk/opaklık ayarı, scrim, reduced-motion). |

## C. MASTER_PROMPT v2 §8 — Bekleyen İşler

| # | Konu | Durum |
|---|------|-------|
| C1 | Sosyal medya gerçek profil linkleri (Instagram/X/LinkedIn) | Şu an `#` placeholder — gerçek linkler bekleniyor. |
| C2 | Weekend demo ("no 36") | Kullanıcı veri verince ilgili yere konacak. |
| C3 | AR/DE/ES gerçek çevirileri | ✅ Tamamlandı (son commit'ler) — doğrulanması faydalı. |
| C4 | Gerçek metrikler / vaka verileri | Sektör + vaka metrikleri "öngörü/örnek" placeholder — gerçek müşteri verisi bekleniyor. |
| C5 | Foruma ikinci+ içerikler / gerçek backend | Şu an statik; istenirse backend. |
| C6 | Bunker OS üretilmiş görseller (fal.ai/Gemini) | Şu an stilize SVG/kod görseller. |
| C7 | Chatbot'u "book a call" formuna/akışına bağlama | Henüz bağlı değil. |

## D. Teknik

| # | Konu | Notlar |
|---|------|--------|
| D1 | Test altyapısı yok | Projede hiç test yok; kümülatif test ilkesi (ILKELER) için sıfırdan kurulum gerek. |
| D2 | Performans bütçesi doğrulaması | Lighthouse ≥95 perf / ≥100 a11y, LCP < 2.5s hedefleri ölçülmeli (revize sonrası regresyon kontrolü). |

---

**Son Güncelleme:** 2026-06-27 — map-codebase: kullanıcı tespitleri + brief bekleyen işleri toplandı (PRD tohumu).
