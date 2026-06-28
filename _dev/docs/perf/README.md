# Perf Taban Kayıtları — Ana Sayfa Lighthouse

Ana sayfa (`/`, TR varsayılan) Lighthouse perf/a11y tabanları. Ölçüm **yerel production build** üzerinde (`next build && next start`); revize branch canlıya deploy olmuyor (kiwiailab.com eski kodu yansıtır) → bu "yerel taban". İlk taban: **v0.1, 2026-06-28** (TASK-2.03 / Phase 2).

Kanonik artefaktlar: `home-mobile-20260628.{html,json}` · `home-desktop-20260628.{html,json}`.

---

## v0.1 Tabanı (2026-06-28)

### Özet Skorlar (temsilî / median)

| Metrik | Brief Bütçesi | Masaüstü | Mobil | Verdi |
|--------|---------------|----------|-------|-------|
| Performance | ≥ 95 | **100** | **87** | Masaüstü ✅ · Mobil ❌ (−8) |
| Accessibility | ≥ 100 | **89** | **89** | ❌ her iki preset (−11) |
| LCP | < 2.5 s | **0.69 s** | **3.1 s** | Masaüstü ✅ · Mobil ❌ (+0.6 s) |
| CLS | ~ 0 (near-zero) | **0.000** | **0.000** | ✅ her iki preset |
| Best Practices | (briefte yok) | 100 | 100 | — kayıt |
| SEO | (briefte yok) | 92 | 92 | — kayıt |

**Bütçe verdiği: KARŞILANMADI.** Masaüstü 3/3 bütçe metriğini geçer; mobil yalnız CLS'yi geçer (perf 87 < 95, LCP 3.1 s > 2.5 s). Accessibility **her iki preset'te 89 < 100** — ortamdan bağımsız, en güvenilir sinyal. → Bulgu kullanıcıya getirildi (aşağıda Karar). Optimizasyon bu fazın kapsamı **dışı** (discuss kararı); sessizce düzeltilmedi.

### Ham Koşu Verisi

**Masaüstü** (`--preset=desktop`, throttle ~yok; load 22–33):

| Koşu | perf | a11y | LCP | CLS | TBT | FCP |
|------|------|------|-----|-----|-----|-----|
| 1 | 100 | 89 | 697 ms | 0 | 41 ms | 297 ms |
| 2 ★ | 100 | 89 | 689 ms | 0 | 0 ms | 289 ms |
| 3 | 100 | 89 | 647 ms | 0 | 0 ms | 291 ms |

Masaüstü stabil — yük altında bile perf 100. ★ = kanonik artefakt (`home-desktop-20260628`).

**Mobil** (varsayılan preset, 4× CPU-throttle + Moto-G sınıfı; **düşük yük**, load ~5):

| Koşu | perf | a11y | LCP | CLS | TBT | FCP |
|------|------|------|-----|-----|-----|-----|
| 6 | 87 | 89 | 3158 ms | 0 | 299 ms | 1058 ms |
| 7 | 89 | 89 | 3007 ms | 0 | 284 ms | 1057 ms |
| 8 ★ | 87 | 89 | 3156 ms | 0 | 309 ms | 1056 ms |

Düşük yükte mobil **stabil**: perf ~87, LCP ~3.1 s, TBT ~300 ms. ★ = kanonik artefakt (`home-mobile-20260628`).

**Mobil — elenen yüksek-yük koşuları** (load avg **88** / 20 çekirdek = ~4.4× aşırı yüklenme — bu makinedeki **harici** iş yükü, orphan process değil):

| Koşu | perf | LCP | TBT | Not |
|------|------|-----|-----|-----|
| 1 | 65 | 2878 ms | 3676 ms | host-starved |
| 2 | 49 | 5110 ms | 4876 ms | host-starved |
| 3 | 90 | 3156 ms | 206 ms | host fırsat verdi |
| 4 | 62 | 3221 ms | 5065 ms | host-starved |
| 5 | 86 | 3173 ms | 311 ms | host fırsat verdi |

TBT'nin 206 ↔ 5065 ms savrulması = saf host-zamanlama gürültüsü (sayfa değil). a11y sabit 89, CLS sabit 0 (ortamdan bağımsız → host gürültüsünden etkilenmedi). Bu koşular tabandan **elendi**; taban düşük-yük (load ~5) koşularından alındı.

### Accessibility 89 — başarısız denetimler (4, ortamdan bağımsız, her iki preset aynı)

1. **color-contrast** (8 öğe):
   - Marka yeşili `#8af28a` krem `#f2f1e8` üzerinde **kontrast 1.22** — "Nasıl çalışır" adım numaraları (`ol.space-y-5 li span.font-display`), "İşleyen örnekleri gör" CTA (`a.group`).
   - Soluk `#7d8073` koyu `#171913` üzerinde **4.39** (4.5 eşiğinin hemen altı) — sektör notu (`section#sectors p.text-xs`), dark-mode küçük metin.
   - `#999992` krem üzerinde **2.52** — `text-canvas/40` span'ları.
2. **definition-list** (1): hero istatistik `<dl data-hero="stats">` doğrudan `<a>` sarıyor — `<dl>` yalnız `<dt>`/`<dd>` (veya script/template/div) içermeli.
3. **dlitem** (4): hero `<dt>`/`<dd>` öğeleri `<a> > span` içinde, doğrudan `<dl>` çocuğu değil.
4. **label-content-name-mismatch** (2): dil değiştirici butonları — görünür metin ile `aria-label` eşleşmiyor.

> Hepsi dar kapsamlı, düzeltilebilir; ayrı bir a11y task'ında toplanabilir. color-contrast craft-duyarlı (marka yeşili dekoratif) — düzeltme marka sesini koruyarak yapılmalı.

---

## Karar — Bütçe Karşılanmadı (contingency)

Bulgu kullanıcıya getirildi (TASK-2.03 Karar Noktası). Optimizasyon/a11y düzeltmesi bu fazın (Phase 2 teknik borç) kapsamı dışı (discuss-phase). Disposition → DURUM "Sıradaki Adım" + `docs/DECISIONS.md` (2026-06-28).

---

## Metodoloji (tekrar için)

```
npm run build && npm run start -- -p 3000      # yerel production sunum (dev build ile ÖLÇÜLMEZ)
CHROME_PATH=/usr/bin/google-chrome
LH="node ~/.npm/_npx/<hash>/node_modules/lighthouse/cli/index.js"   # npx cache (13.3.0); package.json'a EKLENMEZ
# Mobil:    $LH http://localhost:3000/ --output=json,html --chrome-flags="--headless=new --no-sandbox" --quiet
# Masaüstü: aynı + --preset=desktop
```

- **Yük gözlemi zorunlu:** her koşuda `cat /proc/loadavg` — host çekişmesi (yüksek load) TBT/LCP/perf'i bozar (a11y/CLS'yi değil). Düşük yükte (≤ ~6) ölç.
- Her preset 3+ koşu → median; localhost ağ-iyimser → perf "yerel taban", a11y/CLS ortamdan bağımsız (en güvenilir).
- Lighthouse `prefers-reduced-motion` set etmez → Living Flow WebGL tam-yük (gerçekçi en-kötü) ölçülür.
