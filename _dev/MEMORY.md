# MEMORY — Proje Hafızası (Index)

> Bu dosya proje hafızasının **index'idir** — her oturum başında okunur. Birikmiş
> öğrenimler tek tek `_dev/memory/<slug>.md` dosyalarında tutulur; buradaki her
> satır o dosyalara bir **pointer**dır (başlık + tek satırlık kanca). Bir öğrenimin
> detayı gerekince o an `memory/<slug>.md` okunur (lazy-load).
>
> Bu yapı şişmeyi önler: index ince kalır (hep yüklü), detay yalnızca gerekince okunur.

**Son Güncelleme:** 2026-06-30 — run-task 4.08: Accept-Language redirect tuzağı satırı Lighthouse/perf-baseline örneğiyle zenginleştirildi (cookie'siz Lighthouse `/en` ölçer → v0.1 baseline yanlış-locale; perf ölçümünde TR `/` için `NEXT_LOCALE=tr` cookie şart).

<!-- KURAL: Bu satır her güncellemede ÜZERİNE YAZILIR. "Önceki:" prefix ile kümülatif yığma YASAK (CLAUDE.md → Doküman Disiplini). -->

---

## Teknik Tuzaklar & Workaround'lar

<!-- Proje genelinde geçerli beklenmedik davranışlar/bug'lar ve çözümleri (pasif gözlem: "şu böyle davranır, dikkat"). Tekrar eden, eyleme/kontrole bağlı bir "şu adımda şu kontrolü yap" kuralıysa → Süreç Disiplinleri. -->

- [`aria-hidden` color-contrast'tan muaf tutmaz](memory/aria-hidden-color-contrast-muafiyeti-degil.md) — **Yaygın yanlış varsayım:** dekoratif düşük-kontrast öğeye `aria-hidden="true"` eklemek onu axe/Lighthouse `color-contrast` denetiminden çıkarmaz. axe-core 4.11.4 ile kanıtlı: kural **görsel görünürlüğü** (`isVisibleOnScreen`) baz alır, AT-ağacını değil — doğrudan aria-hidden öğe de, aria-hidden ebeveyn içindeki öğe de **hâlâ flag'lenir**. Lighthouse 13.3.0 bu axe'ı bundle ediyor → a11y skoruna katkı yok. Görsel-koruyan doğru fix: CSS pseudo-element (`::before { content: attr() }`, text-node değil) veya kontrast-geçen renk; SVG text "incomplete" verir. (TASK-4.02; TASK-4.04/K5 ayraç planını etkiler.)
- [a11y/perf ölçümünde tema tuzağı](memory/a11y-olcum-tema-tuzagi.md) — Kanonik Lighthouse (`--headless=new`) **DARK** render eder (init `prefers-color-scheme: dark`'a düşer; v0.1 baseline de dark'tı), "light gate" değil; a11y skoru iki temada aynı ama color-contrast **öğeleri** farklı. `bg-ink`/`text-canvas` panelleri tema ile ters çevrilir → kontrast pass/fail flip eder; **her zaman light+dark doğrula**. Tema zorlamak için Playwright `emulateMedia({colorScheme})`; tam envanter için `reducedMotion:'reduce'` + scroll (Lighthouse full-motion'da reveal `opacity:0`'ı atlar). axe-core lighthouse npx cache'inde gömülü (offline enjekte).
- **Tarayıcı-tabanlı doğrulamada `/` (prefixsiz TR) Accept-Language ile otomatik locale'e yönlenir** (next-intl `localeDetection`; örn. `Accept-Language: en-US` → `/en`). curl bunu **tetiklemez** (header göndermez) → aynı sayfa curl'de TR-200 ama Playwright/tarayıcıda `/en` görünebilir; bu tutarsızlık **bug değil**, beklenen davranış. TR-birincil testlerde `NEXT_LOCALE=tr` cookie kullan (cookie precedence > Accept-Language). **Lighthouse de Chrome → tetikler:** cookie'siz koşu `/` yerine `/en` ölçer; bu yüzden v0.1 perf baseline'ı yanlışlıkla `/en` ölçmüş (artifact `finalUrl=/en` ile TASK-4.08'de kanıtlandı, "TR `/`" diye etiketlenmişti). **Perf ölçümünde TR `/` için `--extra-headers='{"Cookie":"NEXT_LOCALE=tr"}'` şart; regresyon karşılaştırmasında hep aynı locale.** TR `/` sayfası `/en`'den ağır (uzun hero metni) → farklı perf/LCP, regresyon değil. (Faz 3 S5/S6/S8 + Faz 4 TASK-4.08; detay → `phases/PHASE-3.md`, `phases/PHASE-4.md` 4.08 İcra Notu, `docs/perf/README.md`.)

## Kullanıcı Tercihleri

<!-- Kullanıcının proje genelinde geçerli tercihleri (test yaklaşımı, kod stili, iletişim vb.) -->

- Kullanıcı Türkçe çalışır (iletişim dili Türkçe).
- Canlı siteye dokunmadan çalışılır: `main` canlı kalır, revize işleri `revize/...` branch'lerinde yürür.

## Ortam & Araç Notları

<!-- Environment, tooling, CI/CD, kalıcı operasyonel veri (VPS IP, repo path, folder yapısı) -->

- Repo: `github.com/NorthAIII/kiwiwebsite.v3` · Repo kökü: `/home/kivanc/projects/kiwiwebsite.v3`
- Deploy: Vercel `north-ai/kiwi-ai-lab-v3` (her `main` push → otomatik deploy). Canlı: kiwiailab.com
- Chatbot env: `ANTHROPIC_API_KEY` (zorunlu, canlıda Vercel env'de), `CHAT_MODEL` (opsiyonel, varsayılan `claude-opus-4-8`).
- [Repo haritası](memory/repo-haritasi.md) — frontend = `NorthAIII/kiwiwebsite.v3` (bu repo, public); backend ayrı/private = `NorthAIII/kiwi-ai-lab`; eski repo'lar terk edilmiş öncül (yeniden kullanma).
- [DevFlow sistemi](memory/devflow-sistemi.md) — DevFlow özel araç (`github.com/36337/DevFlow`); bu yüzden public repo'da `.claude/` gitignore'da, `_dev/` commit'lenir.

## Çapraz Öğrenimler

<!-- Faz arası taşınan, tek faza/dokümana ait olmayan dersler -->

- [Henüz yok]

## Süreç Disiplinleri

<!-- Retrospektiften çıkan, proje genelinde geçerli "şunu yaparken şu kontrolü her zaman yap" tipi iş-akışı kuralları. -->

- **i18n değişiminde anahtar varlığı ≠ değer tazeliği — ayrımı koru.** Anahtar EKLEME / yeniden-adlandırma / yapısal değişim → 5 dilde (tr/en/ar/de/es) anahtar **eşzamanlı** var olmalı (eksik anahtar = runtime boşluk/hata, pazarlık-dışı). Yalnız **değer** değişimi → non-TR stale-kopya kabul, çeviri versiyon-sınırına ertelenir (TR tek kaynak). Plan/icrada önce değişimin tipini (anahtar mı değer mi) belirle. (Detay: `docs/DECISIONS.md` 2026-06-28 i18n rename + 2026-06-27 dil senkronu.)
- Entegrasyon/analytics/3rd-party script eklerken **canlıda (production) gerçekten çalıştığını gözle doğrula** — "kod ekledim, tamamdır" deme; etkiyi panelde/ağ sekmesinde gör. (Bu projede daha önce tam bu atlanmıştı; örn. Umami → `docs/UMAMI-ANALYTICS.md`.)
- **Lighthouse/perf ölçerken host yükünü gözlemle** — her koşudan önce `cat /proc/loadavg`. Yüksek yük (bu makine 20 çekirdek; load avg ≫ çekirdek sayısı = aşırı yük) TBT/LCP/perf skorunu bozar (a11y/CLS'yi **değil** — onlar ortamdan bağımsız), tek atışta perf 49↔90 savrulur. Düşük yükte (≤ ~6) çok-koşu al, median kaydet; yüksek-yük koşularını ele. Bu host gürültüsü orphan chrome process'ten farklıdır (onu da `ps` ile kontrol et). (Detay/metodoloji: `docs/perf/README.md`; ilk taban TASK-2.03.)
- **Yerel prod doğrulamada serve eden process'in senin fresh process'in olduğunu listening-PID ile teyit et.** Önceki oturumdan kalan stray/stale `next-server` portu tutup eski (edit-öncesi) build'i sunabilir → tüm yeni metinler "bulunamadı" görünür (**yanlış negatif**, gerçekte build doğru). Görsel/curl doğrulamadan önce: portu dinleyen PID az önce başlattığın process mi (`ss -ltnp` / `lsof -i`), yoksa stray mı? Şüphede diskteki prerender (`.next/server/app/*.html`) build'in ground-truth'udur. Net portta yeniden başlat, sahiplenen PID'yi teyit et. (TASK-2.01'de tam bu yaşandı.)

---

## Memory Sistemi — Nasıl Çalışır?

- **Index satırı:** `- [Başlık](memory/<slug>.md) — tek satırlık kanca`. Slug kebab-case ve açıklayıcı olsun (örn. `mawk-unicode-tuzagi`).
- **Kendi kendine yeten kanca.** Her zaman geçerli olması gereken kritik bilgide kancayı **tam** yaz — böylece dosya açılmadan da bilgi her oturum görünür. Yalnızca duruma-özgü veya uzun detayda kanca "buraya bak" olur, gövde dosyada durur.
- **Memory dosyası** (`_dev/memory/<slug>.md`): düz markdown — `# Başlık` + gövde. Frontmatter yok. İlgili başka bir memory'ye `[Başlık](diğer-slug.md)` ile link verilebilir. Klasör ilk öğrenim yazıldığında oluşur.
- **Yeni öğrenim eklerken:**
  1. `_dev/memory/<slug>.md` oluştur — ya da aynı konu varsa **mevcudu güncelle** (dedup, yeni dosya açma).
  2. `_dev/MEMORY.md` index'inde ilgili kategori altına pointer satırını ekle/güncelle.
  3. Bayatlayan öğrenimi hem dosyadan hem index'ten **sil** (soft-delete yok — git history zaten tutar).
  4. Bir memory dosyası kendisi şişerse CLAUDE.md → Boyut ve Bölünme'ye göre alt-dosyaya böl.

---

## Bu Sisteme Ne Yazılır, Ne Yazılmaz?

Memory sistemi (MEMORY.md index + `memory/` dosyaları) **kalıcı/operasyonel veri ve çapraz öğrenimler** içindir. Drift'in en büyük kaynağı yanlış-ev sorunudur: task icra detayları, oturum logları veya aktif durum bilgisi buraya yazılırsa sistem şişer ve gerçek değeri kaybolur.

### TUTULAN içerik
- Başka dokümana uymayan ama kaybedilmemesi gereken kalıcı bilgiler
- Geliştirme sırasında keşfedilen, **proje genelinde geçerli** tuzaklar ve workaround'lar
- Kullanıcının proje genelindeki **operasyonel/teknik** tercihleri — yön/öncelik düzeyindeki ilkeler buraya değil → `ILKELER.md`
- Ortam ve araçlarla ilgili pratik notlar (CI özellikleri, deployment kuralları)
- Fazlar arası geçerliliği olan çapraz öğrenimler
- Retrospektiften çıkan, **bu projeye özgü** süreç disiplinleri → "Süreç Disiplinleri" kategorisi
- Sabit konfigürasyon değerleri ve kalıcı operasyonel veri (repo path, hesap email, folder yapısı)
- Mimari karar **özetleri** — detay `docs/DECISIONS.md`'de
- Secret kategori isimleri (örn. "ANTHROPIC_API_KEY env'de tutulur") — **değer ASLA yazılmaz**

### YASAK içerik (bunlar başka dokümanlara aittir — memory yanlış evdir)
- **Task icrası sırasında öğrenilen teknik nüanslar** → `phases/PHASE-N.md` retrospektifi
- **Oturum logları, "şu oturumda şu yapıldı"** → git log + ilgili PHASE/TASK dokümanları
- **Aktif faz/task durumu, ilerleme, son task özetleri** → `DURUM.md`
- **Mimari ve tasarım kararları** (detay) → `docs/DECISIONS.md`
- **Proje yapısı ve kimliği** → `OVERVIEW.md`, `INDEX.md`
- **Proje yön-veren ilkeleri ve öncelikleri** → `ILKELER.md`
- **Kalite kuralları** → `QUALITY.md`
- **Faz retrospektifi** → `phases/PHASE-N.md`

### Çıkarma Disiplini

CLAUDE.md → Doküman Disiplini bölümü baskındır. Özet:
- Geçersizleşen bilgi tarihi yanında yazılı olsa bile **silinir** — tarih koruma gerekçesi değildir.
- "Önceki:" / "Eski:" prefix ile paragraf merdiveni YASAK; her güncelleme üzerine yazma yapar.
- HTML comment'e sarma, üstü çizili etiket gibi yumuşak silme yöntemleri YASAK; gerçek silme yapılır (git log zaten her şeyi tutar).
