# TASK-18.04: Ziyaretçi-görünür offline kopya yeniden yazımı (messages ×5) — Karar C.2

**Durum:** ⬜ Bekliyor
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

- [ ] **1. TR kaynak yaz** — `messages/tr.json` `chat.error`
  - Yeni geçici-hata kopyası (örn. "Asistan şu an yanıt veremiyor. Birazdan tekrar deneyin veya kivanc@kiwiailab.com'a yazın.")
  - Anahtar-adı/teknik terim **yok**; e-posta CTA (mevcut system prompt CTA'sıyla tutarlı); marka sesi (sade, kendinden emin)

- [ ] **2. 5-dil değer senkronu** — en/ar/de/es `chat.error`
  - Aynı anlamı native yaz; e-posta CTA hepsinde; anahtar sabit, yalnız değer değişir
  - AR: logical/okunabilirlik korunur (RTL)

- [ ] **3. Parite + build doğrula**
  - `npm run test` (i18n parite: anahtar kümesi değişmedi → yeşil); `next build` temiz

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

- [ ] `npm run test` — i18n parite yeşil (anahtar kümesi değişmedi).
- [ ] 5 dilde `chat.error` içinde "ANTHROPIC_API_KEY" / anahtar-adı geçmiyor (grep).
- [ ] 5 dil değeri anlamca eşdeğer + e-posta CTA içeriyor; AR native/RTL uygun.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(run-task oturumunda doldurulacak)_

---

**Oluşturulma:** 2026-07-22
