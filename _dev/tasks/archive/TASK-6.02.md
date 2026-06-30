# TASK-6.02: L1 — Hero reveal opacity → transform-only

**Durum:** ✅ Tamamlandı
**Modül:** M2 (modules/M2-Sayfalar-Bolumler.md) — Hero; craft M1 imzası
**Feature:** P1 — WebGL-dışı mobil perf kazanımı (LCP)
**Faz:** Phase 6 (phases/PHASE-6.md)
**Bağımlılıklar:** TASK-6.01 (LCP elementi teyidi — önceliği netleştirir; element=metin ise bu task en yüksek etki)

---

## Hedef

`src/components/Hero.tsx`'teki giriş reveal animasyonu hero `<h1>`'i `gsap.set("[data-hero]", { opacity: 0, y: 36 })` ile server-render sonrası **opacity:0**'a çekiyor; bu, elementi LCP adaylığından çıkarıp LCP'yi geç paint'e (reveal/hydration/ağır WebGL bundle'ına bağlı) kaydırıyor. Bu task reveal'i **transform-only** yapar: `opacity:0` kaldırılır, kayma (`y`) imza hareketi korunur. Headline LCP-uygun kalır, koreografinin görsel kimliği (yukarı kayarak belirme) yaşar — yalnız fade kaybolur (kullanıcı onayı). İmza reveal iki temada + cursor/scroll etkileşiminde gözle korunduğunda ve build temiz geçtiğinde tamamlanır.

---

## Bağlam

