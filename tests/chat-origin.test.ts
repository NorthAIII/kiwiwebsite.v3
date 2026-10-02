import { describe, it, expect } from "vitest";
import { isSameOriginRequest } from "@/lib/chat-origin";

// `/api/chat` origin kapısı — same-origin kuralının birim testi (DECISIONS 2026-10-02;
// TASK-19.02). Saf modül route ayağa kaldırmadan test edilir.
//
// `Headers.get` başlık ADINA göre büyük/küçük harf duyarsızdır; adları farklı yazmak kuralı
// test etmez. Harf farkı yalnız DEĞERLERDE test edilir (host / Origin).

const req = (init: Record<string, string>) => new Headers(init);

describe("isSameOriginRequest — kabul: Origin host'u = isteğin host'u", () => {
  it.each([
    ["apex", "https://kiwiailab.com", "kiwiailab.com"],
    ["www (yönlendirmesiz alias)", "https://www.kiwiailab.com", "www.kiwiailab.com"],
    ["vercel.app alias", "https://kiwi-ai-lab-v3.vercel.app", "kiwi-ai-lab-v3.vercel.app"],
    ["localhost (port dahil)", "http://localhost:3000", "localhost:3000"],
  ])("%s", (_label, origin, host) => {
    expect(isSameOriginRequest(req({ origin, host }))).toBe(true);
  });

  it("host değerinin harf farkı eşleşmeyi bozmaz", () => {
    expect(isSameOriginRequest(req({ origin: "https://kiwiailab.com", host: "KiwiAILab.com" }))).toBe(
      true
    );
  });

  it("Origin değerinin harf farkı eşleşmeyi bozmaz", () => {
    expect(isSameOriginRequest(req({ origin: "https://KIWIAILAB.com", host: "kiwiailab.com" }))).toBe(
      true
    );
  });

  it("şema karşılaştırılmaz: kural yalnız host:port", () => {
    expect(isSameOriginRequest(req({ origin: "http://kiwiailab.com", host: "kiwiailab.com" }))).toBe(
      true
    );
  });
});

describe("isSameOriginRequest — kabul: Origin yok/null → Sec-Fetch-Site yedeği", () => {
  it("Origin yok + Sec-Fetch-Site: same-origin", () => {
    expect(isSameOriginRequest(req({ host: "kiwiailab.com", "sec-fetch-site": "same-origin" }))).toBe(
      true
    );
  });

  it("Origin: null + Sec-Fetch-Site: same-origin", () => {
    expect(
      isSameOriginRequest(
        req({ origin: "null", host: "kiwiailab.com", "sec-fetch-site": "same-origin" })
      )
    ).toBe(true);
  });
});

describe("isSameOriginRequest — öncelik: Origin varsa belirleyici odur", () => {
  it("eşleşen Origin + Sec-Fetch-Site: cross-site → KABUL (Origin kuralı kazanır)", () => {
    expect(
      isSameOriginRequest(
        req({ origin: "https://kiwiailab.com", host: "kiwiailab.com", "sec-fetch-site": "cross-site" })
      )
    ).toBe(true);
  });

  it("eşleşmeyen Origin + Sec-Fetch-Site: same-origin → RED (yedek, Origin'i kurtaramaz)", () => {
    expect(
      isSameOriginRequest(
        req({ origin: "https://evil.example", host: "kiwiailab.com", "sec-fetch-site": "same-origin" })
      )
    ).toBe(false);
  });
});

describe("isSameOriginRequest — red: yabancı ya da benzer Origin", () => {
  it("yabancı Origin (UAT 18 senaryo 23 vektörü)", () => {
    expect(
      isSameOriginRequest(
        req({ origin: "https://evil.example", host: "kiwiailab.com", "sec-fetch-site": "cross-site" })
      )
    ).toBe(false);
  });

  it.each([
    ["alan adını önek olarak taşıyan yabancı host", "https://kiwiailab.com.evil.example"],
    ["sonek olarak benzer ad", "https://evilkiwiailab.com"],
  ])("%s", (_label, origin) => {
    expect(isSameOriginRequest(req({ origin, host: "kiwiailab.com" }))).toBe(false);
  });

  it("port farkı (localhost:3001 ↔ localhost:3000)", () => {
    expect(isSameOriginRequest(req({ origin: "http://localhost:3001", host: "localhost:3000" }))).toBe(
      false
    );
  });

  it("parse edilemeyen Origin", () => {
    expect(isSameOriginRequest(req({ origin: "not a url", host: "kiwiailab.com" }))).toBe(false);
  });
});

describe("isSameOriginRequest — red: Origin yok/null ve same-origin işareti yok", () => {
  it("Origin yok + Sec-Fetch-Site yok (curl varsayılanı)", () => {
    expect(isSameOriginRequest(req({ host: "kiwiailab.com" }))).toBe(false);
  });

  it.each(["cross-site", "same-site", "none"])("Origin yok + Sec-Fetch-Site: %s", (site) => {
    expect(isSameOriginRequest(req({ host: "kiwiailab.com", "sec-fetch-site": site }))).toBe(false);
  });

  it("Origin: null + Sec-Fetch-Site yok", () => {
    expect(isSameOriginRequest(req({ origin: "null", host: "kiwiailab.com" }))).toBe(false);
  });
});

describe("isSameOriginRequest — red: host yok (fail-closed, iki yoldan da önce)", () => {
  it("Origin'li istek, host yok", () => {
    expect(isSameOriginRequest(req({ origin: "https://kiwiailab.com" }))).toBe(false);
  });

  it("Origin yok + Sec-Fetch-Site: same-origin, host yok", () => {
    expect(isSameOriginRequest(req({ "sec-fetch-site": "same-origin" }))).toBe(false);
  });

  it("boş host değeri yok sayılır (Sec-Fetch-Site yolu da geçemez)", () => {
    expect(isSameOriginRequest(req({ host: "", "sec-fetch-site": "same-origin" }))).toBe(false);
  });

  it("tamamen boş başlık seti (hiç bakmadan geçirmez)", () => {
    expect(isSameOriginRequest(new Headers())).toBe(false);
  });
});
