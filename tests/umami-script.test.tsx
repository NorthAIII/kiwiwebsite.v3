// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { UmamiScript } from "@/components/analytics/umami-script";

// UmamiScript izole render testi (E1, TASK-7.01).
//
// next/script MOCK'lanır: <Script afterInteractive> gerçek DOM düğümünü effect
// ile enjekte eder → bare render'da senkron <script> çıkmayabilir (flaky). Mock
// passthrough <script {...props} /> döndürür; böylece test Next'in enjeksiyonunu
// değil, BİZİM geçtiğimiz prop değerlerini (src/data-website-id/data-domains/
// strategy) doğrular. Enjeksiyon Next'in sorumluluğu → canlıda doğrulanır.
// (PHASE-7 araştırma C; docs/UMAMI-ANALYTICS.md spec değerleri.)
vi.mock("next/script", () => ({
  default: (props: Record<string, unknown>) => <script {...props} />,
}));

afterEach(cleanup);

describe("UmamiScript (izole render — spec prop'ları)", () => {
  it("Umami script'ini spec değerleriyle render eder", () => {
    const { container } = render(<UmamiScript />);
    const script = container.querySelector("script");

    expect(script).not.toBeNull();
    expect(script).toHaveAttribute(
      "src",
      "https://umami.kiwiailab.com/script.js",
    );
    expect(script).toHaveAttribute(
      "data-website-id",
      "c7031c49-5ccd-4b93-a82d-bba895ee4f2e",
    );
    expect(script).toHaveAttribute("data-domains", "kiwiailab.com");
    expect(script).toHaveAttribute("strategy", "afterInteractive");
  });
});
