# TASK-18.08: Go-live — GROQ_API_KEY Vercel env + merge v0.5 → main + canlı duman testi

**Durum:** ⬜ Bekliyor
**Modül:** M6-SEO-Deploy (+M5)
**Feature:** C1 (milestone — canlıya alma)
**Faz:** Phase 18 (phases/PHASE-18.md)
**Bağımlılıklar:** TASK-18.07 ✅ (5-dil mühür geçti), TASK-18.04/18.05/18.06 ✅ (kimlik + docs)

---

## Hedef

Groq chatbot'u **canlıya al** — kullanıcı `GROQ_API_KEY`'i Vercel env'e ekler (canlıdan **ÖNCE**; kullanıcı aksiyonu, koda gömülmez), `revize/v0.5-chatbot-groq` → `main` merge edilir (Vercel deploy), **canlı duman testiyle** `/api/chat` 503/offline'ın çözüldüğü + Groq'un yanıt verdiği doğrulanır. Tamamlanma: canlı `/api/chat` Groq stream veriyor (503 değil) + v0.5 kodu `main` ancestor'ı (kanıt-artefaktı).

---

## Bağlam

discuss-phase: **canlıya alma Faz 18 sonunda** (5-dil mühür sonrası). v0.4 zaten canlı (`f173234`) → bu geçiş **incremental** (v0.2'deki "89-commit ilk-production" riski yok; v0.4 emsali: Faz 16 canlı → Faz 17 canlıyı test etti). **Operasyonel sıra kritik:** env **ÖNCE**, sonra merge (yoksa deploy anında canlı 503 penceresi). Sonraki versiyon-sonu fazları (teknik borç + senaryo testi) zaten-canlı Groq chatbot'u üzerinde koşacak.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` — Kapsam: canlıya alma zamanlaması + operasyonel sıra
- `_dev/MEMORY.md` — "canlıda gördüm iddiasını kanıt-artefaktına bağla" disiplini + "Vercel Git-disconnect" tuzağı
- `_dev/docs/RELEASE-v0.4.md` — v0.4 release deseni (canlı duman testi emsali)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet (+ Aktif Versiyon: canlı Groq)
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [ ] **1. Ön-koşul: env (kullanıcı aksiyonu)**
  - Kullanıcı `GROQ_API_KEY`'i Vercel Production (+ Preview) env'e ekler
  - **Bu adım tamamlanmadan merge YAPILMAZ** (durma: bağımlılık). Değer koda/log'a yazılmaz (sır ilkesi)

- [ ] **2. Temiz pencere + merge**
  - `git status` temiz; v0.5 branch push'lu; CI (fast + a11y) yeşil
  - `revize/v0.5-chatbot-groq` → `main` merge + push (Vercel deploy tetikler)

- [ ] **3. Canlı duman testi**
  - Deploy sonrası: canlı `/api/chat` POST → **503 DEĞİL**, Groq stream yanıtı (curl/gerçek istek)
  - Kısa 5-dil canlı gözat (opsiyonel ek doğrulama); yeni-koda-özgü teyit (immutable chunk 200 / route davranışı)
  - **Kanıt-artefaktı** kaydet (MEMORY disiplini): canlı yanıt + `git merge-base --is-ancestor <v0.5 HEAD> origin/main`

---

## Etkilenen Dosyalar

Kod **değişmez** — Vercel env (kullanıcı) + git merge (v0.5 → main) + canlı doğrulama.

---

## Dikkat Noktaları

- **Operasyonel sıra pazarlık dışı:** env **ÖNCE**, merge **SONRA** (yoksa canlı 503 penceresi açılır).
- **`GROQ_API_KEY` değeri koda gömülmez, log/doküman'a yazılmaz** (sır ilkesi); Vercel env'de.
- **Vercel Git-disconnect tuzağı** (MEMORY): merge deploy tetiklemezse Settings → Git reconnect + `--allow-empty` push.
- **"Canlıda çalışıyor" iddiası kanıt-artefaktına bağlanır** (MEMORY Süreç Disiplini): canlı `/api/chat` 200/stream + `git merge-base --is-ancestor <v0.5-sha> origin/main` — yapısal olarak doğrulanamayan bir şeyi "geçmiş-gibi" kaydetme.
- **Free-tier limit** (1.000 RPD): canlı tanıtım trafiği için muhtemelen yeterli; tükenirse Groq 429 → mevcut zarif offline fallback (honest degradation).

---

## Test Kriterleri

- [ ] Canlı `/api/chat` POST → 503 değil; Groq stream yanıtı geliyor (503/offline çözüldü).
- [ ] `git merge-base --is-ancestor <v0.5 HEAD> origin/main` → v0.5 kodu canlıda (kanıt-artefaktı).
- [ ] CI (fast + a11y) merge öncesi yeşil; canlı site regresyonsuz (ana sayfa + chatbot).

---

## Risk ve Geri Dönüş Planı

- **Risk:** env eksikken merge → canlı 503 penceresi → **sıra kuralı (env önce)** bunu önler.
- **Risk:** Groq canlıda beklenmedik hata → mevcut zarif offline fallback devreye girer (site kırılmaz); gerekirse `CHAT_MODEL` / prompt hotfix.
- **Rollback:** `main`'i önceki commit'e revert (v0.4 durumu); ama chatbot yine 503 olur (bilinen eski durum). Vercel env kalıcı kalabilir.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git merge & push yapıldı; canlı doğrulandı
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(run-task oturumunda doldurulacak)_

---

**Oluşturulma:** 2026-07-22
