# TASK-18.07: 5-dil gözle doğrulama (marka mührü gate) — kabul kriteri 4

**Durum:** ✅ Tamamlandı
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

- [x] **1. Doğrulama harness'i (geçici)**
  - Serversiz node harness (scratchpad, `.mjs`): `SYSTEM_PROMPT`+`MODEL`+`temperature` **route.ts'ten runtime regex ile çıkarıldı** (sıfır drift) + `groq-sdk` (absolute path) + `.env.keys.local` `GROQ_API_KEY` + **gerçek** `sanitizeMessages` (Node 24 type-strip import) + mekanik garble (CJK/Hangul/Kiril/Kana) dedektörü
  - 5 dil × 4 temsili soru: (a) genel, (b) **fiyat** (dürüstlük probu), (c) "Crew OS nedir", (d) "gym otomasyonu"; streaming çıktı route.ts ile birebir (system=messages[0], delta=choices[0].delta.content)

- [x] **2. Gözle değerlendir** (her dil için — 2 tam koşu, iki kez)
  - (a) doğru dil ✅ 5/5 · (b) uydurma rakam yok → keşif CTA ✅ 5/5 · (c) Crew OS taksonomi (Bunker yok) ✅ 5/5 · (d) marka sesi ✅ · (e) booking yok / e-posta-keşif CTA ✅
  - Bulgular `phases/PHASE-18.md` → **Gözle Doğrulama** bölümüne yazıldı (dil × kriter tablosu + 1. koşu başarısızlığı + remediation)

- [x] **3. Harness temizliği**
  - Geçici scriptler (verify-5lang.mjs + diag-temp.mjs) scratchpad'de koşturuldu + **silindi** (repo'ya sızmadı); test key **hiçbir dosya/log/committe yazılmadı** (yalnız "maskeli" basıldı; key-prefix taraması scratchpad'de 0 eşleşme)

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

- [x] 5/5 dil: yanıt doğru dilde — sertleştirme sonrası 2 koşu reprodüktif; EN Crew OS + gym artık İngilizce (1. koşuda TR/Korece'ye düşüyordu).
- [x] Fiyat/rakam sorusu: 5/5 dilde **uydurma sayı yok** → keşif görüşmesi/e-posta yönlendirmesi (her koşuda sağlam).
- [x] Crew OS taksonomisi doğru (Bunker sızmadı); marka sesi (sade, 2-3 cümle); booking sözü yok; mekanik garble 0/20.

---

## Risk ve Geri Dönüş Planı

- **Risk:** gate başarısız (bir dil İngilizce'ye düşüyor / rakam uyduruyor) → system prompt 18.03'e geri dön, düzelt, yeniden doğrula. **go-live bloklanır** (doğru davranış — marka mührü ILKELER üst eksen).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri (gözle mühür) karşılandı
- [x] Git commit & push yapıldı (gözlem kaydı + `route.ts` prompt sertleştirme — gate remediation; kod değişikliği OLDU)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum 1 — 2026-07-22 (run-task)

**Yapılanlar:**
- Serversiz node harness kuruldu (scratchpad `.mjs`): route.ts'ten SYSTEM_PROMPT+MODEL+temperature runtime çıkarımı (sıfır drift), gerçek `sanitizeMessages` (Node 24 type-strip import), groq-sdk absolute-path, `.env.keys.local` key (maskeli), mekanik garble dedektörü. Sandbox exit-144 tuzağı atlandı (server yok).
- **1. gate koşusu (mevcut prompt) — ❌ reprodüktif başarısız** (2 tam koşu): EN soruları TR/Korece'ye düşüyor (gym 4/4 TR, Crew OS 1 koşuda Korece) + TR/EN/AR'de çok-dilli script bozulması (CJK/Hangul/Kiril/Vietnamca). Dürüstlük 5/5 + taksonomi 5/5 yine de sağlamdı.
- Temperature teşhisi: temp=0.3 EN→TR düşüşünü **çözmedi** → dil-düşüşü prompt kaynaklı. Bulgu kullanıcıya sunuldu (AskUserQuestion).
- **Remediation (kullanıcı: "prompt sertleştir + yeniden koş"):** `route.ts` SYSTEM_PROMPT dil kuralı sertleştirildi ("son mesajın dilinde yanıtla + tek dil/script + başka dil karıştırma yok + yalnız gerçekten belirsizse TR"; "Default to Turkish if unclear" kaldırıldı) + `temperature: 0.2` eklendi.
- **2.+3. koşu (sertleştirme sonrası) — ✅ reprodüktif GREEN:** garble 0/20, dil sadakati 5/5 (EN Crew OS+gym İngilizce'ye döndü), dürüstlük 5/5, taksonomi 5/5, booking yok.
- Test: `next build` temiz + Vitest 52/52. Harness'ler silindi; key hiçbir yere yazılmadı.

**Sonuç:** Kabul kriteri 4 ✅ (marka mührü). Kalıcı kod değişikliği: `route.ts` (prompt dil kuralı + temperature — gate remediation). Artık 2 küçük craft lekesi kayıtlı (bloke değil): TR "observable ve measured" yankısı + nadir tek token.

**Son Yaklaşım:** Gate GREEN, task tamamlandı. `route.ts` + `phases/PHASE-18.md` (Gözle Doğrulama bölümü) + `DECISIONS.md` (2026-07-22) + DURUM güncellendi, commit.

**Sonraki Adım Detayı:** TASK-18.08 (go-live) — kullanıcı `GROQ_API_KEY`'i Vercel env'e ekler (canlıya-almadan ÖNCE), sonra `revize/v0.5-chatbot-groq` → `main` merge + canlı duman testi (`/api/chat` 503/offline çözülür). Kritik kapı 18.07 ✅ geçildi.

---

**Oluşturulma:** 2026-07-22
