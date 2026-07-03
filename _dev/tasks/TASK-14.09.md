# TASK-14.09: S9 — Adversarial / Holistik Kırma

**Durum:** ⬜ Bekliyor
**Modül:** Tümü (M1–M6) — holistik/adversarial
**Feature:** S9 senaryo grubu — adversarial/holistik — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.08 ✅ (faz son doğrulama task'ı; tüm katman zeminleri hazır)

---

## Hedef

Sitenin adversarial/holistik kırılganlığını doğrula: **JS-kapalı SSG okunabilirlik** (ana sayfa + 5 alt sayfa curl — h1/nav/metin var), **hızlı dil/tema toggle race** (system Chrome — tutarlılık kaybolmuyor), **hızlı scroll/anchor zıplama** (**sayfa-boyu nabız + ScrollTrigger kararlılığı** — v0.3 delta), `next build` **temiz** + **0 MISSING_MESSAGE** (regresyon tabanı), canonical/redirect tohumu yeşil (S8 çapraz-teyit). Tamamlanma = adversarial matris koşuldu, ground-truth (served==disk prerender, stale-server yok) teyitli, sonuç kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S9 satırı (`next build` katman A + system Chrome race katman C; JS-kapalı SSG, hızlı toggle/scroll); Sahipsiz Alan → sayfa-boyu nabız + ScrollTrigger kararlılığı
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — race için WebGL system Chrome (`channel:'chrome'`+swiftshader)
- `_dev/MEMORY.md` → stray/stale `next-server` (served==disk prerender ground-truth); locale/tema tuzağı
- `src/components/living-flow/`, ScrollTrigger/Lenis kullanımı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.09 durumu + S9 bulgu notu

---

## Alt Görevler

- [ ] **1. `next build` temiz + 0 MISSING_MESSAGE (regresyon tabanı)**
  - `npm run build` **temiz** (tüm sayfa SSG, 0 error/warn); build + render 30 page-locale'de **0 MISSING_MESSAGE**
  - Ground-truth: served (:3000) == disk prerender (`.next/server/app/*.html`) — stray/stale server yok (memory)

- [ ] **2. JS-kapalı SSG okunabilirlik**
  - 6 sayfa curl (JS yok): h1 + nav + anlamlı metin var (yeterli char); LivingFlow client-only markup'ta yok = **beklenen** (bug değil), SSG içerik okunur kalır

- [ ] **3. Hızlı dil/tema toggle race (system Chrome)**
  - Tema 10+ hızlı tık → `html.dark` == localStorage == aria-pressed + reload kalıcı (yarış-koşulu tutarsızlığı yok)
  - Dil zinciri (en→de→ar→es→tr→final) tutarlı (lang==url, AR dir=rtl); ara-durumda bozulma yok

- [ ] **4. Hızlı scroll/anchor storm (sayfa-boyu nabız + ScrollTrigger — v0.3 delta)**
  - Hızlı scroll + anchor zıplama → 6 bölüm sağlam, anchor settle, **sayfa-boyu nabız + ScrollTrigger kararlı** (pin/scrub kilidi yok, 0 ScrollTrigger hatası) — v0.3 nabzı tüm sayfaya taşıdı → scroll storm altında context/veil kararlılığı asıl yeni test
  - WebGL system Chrome (`channel:'chrome'`+swiftshader; bundled 0 canvas → nabız görünmez)

- [ ] **5. Triyaj & kayıt**
  - Kapsam-içi bug (MISSING_MESSAGE, JS-off boş sayfa, race tutarsızlığı, ScrollTrigger hatası, nabız çökmesi) → düzeltme task'ı önerisi
  - Faz son task'ı: tüm S1–S9 triyajının bütünsel özeti + verify-phase'e hazırlık notu

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Harness geçici. YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-14.09.md          # Oturum kaydı + S9 adversarial matris
├── phases/PHASE-14.md           # Task Listesi 14.09 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **Sayfa-boyu nabız + ScrollTrigger (v0.3 kritik):** Faz 12 nabzı tüm sayfaya taşıdı → hızlı scroll/anchor storm altında tek WebGL context + ScrollTrigger + Lenis birlikte kararlı mı asıl yeni adversarial yüzey. Bundled chromium **kullanma** (nabız görünmez → ayırt-edici değil); system Chrome şart.
- **Ground-truth (memory):** served == disk prerender teyit (stray `next-server` eski build sunabilir → yanlış negatif). Listening-PID + disk prerender kıyası.
- **JS-off LivingFlow yokluğu beklenen:** curl'de LivingFlow client-only → markup'ta yok = bug değil; SSG **metin içeriği** okunur olmalı (asıl kriter).
- **Race tuzağı:** hızlı toggle'da ara-durum flash olabilir — asıl kriter **final tutarlılık** (html.dark==localStorage==url). Ara-frame'i bug sanma.

---

## Test Kriterleri

- [ ] `next build` temiz (0 error/warn, tüm SSG) + build+render 0 MISSING_MESSAGE; served==disk prerender
- [ ] JS-kapalı 6 sayfa SSG okunur (h1+nav+metin); LivingFlow yokluğu beklenen (bug değil)
- [ ] Tema race 10+ tık → final tutarlı + reload kalıcı; dil zinciri tutarlı (lang==url, AR rtl)
- [ ] Scroll/anchor storm → 6 bölüm sağlam + sayfa-boyu nabız/ScrollTrigger kararlı (0 hata, pin/scrub kilidi yok)
- [ ] Bulgular triyajlı + bütünsel S1–S9 özeti PHASE-14 + task doc'a (verify-phase hazırlık)

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldur]

**Bulgular / Triyaj:**
- [Adversarial matris; kapsam-içi bug var/yok; bütünsel S1–S9 özeti]

**Kaynak kod değişmedi** (doğrulama fazı).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
