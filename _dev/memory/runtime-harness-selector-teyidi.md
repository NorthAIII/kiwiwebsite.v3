# Runtime harness yazarken selector varsayma — etkileşim mekanizmasını kaynaktan teyit et

Standalone Playwright (veya herhangi bir runtime tarayıcı) harness'i yazarken hedef komponentin **etkileşim mekanizmasını** kaynaktan doğrula; DOM şeklini/selector'ı tahmin etme. Bu projede runtime senaryo doğrulaması (Faz 3, Faz 9) yazılırken tekrar eden **yanlış-FAIL** kaynağı budur: harness gerçek bir bug değil, kendi hatalı selector/assertion'ını raporlar → teşhis turu kaybı.

**Bu projedeki somut tuzaklar (Faz 9 S3/S4/S9 runtime ilk-koşuda 3 yanlış-FAIL):**
- **LanguageSwitcher `<a href>` DEĞİL** — `router.replace` çağıran bir `<button>`. Dil değişimini `href` bekleyerek değil, tıklama sonrası URL/`lang`/`dir` değişimini bekleyerek doğrula. next-intl cookie-hop (`NEXT_LOCALE`) navigasyonu etkiler.
- **Chatbot floating buton DEĞİL** — sayfa içinde inline `#chat` section. Floating-widget açma/kapama selector'ı yanlış; `#chat` bölümüne scroll + inline durum kontrol et.
- **Tema toggle** = `html.dark` class + `localStorage` (prefers-color-scheme DEĞİL) → `emulateMedia({colorScheme})` temayı çevirmez; toggle'a tıkla veya localStorage set + reload.

**Kanca (uygulama anı = runtime harness yazımı):** Selector/assertion yazmadan önce ilgili komponentin kaynağını aç (`components/`), etkileşimin router-buton mu / `<a>` mi, inline mi / floating mi, hangi state'i (class/localStorage/url/dir) değiştirdiğini gör. Ad-hoc harness "FAIL" verdiğinde önce **harness artefaktı mı** diye sor (kör red yok), sonra gerçek-bug hipotezine geç (kör onay yok). İlişkili: [Standalone Playwright'te WebGL → channel:'chrome' şart](playwright-bundled-chromium-webgl-yok.md) (aynı runtime harness ailesi: WebGL + focus-visible outline ölçüm nüansları).
