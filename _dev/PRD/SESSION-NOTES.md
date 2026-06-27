# SESSION-NOTES — PRD Çalışma Kanvası

> Bu dosya PRD'nin **anlık çalışma durumu** kanvasıdır — açık sorular, keşfedilmemiş alanlar, hipotezler. Olgunlaşan bilgi PRD dokümanlarına taşınır ve buradan izsiz silinir. Şişmiş bir SESSION-NOTES mezuniyet borcunun işaretidir.

---

## Mevcut Durum Analizi (sonraki oturum için bağlam)

- Site **canlı ve mimari olarak sağlam**; tespit edilen sorunlar mimari değil **içerik + cila** kalemi. Revize v3'te yerinde + `revize/...` branch'le yürür (`main` canlı kalır).
- **prd-refine reframe (2026-06-28):** Canlı TR kopya baştan okundu (kodla doğrulandı). REVIZE-BACKLOG A2 *"genel kopya jenerik/zayıf"* varsayımı **tutmadı** — kopya büyük ölçüde güçlü. v0.1 kopya işi **cerrahi/nokta-atışı + ana sayfa ses taraması** (baştan-sona rewrite değil). Bölüm-bölüm bulgular F1–F6 → `features/kopya-revizesi.md`.
- Revizenin ağırlık merkezi M2 (Sayfalar & İçerik). Görsel cila + teknik ikincil, sonraki versiyonlara aday.

---

## Açık Sorular

- **Crew OS URL'i:** Sayfa `/bunker-os` (i18n namespace `bunker`) iç adı URL'de sızdırıyor. Public URL `/crew-os` olmalı mı? SEO + kalıcı redirect maliyeti var (M6). → **v0.1 dışı; görsel/SEO versiyonunda karara bağlanır.**
- **Living Flow yeşil nabız kapsamı (REVIZE-BACKLOG B1):** Nabızlar sayfanın daha aşağısına taşınsın mı? Göz yorgunluğu/okunabilirlik riski (yoğunluk/opaklık, scrim, reduced-motion). → **Görsel versiyon konusu.**

## Keşfedilmemiş Alanlar

- **Sektörlerin gerçek otomasyon içerikleri:** 5 sektör mevcut kopyada makul/özgün; ama her sektörün **gerçek müşteri otomasyon örneği** kullanıcıdan alınmalı (içerik girdisi — execution-zamanı, F5 dürüstlük konvansiyonuna tabi).
- **Chatbot'un rolü revizede:** Mesaj/CTA stratejisinde chatbot nereye oturuyor? "Book a call" akışına bağlama (C7). → **v0.1 dışı** (chat kopyası zaten güçlü); sonraki versiyon adayı.

## Çözülenler (bu oturum — referans, sonraki oturumda silinebilir)

- ✅ "Nasıl çalışır" 4 adım adları → **Analiz · Çözüm · Otomasyon · Raporlama** (`features/nasil-calisir-4-adim.md`).
- ✅ Bölüm-bölüm "kopya neden zayıf" → F1–F6 tablosu, premise reframe (`features/kopya-revizesi.md`).
- ✅ Sektörler "sığ" reframe → asıl sorun gym paneli desen-dışı; 5 sektör güçlü (`features/sektorler-derinlestirme.md`).
- ✅ Crew OS bölümü → ana metin doğru (A6 çözülmüş); panel akışları bırakıldı (`features/crew-os-bolumu.md`).
- ✅ "● canlı" nokta yasağı gerilimi → niyet-bazlı çözüldü (ILKELER + VIZYON §4 + DECISIONS 2026-06-28).
- ✅ Credibility & Forum kapsamı → güçlü; v0.1'de derin rewrite yok, sadece F5 taraması.

## Doküman Uyumsuzlukları (kickoff'ta hizalanacak)

> Taksonomi netleştikten sonra eskiyen ifadeler — kickoff-docs/verify'da düzeltilecek (PRD tespit eder, kickoff hizalar):
- `MASTER_PROMPT_v2.md` §1: "Bunker OS" → public ad Crew OS olmalı (iç adı Bunker OS).
- `_dev/OVERVIEW.md` & `_dev/MODULE-MAP.md`: "Bunker OS / Crew OS" karışık ifadeler ve `bunker-os` adlandırması taksonomiye göre güncellenmeli.

---

**Son Güncelleme:** 2026-06-28 — prd-refine: bölüm-bölüm kopya analizi; premise reframe (kopya güçlü → cerrahi); F1–F6 + 4 feature güncellendi.
