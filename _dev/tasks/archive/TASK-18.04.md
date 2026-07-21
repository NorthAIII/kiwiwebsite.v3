# TASK-18.04: Ziyaretçi-görünür offline kopya yeniden yazımı (messages ×5) — Karar C.2

**Durum:** ✅ Tamamlandı
**Modül:** M4-i18n (+M5)
**Feature:** C1 (Karar C.2 — dürüstlük/craft)
**Faz:** Phase 18 (phases/PHASE-18.md)
**Bağımlılıklar:** TASK-18.01 ✅ (v0.5 branch)

---

## Hedef

`messages/{tr,en,ar,de,es}.json` `chat.error` string'indeki "ANTHROPIC_API_KEY ekleyin" ifadesini ziyaretçiye uygun **geçici-hata** kopyasıyla değiştir (5 dil). Canlıya alınınca offline artık geçici bir hata (anahtar-eksik değil) → dev anahtar-adı iması **yanlış** + ziyaretçiye anlamsız. TR kaynak yazılır, non-TR değer-senkronu bu task'ta yapılır. Tamamlanma: 5 dilde `chat.error` anahtar-adı içermiyor, i18n parite yeşil.

---

## Bağlam

**Karar C.2 (kullanıcı onaylı):** offline hata kopyası yeniden yazılır — dev anahtar-adı kaldırılır. Bu bir **DEĞER** değişimi (anahtar EKLEME/rename **değil**) → i18n disiplini korunur (anahtar 5 dilde zaten var; yalnız değer değişir, parite testi otomatik yeşil kalır). Normalde non-TR stale-değer versiyon-sınırına ertelenirdi; ama mevcut değer **TR dahil** yanlış (dev anahtar-adı ziyaretçiye görünüyor) → bu, çeviri-senkronu numarasız adayından **ayrı**, bu fazın işi. Ziyaretçi bu string'i chatbot offline'da görür (byte-cap 400 + Groq 429/503 dahil her `!res.ok`).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` — Karar C.2 (offline kopya yeniden yazımı)
- `_dev/modules/M4-i18n.md` — 5-dil senkron + RTL kuralları
- `_dev/MEMORY.md` — Süreç Disiplini: "i18n anahtar varlığı ≠ değer tazeliği" (bu bir değer değişimi)
- Mevcut `messages/{tr,en,ar,de,es}.json` `chat.error` değerleri (referans)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [x] **1. TR kaynak yaz** — `messages/tr.json` `chat.error`
  - Yeni geçici-hata kopyası: "Asistan şu an yanıt veremiyor. Birazdan tekrar deneyin ya da kivanc@kiwiailab.com adresine yazın."
  - Anahtar-adı/teknik terim **yok**; e-posta CTA (system prompt `kivanc@kiwiailab.com` CTA'sıyla tutarlı); marka sesi (sade, kendinden emin). Apostrof-ek tuzağından kaçınıldı ("com'a" yerine "adresine yazın").

- [x] **2. 5-dil değer senkronu** — en/ar/de/es `chat.error`
  - Aynı anlam native yazıldı; e-posta CTA hepsinde; anahtar sabit, yalnız değer değişti. Register korundu (EN nötr, DE=Sie, ES=tú, AR tekil informal — namespace tonuyla eşleşti).
  - AR: RTL native; e-posta ASCII olarak LTR gömülü.

- [x] **3. Parite + build doğrula**
  - `npm run test` → 52 passed (i18n parite anahtar kümesi değişmedi → yeşil); `next build` temiz (exit 0); JSON ×5 geçerli; grep anahtar-adı 0.

---

## Etkilenen Dosyalar

```
messages/
├── tr.json    # chat.error değeri (kaynak) — "ANTHROPIC_API_KEY" kalkar
├── en.json    # chat.error değeri
├── ar.json    # chat.error değeri (RTL)
├── de.json    # chat.error değeri
└── es.json    # chat.error değeri
```

---

## Dikkat Noktaları

- **Değer değişimi (anahtar değil)** → parite testi otomatik yeşil kalır; yine de 5 dilin hepsi eşzamanlı yazılır (eksik değer bırakma).
- **Ziyaretçi-görünür kopya:** anahtar-adı/teknik terim yasak; marka sesi (sade, çıktı-odaklı) + e-posta CTA korunur; **sahte "● online/canlı" tiyatrosu yok** (ILKELER yasak).
- **AR:** logical/okunabilirlik korunur; e-posta adresi LTR gömülü.
- Bu string byte-cap 400 + Groq 429/503 dahil her `!res.ok`'te gösterilir (yalnız "key yok" değil) → kopya **genel geçici hata** tonu (spesifik "key ekleyin" değil).

---

## Test Kriterleri

- [x] `npm run test` — i18n parite yeşil (anahtar kümesi değişmedi) → **52 passed**.
- [x] 5 dilde `chat.error` içinde "ANTHROPIC_API_KEY" / anahtar-adı geçmiyor (grep → messages/ 0 eşleşme).
- [x] 5 dil değeri anlamca eşdeğer + e-posta CTA içeriyor; AR native/RTL uygun.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-22

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `messages/{tr,en,ar,de,es}.json` `chat.error` (satır 494) ×5 değeri yeniden yazıldı; "ANTHROPIC_API_KEY ekleyin" dev anahtar-adı iması kaldırıldı, yerine ziyaretçiye uygun **geçici-hata** kopyası + e-posta CTA (`kivanc@kiwiailab.com`).
- TR kaynak yazıldı, 4 dile değer-senkronu yapıldı. Anahtar kümesi değişmedi (yalnız değer) → i18n parite testi otomatik yeşil kaldı.
- Register her dilde namespace'in mevcut tonuyla eşleştirildi (EN nötr, DE=Sie, ES=tú, AR tekil informal).

**Sorunlar:**
- TR'de "kivanc@kiwiailab.com'a yazın" apostrof-ek (U+2019 suffix) e-posta üzerinde tırnaklı/çirkin durur: "…adresine yazın" ile yeniden çerçevelendi (temiz + apostrof tuzağı yok).

**Kararlar:**
- Kopya çerçevesi "geçici hata + tekrar dene / e-posta" (spesifik "key ekle" değil) — çünkü string byte-cap 400 + Groq 429/503 dahil her `!res.ok`'te gösterilir (PHASE-18 Dikkat Noktaları). Genel geçici-hata tonu doğru.
- docs/DECISIONS.md'ye eklendi: Hayır (Karar C.2 zaten DECISIONS 2026-07-21 + PHASE-18'de; bu icra o kararı uyguluyor, yeni karar yok).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- `messages/tr.json` → `chat.error` yeni TR geçici-hata kopyası (kaynak)
- `messages/en.json` → `chat.error` EN
- `messages/ar.json` → `chat.error` AR (RTL native, e-posta LTR gömülü)
- `messages/de.json` → `chat.error` DE (Sie)
- `messages/es.json` → `chat.error` ES (tú)

**Test Sonuçları:**
- `npm run test` → **52 passed** (6 dosya; i18n 5-dil parite dahil).
- `next build` → temiz (exit 0).
- JSON geçerlilik ×5 → valid; anahtar-adı grep → messages/ 0 eşleşme.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-07-22

**Ne Yapıldı:**
- Ziyaretçi-görünür chatbot offline kopyası 5 dilde yeniden yazıldı; dev anahtar-adı iması kaldırıldı, geçici-hata + e-posta CTA tonu getirildi (Karar C.2). Değer değişimi (anahtar sabit) → parite testi yeşil, build temiz.

**Öğrenilenler:**
- TR'de e-posta/URL'ye Türkçe ek getirirken apostrof-suffix (U+2019) çirkin durur — "adresine yazın" gibi ek-almayan çerçeve tercih edilir. (Task-özel nüans; proje-geneli değil → memory'ye taşınmaz.)

---

**Oluşturulma:** 2026-07-22
