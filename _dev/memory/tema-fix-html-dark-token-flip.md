# Tema-özel fix'te `dark:` variant kullanma — proje `html.dark` token-flip ile temalanır

**Tuzak:** Bir öğenin light/dark'ta farklı stillenmesi gerektiğinde (örn. a11y kontrast fix'i yalnız bir temada gerekiyor) Tailwind `dark:` variant'ına uzanma refleksi **yanlıştır** bu projede.

**Neden:** Proje temayı **`html.dark` class** + `globals.css`'teki CSS değişken flip'iyle uygular (`--color-canvas`, `--color-ink`, `--color-pulse-ink`, … `html.dark` altında ters çevrilir; `bg-ink`/`text-canvas` utility'leri otomatik uyum sağlar). Tailwind v4'ün **varsayılan `dark:` variant'ı `@media (prefers-color-scheme: dark)`'a** bağlıdır — `html.dark` class'ına değil (proje `@custom-variant`/darkMode-class **tanımlamamış**; kod tabanında **sıfır `dark:` kullanımı** var, grep teyitli). Sonuç: `dark:` variant **OS tercihine** tepki verir, uygulamanın tema toggle'ına değil → kullanıcı OS'i light iken app dark'a alırsa (veya tersi) **desync** olur (craft bug'ı).

**Doğru yaklaşım:** Fix, flip eden token'lar üzerinden çalışmalı:
- **Tek değer her iki temada geçsin** — örn. opaklık `/45`→`/65`: `text-canvas` zaten flip ettiği için tek `/65` hem light (krem/ink) hem dark (ink/krem) panelde AA geçer. (TASK-8.02'de kullanıldı.)
- Gerçekten tema-duyarlı ayrı değer gerekiyorsa **adaptif token** ekle (`globals.css`'te `:root` + `html.dark` altında iki değer, `--color-pulse-ink`/`--color-ink-faint` deseni gibi) — `dark:` variant değil.

İlgili: a11y ölçümünde tema tuzağı ([a11y-olcum-tema-tuzagi.md](a11y-olcum-tema-tuzagi.md)) — bu MEASUREMENT (axe light+dark), bu dosya FIX mekanizmasıdır.
