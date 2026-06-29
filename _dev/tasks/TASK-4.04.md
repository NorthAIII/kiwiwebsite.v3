# TASK-4.04: Cream-on-ink opaklık (color-contrast — A11Y1-c)

**Durum:** ⬜ Bekliyor
**Modül:** M2 (Sayfalar & Bölümler) — F2.5 Crew OS teaser + Footer
**Feature:** A11Y1 (renk kontrastı WCAG AA) — cream-on-ink opaklıklar
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** TASK-4.01 ✅ (teyitli envanter)

---

## Hedef

Koyu (ink) zemin üzerindeki açık (canvas/cream) metinlerin düşük-opaklık varyantlarını WCAG AA'ya getirmek. **Gerçek metin** → opaklık ≥%60 (canvas/60 = 6.71 ✅, küçük metin güvenli eşik); **dekoratif ayraç** → `aria-hidden` (anlam taşımıyor, görünüm korunur). Kapsam (ana sayfa): Footer dil etiketi/telif (`text-canvas/40`, 3.62 ❌), Footer ayraç "·" (`text-canvas/30`, 2.58 ❌ dekoratif), Crew OS panel metrik etiketi (`text-canvas/45`, 4.29 ❌). Tamamlanma: gerçek-metin opaklıkları ≥%60, ayraçlar aria-hidden, build temiz, axe bu öğeleri artık flag'lemiyor, görünüm makul korundu.

---

## Bağlam

Araştırma kararı **K5**. Cream-on-ink öğeleri `--color-ink-faint` token'ından (TASK-4.03) **bağımsızdır** — bunlar `text-canvas/NN` opaklık utility'leri (ink zemininde), token değil. O yüzden ayrı task. Mevcut kontrast oranları (research envanteri): `canvas/40`→3.62, `canvas/30`→2.58, `canvas/45`→4.29 (hepsi 4.5 altı). `canvas/50` (Bunker statusLive, satır 58) = 4.99 ✅ sınırda — dokunma gerekmez ama re-ölçüm flag'lerse %60'a çıkar. `canvas/60`/`/85` zaten geçer (6.7–12.5) — dokunulmaz.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — "Değerlendirilen Yaklaşımlar" A11Y1-c + K5 + Kontrast Envanteri
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.5 Crew OS teaser
- `_dev/QUALITY.md` — §2 Erişilebilirlik, §1 Marka & Craft

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.04 durumu

---

## Alt Görevler

- [ ] **1. Footer gerçek-metin opaklıkları → ≥%60**
  - `src/components/Footer.tsx:97` — dil etiketi `text-canvas/40` → `text-canvas/60` (veya gerekirse /70)
  - `src/components/Footer.tsx:99` — telif `© {year}` `text-canvas/40` → `text-canvas/60`

- [ ] **2. Footer dekoratif ayraçlar → `aria-hidden`**
  - `src/components/Footer.tsx:75,79` — "·" ayraç `<span className="text-canvas/30">·</span>` → `aria-hidden="true"` ekle (saf görsel ayraç, anlam yok; opaklık aynen kalabilir veya görünüm için bırakılır)

- [ ] **3. Crew OS panel metrik etiketi → ≥%60**
  - `src/components/Bunker.tsx:85` — metrik durum etiketi `text-canvas/45` → `text-canvas/60`
  - (`Bunker.tsx:58` `text-canvas/50` = 4.99 sınırda ✅; re-ölçüm/axe flag'lerse aynı şekilde /60'a çıkar — aksi halde dokunma)

- [ ] **4. Doğrula (build + axe + görsel)**
  - `next build` temiz
  - axe ana sayfa (light + dark): Footer + Crew OS panel öğeleri `color-contrast` flag'lemiyor
  - Gözle: Footer ve panel metin hiyerarşisi makul (biraz daha okunur; aşırı parlak değil)

---

## Etkilenen Dosyalar

```
src/components/
├── Footer.tsx   # dil etiketi+telif /40→/60 (L97,99); ayraç "·" aria-hidden (L75,79)
└── Bunker.tsx   # panel metrik etiketi /45→/60 (L85)
```

---

## Dikkat Noktaları

- **Token değil opaklity utility.** Bunlar `text-canvas/NN` (ink zemininde); `--color-ink-faint` (TASK-4.03) ile karışmaz.
- **Gerçek metin vs dekoratif ayrımı:** anlam taşıyan metin opaklık ↑; saf görsel ayraç aria-hidden (K5).
- **`text-canvas/50` (Bunker statusLive)** sınırda geçer (4.99) — gereksiz dokunma; yalnız re-ölçüm/axe flag'lerse /60.
- **Perf/CLS regresyon yok:** yalnız opaklık + aria; layout/asset/JS dokunulmaz.
- **RTL:** Footer/panel layout aynalanır; opaklık/aria değişimi RTL'i etkilemez.
- **Aynı bileşenler alt sayfalarda da var** (BunkerShowcase metrik `text-canvas/45` L203) — bu task **ana sayfa** kapsamlı (Footer + Bunker teaser). BunkerShowcase alt-sayfa derin a11y kapsam dışı (PHASE-4 Kapsam Dışı); ama Footer global → tüm sayfalarda düzelir (bonus).

---

## Test Kriterleri

- [ ] `next build` temiz geçer
- [ ] axe ana sayfa (light + dark): Footer dil etiketi/telif + Crew OS panel metrik `color-contrast` flag'lemiyor
- [ ] Footer ayraçları aria-hidden (axe ayraçları metin olarak değerlendirmiyor)
- [ ] Gözle: Footer + panel hiyerarşisi makul korundu (her iki tema)

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

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-06-29
