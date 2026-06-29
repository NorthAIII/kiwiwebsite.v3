# VERSIONS — Feature-Versiyon Haritası

**Amaç:** Hangi feature'ın hangi versiyona dahil olduğunu tutan tek kaynak. (MODULE-MAP'in Versiyon sütunu buradan beslenir.)

> **Bağlam:** Mevcut site = "v3 (mevcut canlı)". Güçlü revize, **v0.1**'den başlayan kümülatif versiyonlarla yürür. **v0.1 tamamlandı** (3 faz: içerik + teknik borç + senaryo testi; prd-review 2026-06-29 — değişiklik yok). Sıradaki aktif versiyon **v0.2** (aşağıda). Aşağıdaki feature'lar revizenin *yeni* iş birimleridir; mevcut çalışan feature'lar `_dev/MODULE-MAP.md`'de listelenir.

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

## Sıradaki Versiyon: v0.2 — a11y & Performans + teknik temel

> Öncelik prd-review (2026-06-29) ile sabitlendi. Gerekçe: v0.1 versiyon-sonu ölçümü (Faz 2 / TD3) brief-bütçe açığını keşfetti — bu en güçlü, ortam-bağımsız açık kalem. Kesin faz kapsamı/sırası discuss-phase'de netleşir.

**v0.2 çekirdeği:**
- **a11y 89 → ≥100** — *ortam-bağımsız, en net sinyal* (brief hedefi ≥100). 3 denetim: marka-yeşili `#8af28a` kontrastı + geçersiz hero `<dl>`/`dlitem` markup + dil-switcher aria-mismatch (DECISIONS 2026-06-28, `docs/perf/README.md`).
- **mobil perf 87 / LCP 3.1s → brief bütçesi** (≥95 / <2.5s) — ana kaynak Living Flow WebGL (craft-duyarlı, üst eksen → aceleyle dokunulmaz) (REVIZE-BACKLOG D2).
- **Test altyapısı (D1)** — kümülatif test ilkesi (ILKELER); "test = build + otonom UAT" geçici durumunu kapatan teknik temel.
- **Umami analytics (E1)** — `docs/UMAMI-ANALYTICS.md` spec'i; **canlıda gerçekten saydığı gözle doğrulanır** (memory Süreç Disiplinleri).

## Sonraki Aday Versiyonlar (henüz planlanmadı)

> Numara/kesin versiyon atanmaz; sıra prd-refine / discuss-phase'de netleşir.

- **Görsel & etkileşim cilası:** logo hizalama (A1), CTA kartı affordance + scroll göstergesi ölçeklemesi (A3 — kartlar zaten `<Link>`, sorun görsel), Living Flow yeşil nabız kapsamı (B1); **SEO-bitişik:** `/bunker-os`→public `/crew-os` + redirect (M6) ve çıplak `/forum`→`/bulten`→404 (index'siz statik bülten).
- **Çeviri senkronu:** alt sayfa EN/AR/DE/ES güncellemesi (v0.1 ana sayfa değişen kalemleri zaten senkron; versiyon-sınırı işi).
- **Bekleyen veri/entegrasyon:** sosyal medya gerçek linkleri (C1), Weekend demo ("no 36" / C2), gerçek metrikler/vaka verileri (C4), chatbot → "book a call" akışı (C7), alt sayfa derin denetimi.

---

**Son Güncelleme:** 2026-06-29 — prd-review: v0.1 tamamlandı (değişiklik yok); sıradaki versiyon v0.2 = a11y & Performans + teknik temel olarak sabitlendi (brief-bütçe açığı en güçlü açık kalem); kalan adaylar (görsel cila, çeviri, bekleyen veri) sonraki aday olarak yeniden sıralandı.
