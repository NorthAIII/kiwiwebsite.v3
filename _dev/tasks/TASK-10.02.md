# TASK-10.02: Footer'da `<Logo>` benimseme

**Durum:** ⬜ Bekliyor
**Modül:** M3 — Etkileşim & UX Primitives (marka lockup) + M1 (token)
**Feature:** A1 — Logo/marka işareti hizalama
**Faz:** Phase 10 (phases/PHASE-10.md)
**Bağımlılıklar:** TASK-10.01 ✅ (`<Logo>` bileşeni)

---

## Hedef

Footer'daki mark + wordmark lockup'ını (`Footer.tsx:72-74`) TASK-10.01'de oluşturulan ortak `<Logo>` bileşenine geçir. Footer lockup'ı Nav/PageHeader'dan **farklı**: `size 18`, wordmark `font-medium` + `text-canvas` (koyu `bg-ink` üstünde), ve **link değil** — meta satırının başındaki görsel etiket (`·` ayraç + email + sosyal ikonlar takip eder). A1 kök nedeni (3 kopya) böylece tamamen kapanır: her yüzey `<Logo>` tüketir. Tamamlanma: Footer `<Logo>` kullanıyor, koyu zeminde hizalı/okunur, non-link kompozisyon korundu, build temiz, çift-tema görsel doğrulama geçti.

---

## Bağlam

TASK-10.01 `<Logo>`'yu oluşturup Nav/PageHeader'da benimsedi. Footer üçüncü ve son yüzey; farklı kompozisyonu (boyut/ağırlık/renk/non-link) `<Logo>`'nun prop esnekliğiyle karşılanır. Footer lockup'ı `bg-ink text-canvas` footer'ının içinde: mark `text-green` (adaptif), wordmark koyu zeminde `text-canvas`. `<Logo>` wordmark rengini `currentColor` mirasına bıraktıysa Footer'ın çevre `text-canvas`'ı otomatik uygular; boyut/ağırlık prop ile geçilir.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/tasks/archive/TASK-10.01.md` — `<Logo>` prop API'si ve optik hiza çözümü
- `src/components/Logo.tsx` — bileşen imzası (10.01'de oluştu)
- `_dev/phases/PHASE-10.md` — Araştırma Bulguları (A1 Footer yüzeyi: size 18, `text-canvas` wordmark)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + son task özeti
- `_dev/phases/PHASE-10.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [ ] **1. Footer lockup'ını `<Logo>` ile değiştir**
  - Dosya: `src/components/Footer.tsx`
  - `Footer.tsx:72-74` — `<KiwiMark size={18} className="text-green" /> + <span className="font-medium text-canvas">Kiwi AI Lab</span>` yerine `<Logo size={18} ... />`. Wordmark ağırlığı `font-medium` ve rengi `text-canvas` (koyu zemin) korunmalı — `<Logo>`'ya uygun prop/className ile geçir.
  - Lockup **non-link** kalır: onu bir `<a>`/`<Link>` içine alma. Saran `<div className="flex flex-wrap items-center gap-x-3 gap-y-2">` ve takip eden `·`/email/sosyal öğeler aynen kalır.
  - Gerekirse `<Logo>`'ya Footer farkı için küçük genişletme yap (örn. wordmark className passthrough); bileşenin Nav/PageHeader davranışını bozmadığını doğrula.

- [ ] **2. Import temizliği**
  - `Footer.tsx` — `KiwiMark` import'u artık kullanılmıyorsa kaldır, `Logo` import'u ekle.

---

## Etkilenen Dosyalar

```
src/components/
├── Footer.tsx   # lockup (satır 72-74) → <Logo size={18}>, import temizliği
└── Logo.tsx     # (gerekirse) Footer farkı için küçük prop/className genişletmesi
```

---

## Dikkat Noktaları

- **Non-link korunur:** Footer marka etiketi tıklanabilir DEĞİL (Nav/PageHeader'dan farkı budur). `<Logo>`'yu link'e sarma; meta satırındaki konumu ve `·` ayraç akışını bozma.
- **Koyu zemin okunurluğu:** Footer `bg-ink text-canvas`. Wordmark `text-canvas` kalmalı (mark `text-green` adaptif token). Hem light hem dark temada footer koyu zemini korur — mark+wordmark her iki temada okunur/hizalı doğrulanır.
- **Optik hiza tutarlılığı:** 10.01'de çözülen optik hiza `size 18`'de de tutmalı (mark ölçeklenince nudge orantılı kalmalı — `<Logo>` içindeki çözüm boyuttan bağımsız çalışmalı; değilse görsel doğrula).
- **`<Logo>` regresyon yok:** Footer için yapılan genişletme Nav/PageHeader (size 22) görünümünü değiştirmemeli — üç yüzey de kontrol edilir.
- **CLS≈0:** Boyut/metrik değişmediği için layout shift yok.

---

## Test Kriterleri

- [ ] `npm run build` temiz geçer (import temizliği + TS strict).
- [ ] Footer marka lockup'ı `bg-ink` üstünde mark + wordmark **hizalı ve okunur** (light + dark iki tema gözle).
- [ ] Footer lockup'ı **tıklanabilir değil** (davranış korundu); `·`/email/sosyal ikon akışı bozulmadı.
- [ ] Nav (size 22) ve PageHeader (size 22) logoları TASK-10.01 sonrası görünümle **aynı** kaldı (regresyon yok).
- [ ] `/` a11y regresyon tohumu (`home-a11y.spec.ts`, axe WCAG-AA) light+dark 0 ihlal (araç zinciri mevcutsa koş).
- [ ] Footer lockup boyutu/konumu değişmedi (CLS yok).

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

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-02 (plan-phase 10)
