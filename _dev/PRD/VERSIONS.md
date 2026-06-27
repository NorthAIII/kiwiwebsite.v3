# VERSIONS — Feature-Versiyon Haritası

**Amaç:** Hangi feature'ın hangi versiyona dahil olduğunu tutan tek kaynak. (MODULE-MAP'in Versiyon sütunu buradan beslenir.)

> **Bağlam:** Mevcut site = "v3 (mevcut canlı)". Güçlü revize, **v0.1**'den başlayan kümülatif versiyonlarla yürür. Aşağıdaki feature'lar revizenin *yeni* iş birimleridir; mevcut çalışan feature'lar `_dev/MODULE-MAP.md`'de listelenir.

---

## Feature → Versiyon

| Feature | Feature Dosyası | Versiyon |
|---------|-----------------|----------|
| Crew OS bölümü içerik düzeltmesi (flagship platformu satar) | `features/crew-os-bolumu.md` | v0.1 |
| "Nasıl çalışır" 4 adım (Analiz·Çözüm·Otomasyon·Raporlama) | `features/nasil-calisir-4-adim.md` | v0.1 |
| Sektörler derinleştirme (6 sektör, özgün içerik) | `features/sektorler-derinlestirme.md` | v0.1 |
| Site geneli TR kopya revizesi (marka sesi) | `features/kopya-revizesi.md` | v0.1 |

**v0.1 teması:** Türkçe içerik & mesaj revizesi — **ana sayfa odaklı, cerrahi** (prd-refine 2026-06-28 reframe: kopya zaten güçlü; baştan-sona rewrite değil, nokta-atışı düzeltmeler + ses taraması). TR tek kaynak; çeviri versiyon-sınırında (bkz. VIZYON §5).

**v0.1 ağırlık merkezi (bulgu önceliği, `features/kopya-revizesi.md` F1–F6):** F1 Nasıl Çalışır 4 adım (yapısal) + F2 gym paneli tek-otomasyona (yapısal) = asıl iş; F5 dürüstlük taraması + F6 hero ikincil CTA = ses cilası; F3/F4 karara bağlandı.

---

## Sıradaki Versiyonlar (aday — henüz planlanmadı)

> Kesin kapsam ve sıra prd-refine / discuss-phase'de netleşir. Numara/kesin versiyon atanmaz.

- **Görsel & etkileşim cilası:** logo hizalama, CTA kartı affordance + scroll göstergesi ölçeklemesi, Living Flow yeşil nabız kapsamı kararı (REVIZE-BACKLOG A1, A3, B1). *(A3 doğrulandı: hero stat kartları zaten `<Link>` — sorun görsel affordance, kopya değil. Crew OS `/crew-os` URL kararı da bu/SEO versiyonunda.)*
- **Teknik & performans:** test altyapısı kurulumu, perf bütçesi doğrulaması, Umami analytics entegrasyonu (REVIZE-BACKLOG D1, D2, E1).
- **Çeviri senkronu:** v0.1 TR içeriği durulunca EN/AR/DE/ES güncellemesi (dil stratejisi gereği versiyon-sınırı işi).
- **Bekleyen veri/entegrasyon:** sosyal medya gerçek linkleri, Weekend demo ("no 36"), gerçek metrikler/vaka verileri, chatbot → "book a call" akışı (REVIZE-BACKLOG C1–C7).

---

**Son Güncelleme:** 2026-06-28 — prd-refine: v0.1 cerrahi/ana-sayfa odaklı reframe; bulgu önceliği eklendi; A3 görsel olarak doğrulandı.
