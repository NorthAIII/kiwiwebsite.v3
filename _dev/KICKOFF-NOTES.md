# KICKOFF-NOTES — v0.5 Re-Kickoff Kararları

> Bu dosya `/devflow:kickoff` (re-kickoff, 2026-07-21) oturumunda alınan kararların kaydıdır.
> Sıradaki oturum `/devflow:kickoff-docs` bunu okuyup dokümanları (VERSIONS, MODULE-MAP, PHASES, DURUM) günceller.
> **Bu oturumda içerik dokümanları değiştirilmedi** — sadece analiz + karar (kickoff kuralı).

**Mod:** Re-kickoff (versiyon geçişi v0.4 → v0.5). Sıfırdan değil.
**Tetik:** prd-review (2026-07-21) — v0.4 versiyon-sonu döngüsü kapandı; biriken tek karar (chatbot sağlayıcı geçişi) sonraki versiyonlara mezun edildi. v0.5 Aktif Versiyon olarak damgalanacak.

---

## 1. Delta — Ne Değişti / Ne Sabit

**Değişmeyen (dokunulmuyor):**
- Vizyon & ürün taksonomisi (Crew OS public / Bunker OS iç ad / Alpfit ayrı ürün) — sağlam, değişmedi.
- Modül haritası M1–M6 — yeni modül yok.
- v0.1–v0.4 tamamlanmış iş birimleri + guardrail'ler (a11y=100 çift-tema · perf tabanı · CLS≈0 · i18n 5-dil parite · marka sesi yasakları) korunur.

**Değişen (v0.5 deltası):**
1. **Aktif Versiyon:** v0.4 ✅ → **v0.5** (re-kickoff/kickoff-docs damgalar — kural 2a: prd-review Aktif Versiyon'u tamamlanan versiyonda bırakır, re-kickoff ilerletir).
2. **v0.5 tanımı:** Chatbot sağlayıcı geçişi (Anthropic Opus → Groq · `llama-3.3-70b-versatile`, $0/kartsız) **+ canlıya alma**. Canlı `/api/chat` 503/offline'ı da çözer. Karar + 5 kabul kriteri kaynağı: **DECISIONS 2026-07-21**.
3. **Env deltası:** `ANTHROPIC_API_KEY` bekleme kalemi **geçersizleşti** → yerine `GROQ_API_KEY` (Vercel env; koda gömülmez — sır yönetimi ilkesi korunur).

---

## 2. Modül Yapısı (değişiklik yok)

- **Merkez:** M5 (Chatbot & API) — `route.ts` + system prompt.
- **Temas:** M4 (TR-birincil dil algılama, system prompt dil listesi) · OVERVIEW stack satırı · env (M6 sınırı).
- Yeni modül veya modül-yeniden-yapılandırması **yok**.

**Feature → Versiyon (kickoff-docs VERSIONS.md + MODULE-MAP.md'ye ekler):**

> `C1: Chatbot sağlayıcı geçişi (Anthropic Opus → Groq/llama-3.3-70b) + canlıya alma` → M5 (+M4, OVERVIEW stack) → **v0.5**

---

## 3. Fazlar

Faz numarası verilmez (just-in-time — faza girince = mevcut en büyük + 1 = **Faz 18**). kickoff-docs bunları **Sıradaki Fazlar**'a (numarasız) yazar.

### İçerik fazı: "v0.5 Chatbot Groq geçişi + canlıya alma"

**Kapsam (kullanıcı onaylı, bu oturum):**
- `route.ts` Groq'a geçer (`GROQ_API_KEY`; OpenAI-uyumlu / `@ai-sdk/groq`); streaming + sanitizasyon + zarif offline fallback **korunur**.
- System prompt: **TR-birincil dil algılama** (varsayılan İngilizce değil; TR dahil 5 dil listelenir).
- System prompt: **"asla fiyat/rakam uydurma"** kuralı (dürüstlük konvansiyonu sağlamlaştırması; ILKELER üst eksen).
- **Hardening: chatbot per-mesaj max-byte cap** → **bu içerik fazına dahil** (kullanıcı kararı; route.ts'e zaten dokunuluyor, tek dokunuş).
- **Canlıya alma bu içerik fazında** (kullanıcı kararı): 5 dil çıktısı gözle doğrulanır (marka mührü) + build temiz → merge + deploy → canlı 503 kapanır.
- Doküman güncelleme: `M5-Chatbot-API.md` + OVERVIEW stack satırı **bu implementasyon fazında** güncellenir (şimdi değil — kod↔doküman drift'ini önlemek için, DECISIONS 2026-07-21 gereği).

**Milestone (DECISIONS 2026-07-21'in 5 kabul kriteri):**
1. `route.ts` Groq'a geçer, streaming/sanitizasyon/offline fallback korunur.
2. System prompt TR-birincil dil algılama.
3. System prompt "fiyat/rakam uydurma" yasağı.
4. Canlıya almadan 5 dil çıktısı gözle doğrulanır.
5. `M5-Chatbot-API.md` + OVERVIEW stack satırı güncellenir.
(+ hardening max-byte cap ve canlı deploy = bu fazın parçası.)

### Versiyon-sonu sabit fazlar (just-in-time, şimdi taslaklanmaz)

Versiyon Sonu Kuralı gereği içerik fazı bitince sırasıyla: (1) Teknik Borç Kapatma, (2) Senaryo Testi → sonra zorunlu prd-review. Bunlar discuss-phase promote eder; şimdi numaralanmaz/kapsamlanmaz.

---

## 4. Açık Kalemler / Bağımlılıklar (v0.5 planlamasına taşınacak)

- **Operasyonel bağımlılık:** Canlıya alma için `GROQ_API_KEY` Vercel env'e eklenmeli (kullanıcı aksiyonu). Groq hesabı/key mevcut mu teyit edilmeli. Test key repo-dışı `.env.keys.local`'da (git-ignore; canlı deploy'da kullanılmaz — Vercel env ayrı).
- **`main` merge finalizasyonu:** `revize/v0.4-versiyon-sonu` → `main` (doc-only; v0.4 kodu zaten canlı) — v0.5 branch'i açmadan önce ele alınacak temizlik.
- **Kapsam dışı, sonraki aday olarak kalan** (v0.5'e katılmaz):
  - v0.6 = booking + takvim (tool/function calling + PII/spam; ayrı/büyük iş).
  - Çeviri senkronu (non-TR + AR alt sayfa + alpfit stale-TR; ziyaretçi-görünür) + AR-dil stratejisi — numarasız aday.
  - BULGU-S3 craft cila (alt-sayfa masaüstü imza alanı) — numarasız aday.
  - Sahipli teknik açıklar: TB-3 runtime tohumu · brief mobil perf · npm audit (2 moderate).

---

## 5. Projeye Özgü Doküman İhtiyacı

Yeni sabit doküman (STYLE-GUIDE/TECH-STACK vb.) **gerekmiyor** — v0.5 mevcut M5 + stack üstüne cerrahi. Güncellenecekler zaten kayıtlı (M5, OVERVIEW stack — implementasyon fazında).

---

**Sıradaki adım:** `/devflow:kickoff-docs` — bu kararları VERSIONS.md + MODULE-MAP.md (C1 satırı) + PHASES.md (Sıradaki Fazlar) + DURUM.md (Aktif Versiyon v0.5) + OVERVIEW doküman-yapısına yansıtır. (M5 içerik + OVERVIEW stack satırı implementasyon fazına ertelenir.)
