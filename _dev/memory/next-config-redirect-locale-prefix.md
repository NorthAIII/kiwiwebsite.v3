# next.config.ts `redirects()` `source`'u locale prefix'ini otomatik kapsamaz

**Tuzak:** `next.config.ts` `async redirects()` girişindeki `source` **literal** eşleşir — next-intl `as-needed` locale prefix'lerini (`/en`, `/ar`, `/de`, `/es`) **otomatik kapsamaz**. Tek `source: "/foo"` yazarsan yalnız çıplak `/foo` yönlenir; `/en/foo`, `/de/foo` vb. **404** olur (redirect hiç fire etmez).

**Ampirik kanıt (Faz 11 research, `next build` + curl):** mevcut `/forum`→`/bulten` girişi → `/forum` **308** (çalışır) ama `/en/forum`, `/de/forum` → **404** (redirect YOK). Aynı davranış her config redirect için geçerli.

**Doğru desen — iki açık giriş:**
```ts
{ source: "/bunker-os", destination: "/crew-os", permanent: true },
{ source: "/:locale(en|ar|de|es)/bunker-os", destination: "/:locale/crew-os", permanent: true },
```
- Çıplak giriş = prefixsiz TR (varsayılan locale).
- Prefixli giriş = `path-to-regexp` named param + regex kısıt (`en|ar|de|es`); `destination`'da `/:locale/…` ile korunur.
- `permanent: true` → **308** (SEO-kalıcı); geçici için `false` → 307.

**Sıra/etkileşim:** Config redirect **middleware'den ÖNCE** (edge'de) çalışır → Accept-Language'dan bağımsız fire eder; sonra hedef için next-intl locale müzakeresi normal işler. Çift-redirect (SEO-anlamlı) yok.

**Çakışma uyarısı:** Redirect'in kaynağıyla aynı yolda fiziksel route klasörü kalırsa route **200 kazanır**, redirect hiç fire etmez → eski route klasörünü sil (redirect config'e taşındığında).

**Sıra tuzağı — `:slug*` opsiyonel gruba derlenir (AMPİRİK, Faz 13):** `/foo/:slug*` regex'i çıplak `/foo`'yu da eşler (sıfır segment; manifest'te slug grubu `(?:…)?` opsiyonel). Çıplak `/foo` ile `/foo/:slug*` **aynı hedefe** gidiyorsa sorun yok (eski `/forum`→`/bulten` çifti böyleydi). Ama hedefler **ıraksıyorsa** (`/forum`→`/` ama `/forum/:slug*`→`/bulten/:slug*`), Next **ilk-eşleşen** redirect'i uygular → çıplak giriş slug'dan **ÖNCE** gelmeli; yoksa çıplak `/forum` slug regex'ine düşüp yanlış hedefe (`/bulten`) gider. `$`-anchor'lı bare regex gerçek spesifik eşleşmedir; "spesifik önce" sezgisi burada yanıltıcı (slug `*` boş segmenti yuttuğu için bare daha spesifik). Doğrulama: `.next/routes-manifest.json` regex'lerini örnek path'lere karşı test et (`new RegExp(r.regex).test("/forum")` → ilk eşleşenin `destination`'ına bak).

**Kapanış durumu:** `/forum` gap Faz 13'te kapatıldı — `/forum`→`/` (+ locale twin), `/forum/:slug*`→`/bulten/:slug*` (+ locale twin); `/bunker-os` çifti korundu. Tüm config redirect'leri artık iki-girişli (çıplak+twin). Regresyon tohumu: `tests/seo-redirects.test.ts` (`routes-manifest.json` locale-kapsam + sıra assertion). Yeni redirect eklerken iki-giriş desenini + (ıraksak hedefte) çıplak-önce sırasını baştan uygula.

İlgili: `docs/DECISIONS.md` 2026-07-02 (Faz 11 redirect kararı) + 2026-07-03 (Faz 13 `/forum`→`/` + sıra tuzağı), `phases/PHASE-11.md` / `phases/PHASE-13.md` Araştırma Bulguları.
