import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { routing } from "../src/i18n/routing";

// i18n 5-dil parite tohum testi (Faz 5, D1.2).
//
// TR tek kaynaktır (dil stratejisi → docs/DECISIONS.md 2026-06-27/06-28; M4 F4.2).
// Bu test yalnız ANAHTAR KÜMESİNİ karşılaştırır, DEĞERLERİ değil: TR-dışı dillerde
// *stale kopya* (aynı anahtar, eski metin) versiyon-sınırına dek serbesttir; yalnız
// *eksik/fazla anahtar* fail'dir (eksik anahtar = runtime boşluk/hata).
//
// Locale listesi tek kaynaktan türetilir (`routing.locales`) → yeni dil eklenince
// test otomatik kapsar (PHASE-5 araştırma: locale listesi tek kaynak).

const messagesDir = join(dirname(fileURLToPath(import.meta.url)), "..", "messages");

type MessageTree = Record<string, unknown>;

// Recursive flatten: yalnız yaprak anahtarları (a.b.c) toplar; obje düğümleri sayılmaz.
function flattenKeys(node: MessageTree, prefix = "", out = new Set<string>()): Set<string> {
  for (const [key, value] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flattenKeys(value as MessageTree, path, out);
    } else {
      out.add(path);
    }
  }
  return out;
}

function loadKeys(locale: string): Set<string> {
  const raw = readFileSync(join(messagesDir, `${locale}.json`), "utf8");
  return flattenKeys(JSON.parse(raw) as MessageTree);
}

const baseLocale = routing.defaultLocale; // "tr"
const baseKeys = loadKeys(baseLocale);

describe("i18n message parity (anahtar kümesi)", () => {
  it(`taban locale "${baseLocale}" anahtar taşır`, () => {
    expect(baseKeys.size).toBeGreaterThan(0);
  });

  for (const locale of routing.locales) {
    if (locale === baseLocale) continue;

    it(`"${locale}" anahtar kümesi "${baseLocale}" ile eşit`, () => {
      const keys = loadKeys(locale);
      const missing = [...baseKeys].filter((k) => !keys.has(k));
      const extra = [...keys].filter((k) => !baseKeys.has(k));

      // Eksik = TR'de var, dilde yok (yasak — runtime boşluk).
      expect(missing, `${locale}.json içinde EKSİK anahtarlar`).toEqual([]);
      // Fazla = dilde var, TR'de yok (yasak — TR taban kaynaktır).
      expect(extra, `${locale}.json içinde FAZLA anahtarlar (${baseLocale}.json'da yok)`).toEqual([]);
    });
  }
});
