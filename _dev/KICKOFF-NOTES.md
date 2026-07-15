# KICKOFF-NOTES — Re-Kickoff (v0.4 Alpfit Plus)

> Bu dosya `/devflow:kickoff` (re-kickoff modu) oturumunun karar kaydıdır. Bir sonraki oturum `/devflow:kickoff-docs` bunu okuyup dokümanları (MODULE-MAP, PHASES, VERSIONS, M2, feature dosyası vb.) günceller. **Bu oturumda başka doküman değişmedi** (kickoff disiplini). Olgunlaşınca bu dosya mezun edilir/silinir.

**Mod:** Re-kickoff (yeni versiyon) · **Tarih:** 2026-07-16 · **Branch:** `revize/alpfit-plus` (güncel `main` ucundan taze)

---

## 1. Mevcut Durum (çıkış noktası)

- **v0.3 canlıda** (2026-07-05, `main` `2ea09b7`), aktif faz/task **YOK**, Versiyon Sonu Durumu `içerik_fazları` (prd-review sıfırladı). DevFlow'un işaret ettiği sıradaki adım = re-kickoff → yeni versiyon.
- Fazlar 1–14 ✅. **Sıradaki faz no = 15** (just-in-time; PHASES Faz Numaralandırma Kuralı, max 14 + 1).
- ⚠️ Devralınan açık takip (release engeli değil): canlı `ANTHROPIC_API_KEY` env ayarlı değil (`/api/chat` 503 → chatbot "offline"). Bu versiyonun kapsamı değil, kayıt.

---

## 2. Yeni Versiyon: v0.4 — Alpfit Plus ürün vitrini

**Tema:** Alpfit (spor salonu yazılımı, F2.8) sayfasının sade halinden **"Alpfit Plus" zengin ürün landing page'ine** yeniden tasarımı. Alpfit ayrı/bağımsız dikey üründür (VIZYON §3) — bu versiyon o ürünün vitrinini güçlendirir.

**Kaynak (tasarım referansı):** Kullanıcının paylaştığı claude.ai artifact `48b3e9d4-57ac-4f2a-ae5b-68e764561dc9` ("Alpfit Plus — Kulüp İşletme Yazılımı"). Marka token'ları kiwiailab.com ile **bilinçli uyumlu** (canvas/ink/green/pulse, light/dark, reveal). Düz HTML/CSS/JS → React'e port edilecek.
> **kickoff-docs notu:** artifact'ın tam HTML kaynağını `_dev/docs/` altına referans olarak kaydet (vizyon kaybını önle — artifact düzenlenebilir/silinebilir). Yapısal özet + kopya aşağıda.

