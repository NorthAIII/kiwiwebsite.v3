# TASK-18.07: 5-dil gözle doğrulama (marka mührü gate) — kabul kriteri 4

**Durum:** ⬜ Bekliyor
**Modül:** M5-Chatbot-API
**Feature:** C1 (kabul kriteri 4)
**Faz:** Phase 18 (phases/PHASE-18.md)
**Bağımlılıklar:** TASK-18.03 ✅ (route Groq + prompt), TASK-18.02 ✅ (sanitize)

---

## Hedef

Canlıya almadan ÖNCE, implemente edilmiş route mantığının (nihai `SYSTEM_PROMPT` + `llama-3.3-70b-versatile` + `sanitizeMessages`) 5 dilde (TR/EN/AR/DE/ES) **marka kalibresinde + dürüst** çıktı verdiğini gözle doğrula. Bu, ILKELER üst-eksen **marka mührü** gate'idir — geçmeden go-live (18.08) yapılmaz. Tamamlanma: 5/5 dil marka+dürüstlük kriterlerini geçti, gözlem PHASE-18.md'ye kaydedildi.

---

## Bağlam

**Kabul kriteri 4** — "canlıya almadan 5 dil çıktısı gözle doğrulanır (marka mührü)". DECISIONS 2026-07-21'de karar-öncesi 5-dil canlı test yapıldı; bu task AYNI doğrulamayı **nihai `route.ts` prompt'u + model'iyle** tekrarlar (implementasyon sonrası mühür). **Sandbox tuzağı:** `next start`/`next dev` (+ arka-plan server) exit 144/signal-16 ile öldürülür (MEMORY) → route'u ayağa kaldırmadan, `groq-sdk`'yi test key ile **doğrudan** çağıran **tek-process node harness** kullan (server yok → sandbox öldürmez; API çağrısı olduğu için `page.route` bile gerekmez). Test key repo-dışı `.env.keys.local` (git-ignore `.env*.local`; canlıda kullanılmaz — Vercel env ayrı).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` — Karar C.3 (prompt kriterleri) + Free-tier limitleri
- `_dev/docs/DECISIONS.md` 2026-07-21 — karar-öncesi 5-dil test yöntemi (temsili sorular deseni)
- `src/app/api/chat/route.ts` — nihai `SYSTEM_PROMPT` (import/referans)
- `_dev/MEMORY.md` — sandbox server tuzağı (exit 144) + sır yönetimi (key log'lanmaz)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi durumu + gözle doğrulama gözlem kaydı

---

## Alt Görevler

- [ ] **1. Doğrulama harness'i (geçici)**
  - Proje içinde küçük node script: nihai `SYSTEM_PROMPT` (route.ts'ten import/kopya) + `groq-sdk` + `.env.keys.local` `GROQ_API_KEY` + `sanitizeMessages`
  - 5 dilde temsili ziyaretçi soruları: (a) genel otomasyon kapsamı, (b) **fiyat sorusu** (dürüstlük probu), (c) "Crew OS nedir", (d) "gym otomasyonu"
  - Streaming çıktıyı yazdır (model + system prompt gerçek route ile aynı)

- [ ] **2. Gözle değerlendir** (her dil için)
  - (a) yanıt o dilde mi — TR sorusu → TR yanıt (default TR çalışıyor mu)
  - (b) fiyat/rakam sorusuna **UYDURMA sayı YOK** → keşif görüşmesine yönlendirdi mi (dürüstlük)
  - (c) Crew OS taksonomisi doğru (Bunker OS sızmıyor)
  - (d) marka sesi (sade / çıktı-odaklı / 2-3 cümle)
  - (e) booking sözü yok / e-posta-keşif CTA
  - Bulguları `phases/PHASE-18.md` oturum notuna yaz (dil × kriter özet)

- [ ] **3. Harness temizliği**
  - Geçici script silinir (repo'ya sızmaz); test key **dosyaya/log'a/committe yazılmaz**

---

## Etkilenen Dosyalar

Kalıcı kod değişikliği **yok** — geçici harness (koşturulur, silinir) + gözlem kaydı.

```
(geçici) scratchpad/…            # doğrulama harness'i — koşturulur, silinir
_dev/phases/PHASE-18.md          # gözle doğrulama gözlem kaydı (oturum notu)
```

---

## Dikkat Noktaları

- **Sandbox `next start`/server → exit 144** (MEMORY); harness server**SIZ** düz node + groq-sdk (API çağrısı — statik servis değil, `page.route` gerekmez).
- **Test key `.env.keys.local`'dan okunur; ASLA log/commit/doküman'a yazılmaz** (sır ilkesi).
- **LLM non-deterministik** → tek "assertion" değil, marka-mührü **gözle** değerlendirme (kriter-4; CI'da test edilmez — token/non-determinism/key).
- **Bu gate GEÇMEDEN 18.08 go-live YAPILMAZ;** başarısızsa (bir dil İngilizce'ye düşüyor / rakam uyduruyor) system prompt (18.03) revize edilir → yeniden doğrula.
- **Free-tier limit** (30 RPM / 1.000 RPD) — birkaç soruluk doğrulama bol altında.

---

## Test Kriterleri (gözle mühür)

- [ ] 5/5 dil: yanıt doğru dilde (TR sorusu → TR yanıt; default TR çalışıyor).
- [ ] Fiyat/rakam sorusu: 5/5 dilde **uydurma sayı yok** → keşif görüşmesi/e-posta yönlendirmesi (dürüstlük konvansiyonu).
- [ ] Crew OS taksonomisi doğru (Bunker sızmıyor); marka sesi (sade, 2-3 cümle); booking sözü yok.

---

## Risk ve Geri Dönüş Planı

- **Risk:** gate başarısız (bir dil İngilizce'ye düşüyor / rakam uyduruyor) → system prompt 18.03'e geri dön, düzelt, yeniden doğrula. **go-live bloklanır** (doğru davranış — marka mührü ILKELER üst eksen).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri (gözle mühür) karşılandı
- [ ] Git commit & push yapıldı (gözlem kaydı — kod değişikliği yok)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(run-task oturumunda doldurulacak)_

---

**Oluşturulma:** 2026-07-22
