import { defineConfig, devices } from "@playwright/test";

// Projenin ilk E2E/a11y config'i (Faz 5, D1.1 — TASK-5.03).
//
// Zemin = PROD BUILD (`next build && next start`), Faz 4 a11y ölçüm zemini ile
// birebir (dev-server'ın HMR/uncompiled CSS'i kontrast ölçümünü yanıltır). webServer
// bu yüzden `build && start` koşar; CI'da çift-build kabul (research #8: basit/robust;
// `.next` artifact paylaşımı bilinçli ileri-optimizasyon, şimdi değil).
//
// chromium-only: a11y (kontrast/markup) için tek motor yeterli, CI hızlı kalır
// (PHASE-5 Teknik Kararlar). Faz 4 manuel a11y ölçümü de chromium 1.61.1 ile yapıldı.
export default defineConfig({
  testDir: "./tests/e2e",
  // Yalnız e2e spec'leri; Vitest birim/parite testleri `*.test.{ts,tsx}` desenindedir
  // ve `tests/e2e/**` zaten vitest.config'te exclude (iki runner çakışmaz).
  testMatch: "**/*.spec.ts",
  // a11y baseline kararlı olmalı: yeniden-deneme regresyonu maskeler, kapalı tut.
  retries: 0,
  // CI'da test.only kazara commit'lenirse fail et (yanlış-yeşil koruması).
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // Faz 4 ölçüm zemini birebir: prod build + prod start (dev değil).
    command: "npm run build && npm run start",
    port: 3000,
    // build+start yavaş; default 60s build'i aşabilir → geniş tut.
    timeout: 180_000,
    // Yerelde eldeki canlı prod server'ı yeniden kullan; CI'da hep taze başlat.
    reuseExistingServer: !process.env.CI,
  },
});
