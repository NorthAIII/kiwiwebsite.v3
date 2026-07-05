# Crew OS Bölümü (Ana Sayfa Flagship)

## Özet

Ana sayfadaki Crew OS bölümü, ajansın bayrak katmanını — *müşterinin tüm otomasyonlarının çalıştığı, gözlemlenebilir ve ölçülebilir tek operasyon katmanını* — tanıtır.

**prd-refine (2026-06-28) bulgusu:** Bölümün **ana metni zaten doğru.** Canlı kopya (`crew.title` "Otomasyonlarınızın yaşadığı ve çalıştığı yer." + `crew.body` "tek operasyon katmanı — gözlemlenebilir, ölçülebilir, hep açık" + 3 platform `points`) platformun kimliğini anlatıyor; **Alpfit özellik listesi değil.** Yani REVIZE-BACKLOG A6 (*"siyah zemindeki 4 madde Alpfit özellikleri, Bunker OS ile alakasız"*) **büyük ölçüde çözülmüş** durumda.

**Kalan tek kalem:** sağdaki canlı operasyon panelindeki 4 akış adı (`crew.flows`: Kaçan üyeyi geri kazanma / Gelmeyen randevu kurtarma / Sepet yanıtı / Aday → görüntüleme) sektöre-özgü. Bunlar Crew OS'u *tanımlamıyor* (ana metin tanımlıyor); panelde **"platformda şu an çalışan gerçek akışlar"** olarak yaşıyorlar.

---

## Mevcut Kopya — `messages/*.json` → `crew` (v0.3'te `bunker`→`crew` rename)

| Anahtar | Mevcut | Durum |
|---------|--------|-------|
| `crew.title` / `crew.body` / `crew.points.*` | Platform kimliği (yaşadığı yer, gözlemlenebilir/ölçülebilir/hep açık, 3 platform maddesi) | ✅ Doğru — korunur |
| `crew.flows.{one..four}` | Sektöre-özgü 4 akış (kaçan üye, gelmeyen randevu, sepet yanıtı, aday→görüntüleme) | ✅ **Bırakıldı** — "platformda çalışan gerçek akışlar" çerçevesi (karar: prd-refine 2026-06-28) |
| `crew.explore` | "Crew OS'u keşfet" → `/crew-os` | ✅ Korunur (URL v0.3'te `/crew-os`'a taşındı) |

---

## Kullanıcı Senaryoları

- Ziyaretçi ana sayfada Crew OS bölümüne ulaşır → platformun *ne olduğunu* (otomasyonların yaşadığı/çalıştığı katman) ve *neden güvenilir olduğunu* (hep açık, izlenir, ölçülür) tek bakışta anlar → "Crew OS'u keşfet" ile detay sayfasına (`/crew-os`) gider.
- Sağdaki canlı panel, platformun **soyut değil somut** çalıştığını gösterir: gerçek akış adları + canlı/sırada durumu + Living Flow nabız motifi. Ziyaretçi "burada gerçek işler dönüyor" hisseder.
- Ziyaretçi sektörüne özel örnek arıyorsa bunu **Sektörler bölümünde** bulur; Crew OS bölümü onu oraya değil, platformu anlamaya yönlendirir.

---

## Davranış Kuralları

- Bölüm **platformun kimliğini** anlatır: otomasyonların tek yerde yaşadığı, 7/24 çalışan, gözlemlenebilir ve **ölçülebilir** operasyon katmanı. ("Sonuçlar varsayılmaz, ölçülür" ayırt edici vurgu korunur.) → **mevcut ana metin bunu zaten yapıyor.**
- **Panel akışları bırakılır (karar):** 4 akış adı korunur ama çerçeve **"platformda çalışan/sırada akışlar"**dır — Crew OS'un *tanımı* değil. Canlı operasyon paneli gerçek akış adlarıyla soyut yetenek etiketinden **daha inandırıcıdır** (craft = üst eksen). Akışların sektöre-özgü olması, "Crew OS bir sektör ürünüdür" izlenimi vermediği sürece sorun değil; ana metin platformu net anlattığı için bu risk düşük.
- Bayrak katman her yüzeyde **"Crew OS"** olarak anılır; "Bunker OS" adı görünmez.
- Birincil eylem: Crew OS detay sayfasına yönlendiren "keşfet" linki korunur.
- Metrik/panel gösterimi **"öngörü/örnek" çerçevesinde** kalır (gerçek müşteri verisi gelene dek; F5 → `kopya-revizesi.md`).

---

## İlişkili Feature'lar

- `sektorler-derinlestirme.md` — sektöre-özgü değer anlatımının asıl evi; panel akış adlarıyla tutarlı kalır.
- `nasil-calisir-4-adim.md` — ajansla çalışma süreci; Crew OS = o sürecin "Otomasyon" adımının yaşadığı yer (tutarlı kalmalı).
- Detay sayfası: M2 / F2.7 (Crew OS showcase, mevcut).

---

## Açık Sorular

- _(Public URL karara bağlandı ve uygulandı: v0.3 Faz 11'de `/bunker-os`→`/crew-os` — route + i18n namespace `bunker`→`crew` 5-dil rename + kalıcı 308 redirect + sitemap/canonical/alternates. Detay → `docs/DECISIONS.md`.)_
- _(Panel akış adları karara bağlandı: bırakıldı, "platformda çalışan gerçek akışlar" çerçevesi. Platform-seviyesi/anonim alternatifi reddedildi — craft gerekçesi.)_
