# TASK-4.04: Cream-on-ink opaklık (color-contrast — A11Y1-c)

**Durum:** ✅ Tamamlandı
**Modül:** M2 (Sayfalar & Bölümler) — F2.5 Crew OS teaser + Footer
**Feature:** A11Y1 (renk kontrastı WCAG AA) — cream-on-ink opaklıklar
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** TASK-4.01 ✅ (teyitli envanter)

---

## Hedef

Koyu (ink) zemin üzerindeki açık (canvas/cream) metinlerin düşük-opaklık varyantlarını WCAG AA'ya **her iki temada** getirmek. **Gerçek metin** → opaklık ≥%60; **dekoratif ayraç** → `aria-hidden` (anlam taşımıyor, görünüm korunur). Kapsam (ana sayfa, TASK-4.01 teyitli — light/dark değerleri): Footer dil etiketi/telif (`text-canvas/40`: light 3.61 ❌ / dark 2.52 ❌), Footer ayraç "·" (`text-canvas/30`, dekoratif), Crew OS panel metrik etiketi (`text-canvas/45`: light 4.1 ❌ / dark 2.83 ❌), **Crew OS panel durum (`text-canvas/50`, "canlı·4 akış"): light 4.99 ✅ / dark 3.36 ❌ — C9, dark-only fail, eklendi**. Tamamlanma: gerçek-metin opaklıkları ≥%60 (her iki tema geçer), ayraçlar aria-hidden, build temiz, axe bu öğeleri **light+dark** artık flag'lemiyor, görünüm makul korundu.

---

## Bağlam

Araştırma kararı **K5** + TASK-4.01 re-ölçüm genişlemesi (C9). Cream-on-ink öğeleri `--color-ink-faint` token'ından (TASK-4.03) **bağımsızdır** — bunlar `text-canvas/NN` opaklık utility'leri (ink zemininde), token değil. O yüzden ayrı task. Kritik: bu öğeler `bg-ink` panellerde; **dark modda panel krem'e döner** (DEV-2), o yüzden bazıları light'ta geçip dark'ta fail eder — gate çift-tema (DEV-1). Teyitli (TASK-4.01): `canvas/40` light 3.61/dark 2.52 ❌, `canvas/45` light 4.1/dark 2.83 ❌, **`canvas/50` (Bunker durum, satır 58) light 4.99 ✅ / dark 3.36 ❌ → C9, artık fix kapsamında** (research "✅ sınırda" demişti, dark'ta fail). `canvas/60`/`/85` zaten geçer (light 6.7–12.5; dark da axe ile teyit) — dokunulmaz.

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

- [x] **1. Footer gerçek-metin opaklıkları → ≥%60**
  - `src/components/Footer.tsx:97` — dil etiketi `text-canvas/40` → `text-canvas/60` ✅ (axe light+dark temiz)
  - `src/components/Footer.tsx:99` — telif `© {year}` `text-canvas/40` → `text-canvas/60` ✅

