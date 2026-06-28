# TASK-3.04: S6 — 5-Dil Bütünlük & non-TR Tutarlılığı

**Durum:** ⬜ Bekliyor
**Modül:** M4 — i18n & Yerelleştirme (modules/M4-i18n.md) (+ M2)
**Feature:** S6 — 5-dil bütünlük & non-TR tutarlılığı (versiyon-sonu çekirdek validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (runtime MISSING_MESSAGE avı için prod serve gerekir)

---

## Hedef

i18n bütünlüğünü iki katmanda doğrula (TK4): (1) **yapısal parite** — node key-diff ile 5 dil aynı leaf-key setini taşıyor mu (araştırma tabanı: 183 leaf-key, 0 eksik / 0 fazla; re-teyit); (2) **runtime boşluk** — 5 dil home render'da `MISSING_MESSAGE` yok; (3) **bilinçli-stale tutarlılık** — non-TR değerleri görünür kopukluk (yarım-çeviri) yaratmıyor + AR-RTL aynalama bütün. TR tek kaynak; stale içeriğin *kalitesi* kapsam dışı. Üç katman koşulup kaydedildiğinde tamamlanmış sayılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M4-i18n.md` — F4.2 çeviri içerikleri (eksik anahtar vs stale ayrımı), F4.3 RTL
- `_dev/phases/PHASE-3.md` — Araştırma → Dikkat (parite zaten 183/temiz) + TK4 + S6 araç satırı
- `_dev/MEMORY.md` → Süreç Disiplinleri — "anahtar varlığı ≠ değer tazeliği" ayrımı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.04 durumu

---

## Alt Görevler

- [ ] **1. Yapısal parite (node key-diff)**
  - Bir node script ile `messages/{tr,en,ar,de,es}.json` recursive leaf-key setlerini çıkar; 5 dili karşılaştır → eksik/fazla 0 (taban 183). Eksik anahtar = **pazarlık-dışı** hata.

- [ ] **2. Runtime boşluk (5 dil render)**
  - 5 dil home render HTML'de `MISSING_MESSAGE` (next-intl runtime hata string'i — **lib**) grep → 0.

- [ ] **3. TD1-senkron kalemleri**
  - R1 step (`report`/4. adım), R2 gym paneli, F6 hero ikincil CTA değerleri 5 dilde **hizalı** (anahtar var; non-TR değer stale olabilir ama mevcut).

- [ ] **4. Bilinçli-stale tutarlılık gözlemi**
  - non-TR home render'da yarım-çeviri / karışık-dil / görünür kopukluk yok (anahtar var → render bütün). Stale = "eski ama tam cümle" kabul; boşluk/MISSING değil.

- [ ] **5. AR-RTL aynalama (parite bağlamı)**
  - `/ar` home `<html dir="rtl">` + layout mantıksal aynalama bütün (derin degradasyon S3'te; burada parite/render-bütünlük bağlamı).

- [ ] **6. Triyaj (TK6)**

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Key-diff için geçici node script `scratchpad`'de tutulabilir (repo'ya commit edilmez). Bulgular bu task dokümanına. İstisna: eksik anahtar (yapısal) bulunursa → fix-task (5 dile ekle — pazarlık-dışı).

---

## Dikkat Noktaları

- **Parite zaten GREEN** (183 leaf-key, research'te node ile doğrulandı **(repo)**) → ağırlık runtime + tutarlılıkta, yapısal değil. Re-teyit yine de yapılır (regresyon kontrolü).
- **Eksik anahtar ≠ stale değer** (memory Süreç Disiplini): eksik anahtar (yapısal) = pazarlık-dışı runtime boşluk; stale değer = kabul (versiyon-sınırı, TR tek kaynak — ILKELER, DECISIONS dil stratejisi). Ayrımı koru.
- **`MISSING_MESSAGE`** = next-intl runtime string **(lib)** — render'da aranır, JSON'da değil.
- **Ortam:** runtime grep için TASK-3.01 prod serve; key-diff serve gerektirmez (statik JSON). PID fresh teyit (memory).

---

## Test Kriterleri

- [ ] node key-diff: 5 dil leaf-key paritesi temiz (eksik/fazla 0; 183 taban re-teyit).
- [ ] 5 dil render'da `MISSING_MESSAGE` = 0.
- [ ] TD1-senkron 3 kalem (report / gym / CTA) 5 dilde anahtar-hizalı.
- [ ] non-TR home görünür kopukluk yok (bilinçli-stale tutarlı).
- [ ] `/ar` `dir=rtl` + mantıksal aynalama bütün.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** ⬜ Bekliyor

---

**Oluşturulma:** 2026-06-29
