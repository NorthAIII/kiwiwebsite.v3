# KICKOFF-NOTES — Proje Anlama Kararları

**Mod:** PRD ile ilk kickoff (map-codebase iskeleti + olgun PRD üstüne; öncesinde kickoff/faz yok, CLAUDE.md yok)
**Tarih:** 2026-06-28
**Amaç:** Bu oturumda alınan kararları kickoff-docs için kaydetmek. Doküman üretimi/güncellemesi kickoff-docs'ta yapılır; bu dosya girdidir.

---

## 1. PRD Anlayışı (teyitli)

- **Proje:** Kiwi AI Lab (AI otomasyon ajansı) için canlı, Awwwards çıtasında tanıtım sitesi. İmza: The Living Flow WebGL alanı. Hedef: keşif görüşmesi + chatbot.
- **Revize gerekçesi:** Mimari sağlam; sorun **içerik + cila**. prd-refine reframe: canlı TR kopya beklenenden güçlü → v0.1 **cerrahi / ana-sayfa odaklı** (baştan-sona rewrite değil).
- **Taksonomi (sabit, DECISIONS):** Public ad **Crew OS** (her yüzeyde), iç kod adı **Bunker OS** (asla görünmez), **Alpfit** ayrı dikey ürün (kendi sayfası).
- **Dil:** 5 dil korunur; **TR tek kaynak**; çeviri **versiyon-sınırında** (sürekli senkron değil).
- **v0.1 feature'ları:** F1 Nasıl Çalışır 3→4 adım (yapısal), F2 Sektörler gym paneli tek-otomasyona (yapısal), F5 dürüstlük taraması (ses), F6 hero ikincil CTA (ses). F3 Crew OS panel akışları **bırakıldı** (çözülmüş).

**Gatekeeper sonucu:** PRD teknik açıdan yeterli. Bilinçli ertelenen kalemler v0.1 yapısını engellemiyor (aşağıda "Faz/Versiyon Dışı").

---

## 2. Modül & Feature Haritası Kararı

**Yeni modül gerekmiyor.** 4 v0.1 feature'ı tamamı **M2 (Sayfalar & Bölümler)** içinde; içerik teslim katmanı **M4 (i18n)**.

| PRD feature | Birincil modül | Dokunulan mevcut feature | Tip |
|---|---|---|---|
| `nasil-calisir-4-adim.md` | M2 (+M4) | F2.3 HowItWorks (3→4 adım, yeni `report` i18n anahtarı) | Yapısal |
| `sektorler-derinlestirme.md` | M2 (+M4) | F2.4 SectorSolutions (`gyms` paneli desen-dışı → tek-otomasyon) | Yapısal |
| `crew-os-bolumu.md` | M2 (+M4) | F2.5 Bunker/Crew OS teaser (panel akış çerçevesi; ana metin doğru) | Minimal |
| `kopya-revizesi.md` | M2 + M4 (kesişen) | Ana sayfa geneli ses/ton tutarlılığı + F5/F6 | Ses cilası |