- [x] **2. Footer dekoratif ayraçlar → `aria-hidden`**
  - `src/components/Footer.tsx:75,79` — "·" ayraç `<span aria-hidden="true" className="text-canvas/30">·</span>` ✅ (opaklık korundu; ayraçlar zaten axe color-contrast'ta görünmüyordu — aria-hidden semantik doğruluk için)

- [x] **3. Crew OS panel metrik etiketi + durum**
  - `src/components/Bunker.tsx:85` — metrik etiketi `text-canvas/45` → **`text-canvas/70`** (C10; /60 dark 4.41 ❌ kaldı → /70'e çıkıldı, plan öngörüsü)
  - `src/components/Bunker.tsx:58` — durum "canlı·N akış" `text-canvas/50` → `text-canvas/60` ✅ (C9; dark 4.61 geçer)
  - **Bulgu:** metrik etiketi `bg-canvas/[0.06]` satır overlay'i üzerinde → dark'ta efektif zemin krem panelden daha koyu (~#e5e4db), /60 = 4.41 (eşik altı); status ise çıplak `bg-ink` panelde /60 = 4.61 geçer. Bu yüzden metrik /70, status /60.

- [x] **4. Doğrula (build + axe + görsel)**
  - `next build` temiz (37 sayfa) ✅
  - axe ana sayfa (light + dark, axe-core 4.11.4): Footer + Crew OS panel öğeleri `color-contrast` flag'lemiyor ✅ (light 0 ihlal; dark kalan 4 ihlal = `text-pulse` → TASK-4.07 kapsamı, bu task değil)
  - Gözle (her iki tema): Footer "Dil/©" + panel "canlı/aktif/sırada" biraz daha okunur, akış adlarından (/85) hâlâ muted; yeşil imza korundu ✅

---

## Etkilenen Dosyalar

```
src/components/
├── Footer.tsx   # dil etiketi+telif /40→/60 (L97,99); ayraç "·" aria-hidden (L75,79)
└── Bunker.tsx   # panel metrik /45→/70 (L85, C10 — overlay satır, /60 dark 4.41 yetmedi); panel durum /50→/60 (L58, C9 dark fail)
```

---

## Dikkat Noktaları

- **Token değil opaklity utility.** Bunlar `text-canvas/NN` (ink zemininde); `--color-ink-faint` (TASK-4.03) ile karışmaz.
- **Gerçek metin vs dekoratif ayrımı:** anlam taşıyan metin opaklık ↑; saf görsel ayraç aria-hidden (K5).
- **`text-canvas/50` (Bunker durum, C9)** light'ta geçer (4.99) ama **dark'ta fail (3.36)** — panel inversion (DEV-2); teyitli olarak /60'a çıkar (dark gate, DEV-1).
- **Dark margin ince:** cream-on-ink /60 dark'ta ~4.5–4.6 (panel krem zemin) — axe-dark her öğeyi teyit et; hâlâ flag'lerse /70.
- **Perf/CLS regresyon yok:** yalnız opaklık + aria; layout/asset/JS dokunulmaz.
- **RTL:** Footer/panel layout aynalanır; opaklık/aria değişimi RTL'i etkilemez.
- **Aynı bileşenler alt sayfalarda da var** (BunkerShowcase metrik `text-canvas/45` L203) — bu task **ana sayfa** kapsamlı (Footer + Bunker teaser). BunkerShowcase alt-sayfa derin a11y kapsam dışı (PHASE-4 Kapsam Dışı); ama Footer global → tüm sayfalarda düzelir (bonus).

---

## Test Kriterleri

- [x] `next build` temiz geçer (37 sayfa, exit 0)
- [x] axe ana sayfa (light + dark): Footer dil etiketi/telif + Crew OS panel metrik (C10) + **Crew OS panel durum (C9, dark)** `color-contrast` flag'lemiyor (light 0 ihlal; dark'ta kalan tüm ihlaller `text-pulse` = TASK-4.07)
- [x] Footer ayraçları aria-hidden (axe ayraçları color-contrast'ta zaten metin olarak değerlendirmiyordu — teyit)
- [x] Gözle: Footer + panel hiyerarşisi makul korundu (her iki tema; panel durum/metrik biraz daha okunur, akış adlarından muted; yeşil imza korundu)

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `Footer.tsx`: dil etiketi (L97) + telif (L99) `text-canvas/40` → `/60`; iki dekoratif "·" ayraç (L75,79) `aria-hidden="true"` aldı (opaklık /30 korundu).
- `Bunker.tsx`: panel durum "canlı · 4 akış" (L58) `text-canvas/50` → `/60` (C9); panel metrik "aktif/sırada" (L85) `text-canvas/45` → **`/70`** (C10). Metrik /60'ta dark'ta hâlâ flag'lendi (4.41) → /70'e çıkıldı.

**Son Yaklaşım:** Cream-on-ink gerçek-metin opaklıkları AA eşiğine (≥%60) çıkarıldı; dekoratif ayraçlar aria-hidden ile semantik olarak işaretlendi. Çift-tema axe (axe-core 4.11.4) ile her öğe teyit edildi. Task tamamlandı — sonraki adım yok.

**Sonraki Adım Detayı:** Yok (task tamam). Faz devam: TASK-4.05 (Hero `<dl>` → semantik markup).

**Sorunlar:**
- **Overlay-zemin tuzağı (icra bulgusu):** Bunker metrik etiketi `bg-canvas/[0.06]` satır overlay'i üzerinde. Dark modda panel `bg-ink` krem'e (#f2f1e8) döner, ama overlay krem'i hafif koyulaştırır (efektif zemin ~#e5e4db). Bu yüzden çıplak panelde geçen `/60` (status 4.61 ✅) overlay satırında geçmez (metrik /60 = 4.41 ❌, eşik altı). Çözüm: metrik /70 (dark 6.09 ✅). Plan bu olasılığı öngörmüştü ("/60 dark flag'lerse /70"). → DEV-2 panel-inversion'ın bir alt katmanı; faz retrosuna aday.
- Playwright npx CJS export tuzağı (TASK-4.03 ile aynı): `import { chromium }` çalışmaz → `import pkg` default + destructure. chromium-1228 full binary'ye `executablePath` pinlendi.

**Kararlar:**
- Status /60'ta bırakıldı (çıplak panel, 4.61 geçer); yalnız overlay üzerindeki metrik /70'e çıkarıldı — her öğe kendi gerçek zemininin minimum-geçen değerinde (gereksiz parlaklık yok, craft).
- Ayraç opaklığı /30 korundu: axe color-contrast'ta zaten flag'lenmiyordu; aria-hidden anlam-taşımayan görsel ayraç için doğru semantik.
- docs/DECISIONS.md'ye eklendi: Hayır (opaklık utility değişimi, kalıcı tasarım-sistemi kararı değil).

**Dosya Değişiklikleri:**
- `src/components/Footer.tsx` → dil/telif /40→/60 (L97,99); ayraç "·" aria-hidden (L75,79)
- `src/components/Bunker.tsx` → panel durum /50→/60 (L58); panel metrik /45→/70 (L85)

**Test Sonuçları:**
- `next build`: temiz (exit 0, 37 sayfa).
- Fresh-prod-serve `:4173` (listening-PID 1627786 teyit = fresh; stray 9077 dokunulmadı). axe-core 4.11.4 + Playwright (reducedMotion:reduce + full-page scroll), `NEXT_LOCALE=tr` cookie, çift-tema:
  - **Light:** color-contrast ihlal node = **0**.
  - **Dark:** 4 ihlal node, **hepsi `text-pulse`** (#8af28a, ratio 1.22): gym-panel adım no 01/02/03 + "Canlı ürünü gör" CTA → **TASK-4.07** kapsamı (C2/C3). Bu task'ın hiçbir öğesi (Footer /60, Bunker status /60 + metrik /70) flag'lenmiyor; eski opaklık (/30,/40,/45,/50) kalmadı.
- **Gözle (ekran görüntüsü, light+dark):** Footer "Dil/©" okunur ama "Kiwi AI Lab"dan muted; panel "canlı/aktif/sırada" okunur, akış adlarından (/85) muted — hiyerarşi + yeşil pulse imza korundu.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- Koyu (ink) zemin üzerindeki açık (cream) düşük-opaklık metinleri WCAG AA'ya **her iki temada** getirildi: Footer dil etiketi/telif `/40→/60`, Crew OS panel durum `/50→/60` (C9 dark fail), panel metrik `/45→/70` (C10). Dekoratif "·" ayraçları aria-hidden. axe ile light 0 ihlal / dark'ta yalnız `text-pulse` (TASK-4.07) kaldı; bu task'ın tüm cream-on-ink öğeleri temizlendi.

**Öğrenilenler:**
- **Yarı-saydam overlay zemin efektif kontrastı düşürür:** `bg-canvas/[N]` overlay'i dark'ta krem paneli koyulaştırdığı için çıplak panelde geçen opaklık (/60) overlay satırında geçmeyebilir (/60 = 4.41 < 4.5). Kontrastı **nominal panel zemini değil, gerçek composite zemin** üzerinden hesapla. DEV-2 (panel-inversion) tuzağının daha ince bir katmanı — faz retrosuna aday.

---

**Oluşturulma:** 2026-06-29
**Son Güncelleme:** 2026-06-30 — run-task TASK-4.04 ✅: cream-on-ink opaklıklar AA'ya (Footer /60, Bunker status /60, metrik /70 overlay-zemin nedeniyle); axe light 0 / dark yalnız text-pulse (4.07). Ayraçlar aria-hidden.
