import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";

// Projenin ilk test runner config'i (Faz 5, D1.1).
// Varsayılan ortam: node — i18n parite tohumu DOM gerektirmez (hızlı).
// Component/jsdom katmanı (TASK-5.02): `// @vitest-environment jsdom` pragma'lı dosyalar
// (örn. tests/smoke.test.tsx) jsdom'a geçer; i18n parite node'da kalır. Kümülatif
// büyüyünce node/jsdom `test.projects`'e bölünür (PHASE-5 araştırma #6) — şimdi değil.
export default defineConfig({
  // `react()` yalnız JSX transform için (SSR/Next pipeline'ı değil) — component
  // smoke testinin TSX'ini derler (PHASE-5 araştırma: Teknik Kararlar).
  plugins: [react()],
  test: {
    environment: "node",
    // jest-dom matcher'larını (toBeInTheDocument vb.) tüm test dosyalarına yükler.
    // node testleri (i18n parite) matcher kullanmaz ama setup zararsızdır.
    setupFiles: ["./vitest.setup.ts"],
    // Yalnız `tests/` altındaki birim/parite testleri. Playwright `.spec.ts`
    // dosyaları bu desende değil — yine de e2e dizinini açıkça dışlıyoruz (belt-and-suspenders).
    include: ["tests/**/*.test.{ts,tsx}"],
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
});
