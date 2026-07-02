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

**Bilinen açık borç:** `/forum` locale-prefix gap (`/en/forum`→404) bu desenle kapatılmadı (kapsam-dışı, kullanıcı kararı Faz 11) — gelecek SEO fazı adayı. Yeni redirect eklerken bu iki-giriş desenini baştan uygula ki aynı gap doğmasın.

İlgili: `docs/DECISIONS.md` 2026-07-02 (Faz 11 redirect kararı), `phases/PHASE-11.md` Araştırma Bulguları.
