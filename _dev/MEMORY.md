# MEMORY — Proje Hafızası (Index)

> Bu dosya proje hafızasının **index'idir** — her oturum başında tam okunur. Öğrenimler
> `_dev/memory/<slug>.md` dosyalarında tutulur; buradaki her satır bir **pointer**dır
> (başlık + dosya + hak ettiyse tek satırlık kanca). Detay gerekince o an okunur (lazy-load).
>
> **Sisteme yazmadan önce oku:** `.claude/commands/devflow/lib/memory-sistemi.md` —
> kanca hakkı testi, sınıflar ve eşikler, kümeleme/mezuniyet supapları, ne yazılır ne yazılmaz.
> Yöntem oraya, kayıt buraya: index'e konan her karakter her oturumda yeniden ödenir.

**Son Güncelleme:** 2026-10-03 — repo haritasına v4 (yeni site, private) eklendi; v3 bakım modunda.

<!-- KURAL: Bu satır her güncellemede ÜZERİNE YAZILIR. "Önceki:" prefix ile kümülatif yığma YASAK (CLAUDE.md → Doküman Disiplini). -->

<!-- KURAL — pointer satırı: `- [Başlık](memory/<slug>.md)` kancasızdır; kanca bir HAKTIR, alan değil.
     Hak testi: "bu bilgi dosya açılmadan bilinmezse oturum yanlış bir hamle yapar mı?" Evet ise
     `- [Başlık](memory/<slug>.md) — <kanca>`. Sınıflar: A·sabit (değerin kendisi, ~100 kr) ·
     B·süreç disiplini (yalnız tetik+eylem, ~150 kr) · C·katalog (kancasız; gerekirse yalnız
     3-5 kelimelik "ne zaman lazım" işareti). Rehber eşikler
     (mahkûmiyet değil): kanca ~200 karakteri, toplam pointer ~40'ı aşmamalı; kancalı satırlar
     azınlıkta kalmalı. Kanca gövdeye dönüştüyse gövde atoma taşınır. Index BÖLÜNMEZ — taşma
     kümeleme/mezuniyet çağrısıdır (.claude/commands/devflow/lib/memory-sistemi.md → Supaplar). -->

---

## Teknik Tuzaklar & Workaround'lar

<!-- Proje genelinde geçerli beklenmedik davranışlar/bug'lar ve çözümleri — pasif gözlem ("şu böyle davranır, dikkat"). Eyleme/kontrole bağlıysa → Süreç Disiplinleri. -->

