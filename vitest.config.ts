import { defineConfig, configDefaults } from "vitest/config";

// Projenin ilk test runner config'i (Faz 5, D1.1).
// Varsayılan ortam: node — i18n parite tohumu DOM gerektirmez (hızlı).
// Component/jsdom katmanı TASK-5.02'de `// @vitest-environment jsdom` pragma'sıyla
// dosya bazında gelir; kümülatif büyüyünce `test.projects`'e bölünür (PHASE-5 araştırma #6).
export default defineConfig({
  test: {
    environment: "node",
    // Yalnız `tests/` altındaki birim/parite testleri. Playwright `.spec.ts`
    // dosyaları bu desende değil — yine de e2e dizinini açıkça dışlıyoruz (belt-and-suspenders).
    include: ["tests/**/*.test.{ts,tsx}"],
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
});
