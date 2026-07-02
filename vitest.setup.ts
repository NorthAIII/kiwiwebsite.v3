// Vitest global setup (Faz 5, D1.1 — TASK-5.02).
//
// jest-dom matcher'larını (toBeInTheDocument, toHaveTextContent vb.) Vitest'in
// `expect`'ine genişletir. `vitest.config.ts` → test.setupFiles ile her test
// dosyasından önce bir kez yüklenir. node ortamındaki testler (i18n parite)
// matcher'ları kullanmaz; yükleme zararsızdır (PHASE-5 araştırma #6).
//
// `/vitest` subpath şart: kök entry Jest-tarzı global `expect` bekler, Vitest ise
// `expect`'i global yapmaz (globals:false) → kök import "expect is not defined" verir.
// `/vitest` entry'si Vitest'in `expect`'ini doğrudan extend eder.
import "@testing-library/jest-dom/vitest";
