// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

// Vitest jsdom (component) katmanı öz-kanıtı (Faz 5, D1.2 — TASK-5.02).
//
// Bu test gerçek bir uygulama bileşenini DEĞİL, kasıtlı olarak trivial inline bir
// component'i render eder. Amaç jsdom render yolunu + jest-dom matcher'ını uçtan
// uca kanıtlamak (toolchain öz-kanıtı) — geniş component kapsamı değil. Gerçek
// bileşenler (Hero, KiwiMark vb.) next-intl/GSAP/three sürükler; jsdom'da WebGL
// yoktur → trivial component şart (PHASE-5 araştırma #5/#10). Seed'in 3 kanıtlı
// katmanından 2.'si: Vitest-node (i18n parite) · *Vitest-jsdom (bu)* · Playwright/axe.

function Hello() {
  return <div>merhaba</div>;
}

afterEach(cleanup);

describe("vitest jsdom smoke (component katmanı)", () => {
  it("trivial component'i jsdom'da render eder (jest-dom matcher aktif)", () => {
    render(<Hello />);
    expect(screen.getByText("merhaba")).toBeInTheDocument();
  });
});
