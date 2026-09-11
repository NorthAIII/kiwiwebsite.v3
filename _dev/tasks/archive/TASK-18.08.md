# TASK-18.08: Go-live — GROQ_API_KEY Vercel env + merge v0.5 → main + canlı duman testi

**Durum:** ✅ Tamamlandı
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

- [x] **1. Ön-koşul: env (kullanıcı aksiyonu)**
  - Kullanıcı `GROQ_API_KEY`'i Vercel Production (+ Preview) env'e ekler
  - **Bu adım tamamlanmadan merge YAPILMAZ** (durma: bağımlılık). Değer koda/log'a yazılmaz (sır ilkesi)

- [x] **2. Temiz pencere + merge**
  - `git status` temiz; v0.5 branch push'lu; CI (fast + a11y) yeşil
  - `revize/v0.5-chatbot-groq` → `main` merge + push (Vercel deploy tetikler)

- [x] **3. Canlı duman testi**
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

- [x] Canlı `/api/chat` POST → 503 değil; Groq stream yanıtı geliyor (503/offline çözüldü). **İki canlı arıza teşhis edilip düzeltildikten sonra** — aşağıya bak.
- [x] `git merge-base --is-ancestor` → v0.5 HEAD (`3a48bca`) **ve** go-live fix (`3699f57`) `origin/main` ataşı ✓.
- [x] `next build` temiz + Vitest 52/52; canlı 8 sayfa/locale 200, AR RTL ✓, regresyon yok.

---

## Risk ve Geri Dönüş Planı

