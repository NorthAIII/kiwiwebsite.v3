# Runtime harness yazarken selector varsayma — etkileşim mekanizmasını kaynaktan teyit et

Standalone Playwright (veya herhangi bir runtime tarayıcı) harness'i yazarken hedef komponentin **etkileşim mekanizmasını** kaynaktan doğrula; DOM şeklini/selector'ı tahmin etme. Bu projede runtime senaryo doğrulaması (Faz 3, Faz 9) yazılırken tekrar eden **yanlış-FAIL** kaynağı budur: harness gerçek bir bug değil, kendi hatalı selector/assertion'ını raporlar → teşhis turu kaybı.

**Bu projedeki somut tuzaklar (Faz 9 S3/S4/S9 runtime ilk-koşuda 3 yanlış-FAIL):**
- **LanguageSwitcher `<a href>` DEĞİL** — `router.replace` çağıran bir `<button>`. Dil değişimini `href` bekleyerek değil, tıklama sonrası URL/`lang`/`dir` değişimini bekleyerek doğrula. next-intl cookie-hop (`NEXT_LOCALE`) navigasyonu etkiler.
- **Chatbot floating buton DEĞİL** — sayfa içinde inline `#chat` section. Floating-widget açma/kapama selector'ı yanlış; `#chat` bölümüne scroll + inline durum kontrol et.
- **Tema toggle** = `html.dark` class + `localStorage` (prefers-color-scheme DEĞİL) → `emulateMedia({colorScheme})` temayı çevirmez; toggle'a tıkla veya localStorage set + reload.

**Kanca (uygulama anı = runtime harness yazımı):** Selector/assertion yazmadan önce ilgili komponentin kaynağını aç (`components/`), etkileşimin router-buton mu / `<a>` mi, inline mi / floating mi, hangi state'i (class/localStorage/url/dir) değiştirdiğini gör. Ad-hoc harness "FAIL" verdiğinde önce **harness artefaktı mı** diye sor (kör red yok), sonra gerçek-bug hipotezine geç (kör onay yok). İlişkili: [Standalone Playwright'te WebGL → channel:'chrome' şart](playwright-bundled-chromium-webgl-yok.md) (aynı runtime harness ailesi: WebGL + focus-visible outline ölçüm nüansları).

---

## Şüpheyi **belirleyici probe** ile kapat — "muhtemelen artefakttır" deme (Faz 17)

Yukarıdaki kanca "önce artefakt mı diye sor" der ama **nasıl karara bağlanacağını** söylemez. Faz 17'de bu boşluk üç kez ödendi ve şu yöntemle kapandı: **şüpheli sonucu, harness'ın kısıtını PAYLAŞMAYAN bağımsız bir substratta yeniden koş.** Aynı harness içinde assertion'ı gevşetmek kanıt değildir — kısıt orada da geçerlidir.

Bu projede işe yarayan bağımsız substratlar:
- **Gerçek middleware'li canlı site** (kiwiailab.com) — `page.route` interception'da middleware yoktur; locale normalizasyonu / redirect / negotiation şüphelerini canlı curl veya canlı tarayıcı probe'u kesin çözer. (BULGU-S9: dil-switch TR harness'ta `/tr`'de kalıyordu → canlıda `/` çıktı = harness artefaktı.)
- **Tam-doküman navigasyon** (`goto`) — SPA/router-cache şüphelerini izole eder. (BULGU-S2: `history.back()`-after-SPA içerik restore etmiyordu → tam-doküman yükleyip `goBack()` çağrılınca restore etti = statik full-`.rsc` servisinin artefaktı.)
- **Gerçek UI affordance'ı** — kullanıcının fiilen tıkladığı yol (örn. header back-link) sentetik API çağrısından (`history.back()`) ayrı kanıt verir.
- **Statik kaynak grep'i** — "özel bir override var mı?" sorusunu deterministik yanıtlar (örn. `popstate`/`beforePopState` grep = 0 → app-router standardı).

**Kanca (uygulama anı = harness beklenmedik sonuç verdiğinde):** Şüpheyi kapatmadan sonraki assertion'a geçme. "Bağımsız substrat hangisi?" diye sor, orada koş, sonucu **kanıt olarak kaydet** — artefakt çıkarsa harness'ın hangi prod özelliğini taklit edemediğini yaz (→ [sandbox-runtime-browser-page-route](sandbox-runtime-browser-page-route.md) bilinen ıraksamalar listesi), gerçek bug çıkarsa normal triyaja geç. Bu, hem kör-onayı hem kör-reddi yapısal olarak engeller. (Faz 17: 5 şüphenin 5'i bu yöntemle kapandı, 0 yanlış bug raporu, 0 sessizce yutulmuş bulgu.)