- [axe color-contrast WebGL canvas arkasında "incomplete" verir](memory/axe-webgl-contrast-incomplete.md)
- [axe color-contrast: viewport-dışı küçük inline node zemini `<body>`'ye düşer](memory/axe-offscreen-inline-contrast.md)
- [`aria-hidden` color-contrast'tan muaf tutmaz](memory/aria-hidden-color-contrast-muafiyeti-degil.md)
- [Tailwind v4: `translate-x-*` `transform` değil `translate` property'sini set eder](memory/tailwind-v4-translate-transition-property.md)
- [Tema-özel fix'te `dark:` variant kullanma](memory/tema-fix-html-dark-token-flip.md)
- [a11y/perf ölçümünde tema tuzağı](memory/a11y-olcum-tema-tuzagi.md) — kanonik Lighthouse DARK ölçer; kontrastı her zaman light+dark doğrula.
- [Lighthouse Lantern render-timing körlüğü](memory/lighthouse-lantern-render-timing-korligi.md)
- [next.config.ts `redirects()` `source`'u locale prefix'ini otomatik kapsamaz](memory/next-config-redirect-locale-prefix.md)
- [Tarayıcıda `/` (prefixsiz TR) Accept-Language ile locale'e yönlenir](memory/tarayici-accept-language-locale-yonlendirmesi.md) — TR ölçümde `NEXT_LOCALE=tr` cookie şart (Lighthouse dahil); curl tetiklemez.
- [Üçüncü-parti model adı bozulabilir bağımlılıktır](memory/groq-model-emekliligi-runtime-404.md) — curl 200 ≠ sağlıklı: model emekliliği ve 429 yalnız `vercel logs`'ta görünür; `max_tokens` 512'yi yükseltme.

## Kullanıcı Tercihleri

<!-- Kullanıcının proje genelinde geçerli tercihleri (test yaklaşımı, kod stili, iletişim vb.) -->

- Kullanıcı Türkçe çalışır (iletişim dili Türkçe).
- Canlı siteye dokunmadan çalışılır: `main` canlı kalır, revize işleri `revize/...` branch'lerinde yürür.

## Ortam & Araç Notları

<!-- Environment, tooling, CI/CD, kalıcı operasyonel veri (VPS IP, repo path, folder yapısı) -->

- Repo: `github.com/NorthAIII/kiwiwebsite.v3` · Repo kökü: `/home/kivanc/projects/kiwiwebsite.v3`
- Deploy: Vercel `north-ai/kiwi-ai-lab-v3` (her `main` push → otomatik deploy). Canlı: kiwiailab.com
- Chatbot env: `GROQ_API_KEY` (zorunlu, canlıda Vercel env'de), `CHAT_MODEL` (opsiyonel, varsayılan `qwen/qwen3.8-27b`).
- [Repo haritası](memory/repo-haritasi.md) — canlı = `NorthAIII/kiwiwebsite.v3` (bu repo, bakım modunda); **yeni site = `kiwiwebsite.v4`** (private); backend ayrı/private = `NorthAIII/kiwi-ai-lab`; eski repo'lar terk edilmiş öncül (yeniden kullanma).
- [CI (GitHub Actions) gözlemi `gh` olmadan da yapılabilir](memory/ci-actions-rest-gozlemi.md) — public repo: `/actions/runs?head_sha=<sha>` auth'suz REST.
- [Host UAT araç envanteri](memory/host-uat-arac-envanteri.md) — host: node 24 · system Chrome 153 · `gh`/`vercel` yetkili · `:3000` yabancı → yerel `test:e2e`'yi override config'le koş.
- [DevFlow sistemi](memory/devflow-sistemi.md) — DevFlow özel araç (`github.com/36337/DevFlow`); bu yüzden public repo'da `.claude/` gitignore'da, `_dev/` commit'lenir.
- [Standalone Playwright'te WebGL → `channel:'chrome'` şart](memory/playwright-bundled-chromium-webgl-yok.md)
- [Vercel Git-disconnect → deploy tetiklenmez](memory/vercel-git-disconnect-deploy-tetiklenmez.md) — deploy teyidi auth'suz REST: `/deployments` + `/commits/<sha>/statuses`.
- [Cloud devcontainer'da runtime tarayıcı: server yerine `page.route`](memory/sandbox-runtime-browser-page-route.md)
- [Perf ölçüm araç-zinciri devcontainer kurulumu](memory/perf-olcum-devcontainer-kurulumu.md)

## Çapraz Öğrenimler

<!-- Faz arası taşınan, tek faza/dokümana ait olmayan dersler -->

- [Henüz yok]

## Süreç Disiplinleri

<!-- Retrospektiften çıkan, BU projeye özgü, tekrar eden "şu adımda şu kontrolü yap" kuralları. Kanca sınıf B'dir: yalnız TETİK + EYLEM; gerekçe/istisna atomda kalır. Sınırlar ve Teknik Tuzak'tan farkı → .claude/commands/devflow/lib/memory-sistemi.md → Kategoriler. -->

- [Entegrasyon eklerken canlıda gözle doğrula, iddiayı kanıt artefaktına bağla](memory/canli-dogrulama-kanit-artefakti.md)
- [Lighthouse/perf ölçerken host yükünü gözlemle](memory/lighthouse-host-yuku-gozlemi.md) — her koşudan önce `cat /proc/loadavg`.
- [a11y-mühürlerken iki gate'i de koş: axe WCAG-AA 0 ihlal ≠ Lighthouse a11y=100](memory/a11y-muhru-iki-gate.md)
- [Yerel prod doğrulamada portu dinleyen PID'in senin process'in olduğunu teyit et](memory/yerel-prod-listening-pid-teyidi.md)
- [UI etiketine i18n dışından sabit adla atıf yapma — işlevini betimle](memory/ui-etiketine-sabit-adla-atif-yapma.md)
- [Runtime harness yazarken selector varsayma + şüpheyi belirleyici probe ile kapat](memory/runtime-harness-selector-teyidi.md)