### Artifact yapısı (bölümler)
1. **Header** — sticky nav: `Alpfit+ by Kiwi AI Lab`, linkler (Roller/Özellikler/Fiyat) + "Demo iste" CTA.
2. **Hero** — pilot chip ("Weekend Training Club'da canlı pilotta" + nabız nokta) · H1 "Kulübünüzün tüm işi tek platformda." · alt metin · CTA'lar · **before→after** kartı (Bugün: WhatsApp/Excel/defter → Alpfit+: birleşik).
3. **Sorun** — "Kulüp dağınık araçlarla yönetiliyor" (tek doğru veri kaynağı argümanı).
4. **4 Rol** — Üye (telefon), Antrenör (telefon), Diyetisyen (web), Yönetim (web); her biri kendi ekranı.
5. **9 Özellik** — Takvim&Rezervasyon · Grup Dersleri · Üyelik&Paket · Üye 360 · Finans&Ciro · Çok-Şube Cockpit · Antrenör Performansı · Raporlar (XLSX/PDF) · Bildirim&Retention.
6. **Neden Alpfit Plus** — rekabet farkı: diyetisyen aynı platformda ("18 rakip üründe yok") + antrenör mobil app + çok-şube butik fiyat + donanımsız + tek veri kaynağı; yan alıntı ("kaç randevuya gelinmedi?").
7. **Fiyat** (koyu bant) — ₺1.500+KDV/salon/ay · 2. salon %20 (₺1.200) · kurulum ₺3.000 (yıllık peşinde ücretsiz) · 15 gün deneme · "Her salonda dahil" listesi (üye+antrenör app, diyetisyen, cockpit, finans, raporlar, kurulum/veri taşıma/eğitim).
8. **Yol haritası — yakında** — Online ödeme · QR/turnike giriş · Apple Health & Google Fit · AI gelişim & beslenme analizi · **+ Store/Mağaza** (kullanıcı isteği, bu re-kickoff'ta eklendi).
9. **Kapanış** — "15 dakikada kendi kulübünüzde görün" + Demo/Soru CTA.
10. **Footer** — marka + iletişim (kivanc@kiwiailab.com).

---

## 3. Dürüstlük / marka kararları (4/4 gerçek — kullanıcı teyidi 2026-07-16)

ILKELER "Pazarlık Konusu Olmayanlar" + VIZYON §4 dürüstlük konvansiyonu kapsamında karara bağlandı:

| Madde | Durum | Sonuç |
|-------|-------|-------|
| "Weekend Training Club'da canlı pilotta" + nabız nokta | **Gerçekten canlı** | Kalır — gerçek canlı ürünün dürüst göstergesi yasak dışı (ILKELER; Alpfit örneği zaten adı geçiyor). |
| Fiyatlar (₺1.500+KDV vb.) | **Kesin & public** | Fiyat bölümü artifact'taki gibi net, canlıda açık gösterilir. |
| Ürün iddiaları (4 rol, diyetisyen modülü, mobil app'ler, çok-şube) | **Hepsi mevcut** | Sayfa olduğu gibi anlatır — kurgu/aspirasyon yok. |
| "İncelediğimiz 18 rakip üründe yok" | **Gerçek inceleme** | Sayı kalır. |

→ Artifact içeriği **dürüstlük açısından temiz**; port sırasında iddia yeniden-çerçeveleme gerekmiyor.

---

## 4. Kapsam

**Dahil (v0.4):**
- Alpfit Plus sayfası (`/spor-salonu-yazilimi`) zengin yeniden tasarımı — artifact'taki bölümler React'e port + 5-dil i18n.
- Yeni içerik: before/after, 4 rol, 9 özellik (mevcut 8'i genişletir), neden/rekabet, fiyat bölümü, yol haritası (+ Store), kapanış.
- SEO/metadata güncellemesi (fiyatlı ürün sayfası; başlık/description).

**Dışında (kuyrukta — sonraki versiyon adayları, SESSION-NOTES B grubu):**
- Alt sayfa çeviri senkronu (genel), brief mobil perf, chatbot max-byte cap, AR-dil stratejisi, TB-3/4/5.
- Route değişimi (`/spor-salonu-yazilimi` korunur — public ad zaten sektör-tanımlı, iç-ad sızıntısı yok; rename gerekçesi yok). *discuss-phase teyit eder.*
- Yol haritası kalemlerinin (Store/online ödeme vb.) **gerçek işlevi** — sayfada "yakında" olarak anlatılır, ürün geliştirmesi bu repo dışı.

---

## 5. Modül Etkisi

Yeni modül gerekmez. Mevcut modüllere yeni feature satırları (kickoff-docs MODULE-MAP'e ekler):

- **M2 (merkez)** — F2.8 Alpfit sayfası zenginleştirme: yeni bölüm bileşenleri (`components/gym/`). Ağırlık burada.
- **M4** — yeni içerik için 5-dil i18n namespace (aşağıda §7).
- **M1** — tasarım token'ları zaten uyumlu; Living Flow hero opsiyonel (mevcut sayfada var, korunur/değerlendirilir).
- **M6** — SEO/metadata (fiyatlı ürün sayfası).

---

## 6. Faz Konuları (numarasız — discuss-phase damgalar; ilk no = 15)

**v0.4 içerik fazı konusu:** "Alpfit Plus sayfası zenginleştirme."
- Tek faz mı, yoksa **(a) yapı/port + tasarım** ardından **(b) içerik/kopya + i18n** diye 2 faza mı bölünür → discuss-phase kararı. İş paketi büyükse bölünmeli (task-boyutu felsefesi).
- Ardından versiyon-sonu sabit fazları: **teknik borç → senaryo testi → prd-review** (Versiyon Sonu Kuralı).

---

## 7. i18n Kararı (kullanıcı onayı 2026-07-16)

**Düzgün 5-dil next-intl namespace** (site standardı) — mevcut Alpfit sayfasının component-içi `tr ? ... : ...` (yalnız TR/EN) deseni **terk edilir**; yeni içerik `messages/{tr,en,ar,de,es}.json`'da yaşar.
- **TR tek kaynak** mükemmelleştirilir; non-TR diller **versiyon-sınırında** çevrilir (VIZYON §5). Yapısal anahtarlar 5 dilde eşzamanlı var olmalı (eksik anahtar = runtime hata — Süreç Disiplini); değer stale/placeholder geçici kabul.
- Yeni namespace önerisi (örn. `alpfit` / `gym`) discuss-phase'de netleşir.

---

## 8. Teknik Yaklaşım

- Düz HTML/CSS/JS artifact → **React (Next 15 App Router) + Tailwind v4 token** (kendi `<style>`/`:root` değil, `--color-*`/`--font-*` token'ları) + **next-intl**.
- Yeniden kullanım: `Reveal`, `PageHeader`, `Footer`, `SmoothScroll`, `CustomCursor` (mevcut sayfa deseni). Living Flow hero **opsiyonel** — mevcut sayfada var; korunur mu / before-after ile değişir mi → discuss/plan.
- Fraunces (display) + Geist (sans) — artifact'ın sistem-font fallback'i yerine projenin gerçek webfont'ları.
- Guardrail (regresyonsuz korunur): a11y=100 çift-tema · perf tabanı · CLS≈0 · i18n 5-dil parite · marka sesi yasakları · reduced-motion fallback.

---

## 9. kickoff-docs'ta Yapılacaklar (sonraki oturum)

- **VERSIONS.md** — v0.4 (Alpfit Plus ürün vitrini) "Sıradaki/Aktif Versiyon" olarak ekle; feature→versiyon satırları.
- **MODULE-MAP.md** — v0.4 iş birimi satırları (M2 merkez + M4/M1/M6); F2.8'e faz ataması (girince).
- **PHASES.md** — "Sıradaki Fazlar"a numarasız konu ("Alpfit Plus sayfası zenginleştirme"); versiyon-sonu sabit fazları notu.
- **M2 modül dokümanı** — F2.8 açıklamasını yeni kapsama göre güncelle (yeni bölümler + i18n namespace).
- **PRD feature dosyası** — `PRD/features/alpfit-plus.md` (yeni): artifact yapısı + dürüstlük kararları + kopya taslağı.
- **DURUM.md** — Aktif Versiyon v0.4, sıradaki adım discuss-phase.
- **`_dev/docs/`** — artifact tam HTML kaynağını referans olarak kaydet.

---

**Sıradaki adım:** `/devflow:kickoff-docs` (yeni oturum) — dokümanları oluştur/güncelle.