- **Risk:** env eksikken merge → canlı 503 penceresi → **sıra kuralı (env önce)** bunu önler.
- **Risk:** Groq canlıda beklenmedik hata → mevcut zarif offline fallback devreye girer (site kırılmaz); gerekirse `CHAT_MODEL` / prompt hotfix.
- **Rollback:** `main`'i önceki commit'e revert (v0.4 durumu); ama chatbot yine 503 olur (bilinen eski durum). Vercel env kalıcı kalabilir.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git merge & push yapıldı; canlı doğrulandı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-09-11

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Devralınan boşluk kapatıldı.** Oturum başında git durumu, 18.08'in alt görev 1-2'sinin 2026-07-22'de yapılmış ama **dokümante edilmemiş** olduğunu gösterdi (`main` = `275323a`, v0.5 ataş). Canlı kontrol: `/api/chat` → **503 "Chat provider is not configured."** `vercel env ls` belirleyici oldu — projede **sıfır** env variable. Temmuzdaki "trigger redeploy to pick up GROQ_API_KEY env" boş commit'i anahtar eklenmeden atılmış. Durma koşulu (bağımlılık) uygulandı, kullanıcıya soruldu.
- **Alt görev 1 (env):** Kullanıcı `GROQ_API_KEY`'i Vercel panelinden **Production**'a ekledi (Secret). `vercel env ls` ile doğrulandı. Değer hiçbir dosyaya/log'a/committe yazılmadı.
- **Redeploy:** Vercel env'i deploy anında enjekte ettiği için mevcut deploy anahtarı görmüyordu → `vercel redeploy` ile production yeniden deploy edildi, `kiwiailab.com` alias'landı.
- **Alt görev 3 (duman testi) — iki canlı arıza teşhis edildi.** Detaylı anlatım → `phases/PHASE-18.md` → **Go-live** bölümü. Özet: (1) `404 model_not_found` — Groq `llama-3.3-70b-versatile`'ı emekliye ayırmış; model yeniden seçildi. (2) `429` OTPM 1000 < talep 1024 — `max_tokens` peşin rezerve ediliyor; 512'ye indirildi.
- **Model yeniden seçimi kanıtla yapıldı.** 18.07'nin marka mührü harness'i adaylara yeniden koşuldu (5 dil × 3 soru, route.ts'ten runtime çıkarılan prompt/parametreler). `qwen/qwen3.8-27b` temiz geçti; `openai/gpt-oss-120b` temmuzdaki dürüstlük ihlalini sertleştirilmiş prompt altında tekrarladı → eleme kriteri ikinci kez uygulandı.
- **Canlı doğrulama:** 5 dilde gerçek `kiwiailab.com/api/chat` yanıtı alındı; 8 sayfa/locale 200; AR RTL ✓; ataş kanıtı `git merge-base`.

**Sorunlar:**
- **Env hiç eklenmemişti (devralınan):** `vercel env ls` ile kesin teşhis; kullanıcı panelden ekledi.
- **Model emekli olmuş (404):** Yerel kapıların hiçbiri yakalamadı (`next build` temiz, Vitest 52/52, curl **200** — hata stream-içi fallback'e dönüştüğü için). `vercel logs` tek belirleyici kanıt oldu. Model `qwen/qwen3.8-27b` ile değiştirildi.
- **OTPM limiti (429):** İlk düzeltmeden sonra **ikinci ve farklı** bir arıza çıktı; yine yalnız runtime log'unda görünüyordu. `max_tokens` 1024→512.
- **Küçük craft lekesi:** TR gym yanıtında seyrek tekrar ("doğum günü ve doğum günü sonrası"). Bloke değil, kayıtlı.

**Kararlar:**
- **Model `llama-3.3-70b-versatile` → `qwen/qwen3.8-27b`** (kullanıcı onaylı, AskUserQuestion): kapıyı temiz geçen tek aday; sağlayıcı/SDK/streaming sözleşmesi/prompt/`temperature`/`CHAT_MODEL` deseni korundu. → docs/DECISIONS.md'ye eklendi: **Evet** (2026-09-11).
- **`max_tokens: 1024 → 512`** (zorunlu, C.6 sapması): OTPM limiti 1000, `max_tokens` peşin rezerve ediliyor. Gerekçe çağrı yerine yorum olarak yazıldı. → docs/DECISIONS.md'ye eklendi: **Evet** (aynı kayıt içinde).
- **`OVERVIEW.md` güncellendi** (Korumalı → kullanıcı onayı alındı): stack satırı model adı + "Groq/Llama" ifadeleri model ailesinden arındırıldı ("Groq") → tekrar bayatlamaz.
- **Eski eleme kör tekrarlanmadı:** `gpt-oss` yeniden sınandı; sonuç değişmedi ama karar artık taze kanıta dayanıyor.

**Kalan İşler:**
- Yok (task kapsamı tamam). Faz kapsamı dışı takipler DURUM'da.

**Son Yaklaşım:** Task tamamlandı; pause/devam durumu yok.

**Sonraki Adım Detayı:** Fazdaki 8 task da tamam → `/devflow:verify-phase 18` (yeni oturum).

**Dosya Değişiklikleri:**
- `src/app/api/chat/route.ts` → varsayılan model `qwen/qwen3.8-27b`; `max_tokens` 1024→512 + gerekçe yorumu
- `.env.example` · `README.md` → `CHAT_MODEL` varsayılanı hizalandı
- `_dev/OVERVIEW.md` (Korumalı, onaylı) · `_dev/modules/M5-Chatbot-API.md` · `_dev/MEMORY.md` · `_dev/PHASES.md` · `_dev/MODULE-MAP.md` · `_dev/PRD/VERSIONS.md` → model adı + kota notu
- `_dev/docs/DECISIONS.md` → 2026-09-11 kararı (model + max_tokens + canlı doğrulama)
- `_dev/memory/groq-model-emekliligi-runtime-404.md` → **yeni** öğrenim + MEMORY.md index pointer'ı
- `_dev/phases/PHASE-18.md` → **Go-live** bölümü; C.5/C.6 ve araştırma model satırına gerçeklik pointer'ı

**Test Sonuçları:**
- `next build` → **temiz**, 37 sayfa üretildi (kapsam: tüm route'lar; LLM çağrısı build'de koşmaz).
- `npx vitest run` → **52/52 geçti** (kapsam: saf mantık + i18n parite + build-artefaktı redirect testleri; **LLM çıktısı CI'da test edilmez** — bilinçli, DECISIONS 2026-07-21).
- **Canlı duman testi** (kapsam: gerçek `kiwiailab.com/api/chat`, 5 dil × 1 temsili soru + TR fiyat-dürüstlük probu): 5/5 doğru dil, marka sesi, 0 `Bunker` sızıntısı, 0 uydurma rakam, booking sözü yok.
- **Model seçim kapısı** (kapsam: `.env.keys.local` test anahtarıyla serversiz node harness, 5 dil × 3 soru × 2 model): `qwen3.8-27b` dil 15/15 · garble 0/15 · dürüstlük 0 ihlal; `gpt-oss-120b` dürüstlük **2 ihlal**.
- **Canlı regresyon** (kapsam: HTTP durum + RTL işareti; görsel/tema/WebGL **kapsam dışı**): 8/8 sayfa 200, AR `dir="rtl"` ✓.
- Harness'ler silindi; test anahtarı hiçbir yere yazılmadı.

---

**Oluşturulma:** 2026-07-22