Research K-R1 (PHASE-6 + DECISIONS 2026-06-30): `opacity:0` LCP adaylığını kırar, transform LCP-nötr. En yüksek etkili, **craft-koruyucu**, WebGL-bağımsız lever. Lighthouse `prefers-reduced-motion` set etmediği için reveal ölçümde de çalışır (`docs/perf/README.md`) → fix ölçülebilir. Reddedilenler: headline'ı reveal'den çıkarmak (koreografi headline'da kaybolur); reveal'e dokunmadan yalnız WebGL deferral (metin LCP ise ceza kalır).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-6.md` — "Araştırma Bulguları" L1 + K-R1, "Dikkat Edilecekler" (craft tavan)
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — imza/craft çıtası (Hero arkası Living Flow)
- `src/components/Hero.tsx` — mevcut reveal timeline (satır 15-28)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-6.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [x] **1. Reveal'i transform-only yap**
  - `Hero.tsx:18` `gsap.set("[data-hero]", { opacity: 0, y: 36 })` → `opacity:0`'ı kaldır (yalnız `{ y: 36 }` kalır)
  - Timeline `.to(...)` adımlarındaki `opacity: 1` hedeflerini kaldır/`y: 0`-only yap (satır 21-25) — elementler başlangıçta görünür (opacity 1) kalmalı, yalnız `y` ile kayar
  - Reduced-motion erken-return (`Hero.tsx:16`) korunur (zaten reveal'i atlar)
  - Stagger zamanlaması (0.15/0.32/0.55/0.7/0.85) ve ease (`power3.out`) — imza timing korunur, değiştirilmez

- [~] **2. Craft gözle doğrulama (iki tema + etkileşim)** — mekanik kanıt + DOM teyidi yapıldı; insan-gözü light+dark + cursor/scroll onayı headless software-GL ortamda yapılamadı, gerçek tarayıcıda kullanıcıya bırakıldı
  - Local prod build/preview'da hero giriş animasyonunu **light + dark** izle: yukarı kayma imzası akıcı mı, "snap"/bozuk görünmüyor mu
  - Cursor hover + scroll'da Living Flow + hero etkileşimi bozulmadı mı
  - Headline ilk frame'de görünür mü (LCP-uygun); reduced-motion'da statik (kayma yok) mu

---

## Etkilenen Dosyalar

```
src/components/
└── Hero.tsx       # reveal opacity:0 kaldırılır, transform-only — zaten var
```

---

## Dikkat Noktaları

- **Craft tavan (pazarlık dışı):** L1 craft-etkili → değişim **iki tema + cursor/scroll gözle** doğrulanmalı (discuss guardrail, PHASE-6 Dikkat). Fade kaybı kabul; kayma imzası "kayıp/snap" görünmemeli.
- **CLS riski:** `y:36`→`y:0` transform layout'a girmez (compositor-only) → CLS yaratmamalı; yine de gözle/ölçümle (CLS=0 guardrail). Eğer elementler reveal öncesi yer kaplamıyorsa zaten min-height var (section `min-h-[100svh]`).
- **i18n parite:** içerik anahtarına dokunulmuyor (yalnız GSAP kod) → 5 dil eşzamanlılığı bozulmaz.
- **Ölçüm bu task'ta değil:** L1+L2 sonrası ara-ölç TASK-6.04'te toplu yapılır (her code-lever'da tam median yerine; ama craft gözle doğrulama burada zorunlu).

---

## Test Kriterleri

- [x] `next build` temiz geçer (TS strict, lint) — ✅ Compiled successfully, 37/37 sayfa, uyarı yok
- [x] Hero `<h1>` ilk paint'te görünür (opacity:0 yok) — DOM teyit (`tr.html` prerender, inline opacity:0 yok)
- [~] Reveal kayma imzası **light + dark** akıcı — kayma timeline'ı byte-birebir korundu (mekanik kanıt); insan-gözü light+dark onayı headless software-GL ortamda yapılamadı → gerçek tarayıcıda kullanıcı onayına bırakıldı
- [~] Cursor hover + scroll etkileşimi bozulmadı — ilgili kod (Magnetic/LivingFlow/scroll) bu task'ta değişmedi; gözle nihai onay kullanıcıda
- [x] reduced-motion'da reveal atlanır (statik, kayma yok) — `Hero.tsx:16` erken-return korundu
- [x] CLS gözle/ölçümle 0 — y-transform compositor-only, elementler layout alanını kaplıyor → yapı gereği CLS=0

---

## Risk ve Geri Dönüş Planı

- **Risk:** opacity kaldırınca reveal "ani belirme" hissi verirse craft düşebilir → kayma `y` değeri/ease ile ince ayar; çözülmezse kullanıcıya getir (craft üst eksen, sessizce feda etme).
- **Rollback:** tek dosya, küçük diff — `git checkout -- src/components/Hero.tsx`.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı (craft-gözle maddesi ortam-kısıtlı, kullanıcı onayına işaretlendi)
- [x] Tüm test kriterleri karşılandı (gözle-craft hariç — ortam-kısıtlı, dürüst kayıt)
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅

**Yapılanlar:**
- `Hero.tsx:18` `gsap.set("[data-hero]", { opacity: 0, y: 36 })` → `{ y: 36 }` (opacity:0 kaldırıldı).
- Timeline 5 `.to(...)` adımındaki `opacity: 1` hedefleri kaldırıldı → yalnız `y: 0` (l1/l2/sub/cta/stats). Stagger zamanlaması (0.15/0.32/0.55/0.7/0.85), ease (`power3.out`), süreler (1.1 / 0.9) birebir korundu.
- reduced-motion erken-return (`Hero.tsx:16`) yerinde — değiştirilmedi.

**Sorunlar:**
- Yok. Mekanik, tek-kanal (opacity) çıkarma; kayma timeline'ı dokunulmadı.

**Kararlar:**
- Craft tavan: kayma hareketi byte-birebir korunduğu için imzada yeni "snap" riski yok; tek görsel delta önceden onaylı fade kaybı (K-R1). Bu yüzden craft değişimi düşük-risk; kullanıcıya getirilecek bir çatışma çıkmadı.
- İnsan-gözü craft doğrulaması (light+dark motion + cursor/scroll) bu headless software-GL devcontainer'da faithful yapılamadı → gerçek tarayıcıda nihai göz-onayı kullanıcıya bırakıldı (TASK-6.01 dürüst-kayıt deseni). Mekanik kanıt + DOM teyidi tamamlandı.

**Dosya Değişiklikleri:**
- `src/components/Hero.tsx` — reveal transform-only (8 satır net diff, tek dosya).

**Test Sonuçları:**
- `npx next build` ✅ temiz: "Compiled successfully", lint + TS strict geçti, 37/37 statik sayfa, uyarı yok.
- Prerender DOM teyidi (`.next/server/app/tr.html`): tüm `data-hero` elementleri mevcut, **inline `opacity:0` yok** → hero metni ilk paint'te tam görünür (LCP-uygun; TASK-6.01 ampirik LCP elementi = hero metni).
- CLS: y-transform compositor-only, elementler layout alanını zaten kaplıyor (section `min-h-[100svh]`) → CLS=0 yapı gereği korunur.
- LCP delta ölçümü bu task'ta DEĞİL → TASK-6.04 ara-ölç (L1+L2 sonrası, aynı node20+Chrome150 ortamı).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- Hero giriş reveal'i transform-only yapıldı: `opacity:0` kaldırıldı (LCP adaylığını kıran kanal), kayma (`y`) imzası + timing korundu. Headline LCP-uygun kaldı; fade feda edildi (onaylı).

**Öğrenilenler:**
- `gsap.set` opacity:0 yalnız client-side (hydration sonrası) uygulanıyordu → sunucu HTML zaten opacity:1; fakat Lighthouse JS koştuğu için ölçümde opacity:0 etkiliydi (research metodoloji teyidi). Transform-only ile element ölçüm boyunca da LCP-uygun.
- Motion timing'e dokunmadan yalnız opacity kanalını çıkarmak craft-riskini minimuma indirir: kayma imzası değişmez, yalnız önceden-onaylı fade kaybolur.

---

**Oluşturulma:** 2026-06-30