- **Bağımlılık:** M4 → M2 (tüm görünür metin i18n'den). Değişiklikler **TR'de** yapılır; EN/AR/DE/ES versiyon-sınırında tek seferde.
- **ILKELER uyumu:** Kalıcılık (mevcut altyapı korunur, üstüne inşa) + Marka & Craft üst eksen + Lokalizasyon versiyon-sınırı senkronu.
- **MODULE-MAP eylemi (kickoff-docs):** Revize feature'ları için **yeni satırlar** eklenir (mevcut v3 ✅ satırları baseline kalır). Faz numarası verilmez — discuss-phase'de damgalanır.

---

## 3. Doküman Hizalaması (kickoff-docs'ta uygulanacak)

> PRD tespit etti (SESSION-NOTES → "Doküman Uyumsuzlukları"), kickoff hizalar. Bu oturumda **plan** olarak kaydedildi; metin değişikliği kickoff-docs/verify'da.

- `_dev/OVERVIEW.md` — karışık "Bunker OS / Crew OS" ifadeleri taksonomiye göre netleştir (public=Crew OS, iç=Bunker OS).
- `_dev/MODULE-MAP.md` — aynı taksonomi netliği; `F2.5/F2.7` adlandırmaları "Crew OS (route hâlâ `/bunker-os` — açık konu)" notuyla.
- `MASTER_PROMPT_v2.md §1` — "Bunker OS" → public ad Crew OS olmalı (brief eski; PRD geçerli).
- **NOT:** `/bunker-os` → `/crew-os` **route/URL değişikliği bu kapsamda DEĞİL** (kod + SEO redirect; görsel/SEO versiyonu). Yalnızca doküman metni hizalanır.

---

## 4. Faz Kararı

**Tek v0.1 içerik fazı** (kullanıcı onayı 2026-06-28). Bölünmedi — versiyon küçük/cerrahi/ana-sayfa. Faz numarası verilmez; discuss-phase'de damgalanır.

**PHASES.md "Sıradaki Fazlar" (numarasız) — kickoff-docs'ta mevcut listenin yerini alır:**

- **v0.1 — Ana sayfa TR içerik & ses revizesi**
  Milestone: F1 (4 adım: Analiz·Çözüm·Otomasyon·Raporlama, yeni `report` anahtarı) + F2 (gym paneli tek-otomasyon desenine) + F5 (dürüstlük taraması: "öngörü/örnek" çerçevesi tutarlı) + F6 (hero ikincil CTA net etiket) ana sayfada tamam; marka sesi tutarlı; TR tek kaynak (çeviri versiyon-sınırına ertelendi).

> Mevcut PHASES.md "Sıradaki Fazlar" (map-codebase'den, 6 konu) prd-refine reframe'inden **önce** yazıldı (görsel cila/test v0.1 dışına alındı, Crew OS çözüldü) → kickoff-docs'ta yukarıdakiyle değiştirilir.

---

## 5. Faz/Versiyon Dışı (ileri versiyon adayları — VERSIONS.md)

Faz değil; versiyon düzeyinde plan olarak kalır:

- **Görsel & etkileşim cilası:** logo hizalama (A1), CTA kartı affordance + scroll göstergesi ölçekleme (A3 — kartlar zaten `<Link>`, sorun görsel), Living Flow yeşil nabız kapsamı (B1). Crew OS `/crew-os` URL kararı da bu/SEO versiyonunda.
- **Teknik & performans:** test altyapısı kurulumu (D1), perf bütçesi doğrulaması (D2), Umami analytics (E1 — spec `docs/UMAMI-ANALYTICS.md`).
- **Çeviri senkronu:** v0.1 TR durulunca EN/AR/DE/ES (versiyon-sınırı işi).
- **Bekleyen veri/entegrasyon:** sosyal medya linkleri (C1), Weekend demo (C2), gerçek metrik/vaka verileri (C4), chatbot → "book a call" (C7).

---

## 6. Projeye Özgü Doküman İhtiyacı

**Yeni kalıcı doküman gerekmiyor.** Marka sesi/yasaklar zaten VIZYON §4 + ILKELER + `kopya-revizesi.md`'de — ayrı STYLE-GUIDE tekrar/drift riski. CLAUDE.md kickoff-verify'da doğacak.

---

## 7. kickoff-docs İçin Eylem Listesi

1. MODULE-MAP.md: v0.1 revize feature satırları ekle (M2/M4, faz numarasız); taksonomi metnini netleştir.
2. PHASES.md: "Sıradaki Fazlar"ı tek v0.1 fazıyla değiştir (yukarıdaki milestone).
3. OVERVIEW.md + MASTER_PROMPT_v2.md §1: taksonomi metin hizalaması (Bunker OS iç / Crew OS public).
4. INDEX.md: PRD/ bölümünü "oluşturuldu" olarak güncelle (artık `_dev/PRD/` var); yeni doküman yok.
5. DURUM.md: "sıradaki adım" alanını kickoff sonrası akışa güncelle.
6. Yeni proje-özgü doküman: **yok**.

---

**Son Güncelleme:** 2026-06-28 — kickoff: PRD ile ilk kickoff; modül haritası (M2+M4, yeni modül yok), tek v0.1 fazı, taksonomi doküman hizalama planı kaydedildi.
