# Kiwi AI Lab — Website Master Prompt (v2)

Güncel tek kaynak (single source of truth). v1 (`MASTER_PROMPT.md`) İngilizce-öncelikli ve teorikti; v2, sahada inşa edilmiş ve müşteri kararlarıyla güncellenmiş halidir. Çelişki olursa **v2 geçerlidir**.

## 0. Kalite çıtası (değişmez)
Awwwards "Site of the Day" seviyesinde, **activetheory.net** sofistikasyonu ama **aydınlık/havadar** bir tonda, Cuberto sadeliğiyle. Tek güçlü imza fikir (**The Living Flow**), kusursuz hareket zamanlaması, özel tipografi + bolca beyaz alan, sıfır şablon kokusu, gerçek içerik.
**Yasaklar:** generic yeşil "● online / canlı demo" noktası; "iş doktoru / hekim / teşhis" metaforu; stok robot/AI klipart; generic SaaS özellik-kartı ızgaraları; "Listen/Dinle" gibi zayıf adım adı; lorem hissi veren dolgu metin.

## 1. Marka & teklif
Kiwi AI Lab — bir AI otomasyon ajansı. Bir işi analiz eder, tekrarlayan işin zaman/parayı nerede sızdırdığını bulur ve otomasyona bağlarız (rutin görevler, mesajlar SMS/WhatsApp, onay zincirleri). Sektöre hazır ürünler, 7/24 asistanlar, kurucuyla birebir. Bayrak katman: **Crew OS** (müşterinin otomasyonlarının yaşadığı/çalıştığı yer) — sitede her zaman bu public ad kullanılır; iç kod adı *Bunker OS*'tur ve kullanıcıya/site'a asla görünmez (aynı katman, iki ürün değil). Ton: çıktı odaklı, sade, kendinden emin, metafor yok.

> _Not: Bu brief'in eski hâli bayrak katmana "Bunker OS" diyordu; taksonomi kararıyla public ad **Crew OS** olarak hizalandı (Bunker OS = iç kod adı). Bkz. `_dev/docs/DECISIONS.md` (2026-06-27). Aşağıda §4/§5/§8'deki `/bunker-os` **route** adı bilinçle korundu — public `/crew-os` + redirect kararı sonraki (görsel/SEO) versiyona ertelendi._

## 2. Dil & i18n
- **Ana dil: TÜRKÇE** (varsayılan locale `tr`). v1'deki "English-first" KARARI DEĞİŞTİ.
- Diller: `tr` (varsayılan), `en`, `ar` (RTL), `de`, `es`. next-intl, locale-prefixli route'lar (`as-needed`).
- Dil değiştirici = **🌐 dünya ikonu + açılır menü** (yazı butonları değil), nav + footer'da.
- AR/DE/ES şu an EN'i aynalıyor (placeholder) — gerçek çeviri sonraki faz.

## 3. Görsel yön — "Aydınlık ama immersive" + Dark alternatif
- Aydınlık taban: sıcak kırık-beyaz (`#F7F6F1`), mürekkep siyahı metin (`#12140F`), derin kiwi yeşili (`#1F7A3D`), parıltı yeşili (`#6FE36F` sadece Living Flow nabızlarında).
- **Dark tema (alternatif, opt-in):** token'lar `html.dark` altında ters çevrilir (sıcak near-black zemin, kırık-beyaz metin, biraz parlak yeşil). Light varsayılan; tema butonu ile geçiş, `localStorage`'da saklanır, ilk açılışta FOUC önleyici script. Living Flow ve statik fallback temaya uyumlu (karanlıkta açık çizgiler).
- Tipografi: **Fraunces** (değişken display serif) + **Geist** (grotesque sans). Büyük, güvenli ölçek.
- Hareket: Lenis smooth scroll, GSAP scroll koreografisi, özel cursor, rafine hover. `prefers-reduced-motion` tam fallback.

## 4. İmza — The Living Flow
Açık zeminde ince yarı-saydam mürekkep çizgileri + yumuşak düğümler; çizgiler boyunca ilerleyen yeşil enerji nabızları (her nabız = otomatikleştirilen bir görev), vine/kök benzeri organik rotalar. İmlece tepki (çizgiler büker, nabızlar imleç yakınında büyür/parlar/hızlanır), scroll'da kayar. Tech: R3F + custom GLSL. Lazy-init (LCP'yi bozmaz), mobil/düşük güçte parçacık azalır, reduced-motion/no-WebGL'de statik SVG fallback. Hero arkasında full-bleed; Bunker OS sayfası ve "nasıl çalışır" bağlayıcılarında motif olarak tekrar eder.

## 5. Bilgi mimarisi (inşa edilmiş)
**Ana sayfa (`/`):** Nav → Hero (Living Flow + "İşinizi analiz ederiz. / Sonra otomatikleştiririz." + istatistik şeridi + CTA'lar) → Nasıl çalışır (3 adım: **Analiz · Tespit · Otomasyon**, GSAP bağlayıcı) → Sektörler (interaktif seçici: spor salonu, klinik, e-ticaret, emlak, **eğitim & danışmanlık**, **restoran & kafe** — her biri TEK gerçek otomasyon + sonuç; metrikler "öngörü/örnek" işaretli) → Bunker OS (görsel + "keşfet" linki) → **Topluluk/Forum** (öne çıkan içerik + örnek başlıklar; sürekli yeni içerik paylaşım alanı) → Canlı chatbot demo → Credibility → Footer (dil, sosyal, iletişim).
**Bunker OS sayfası (`/bunker-os`):** hero (Living Flow), uçtan uca mimari diyagram (Kaynaklar → çekirdek → Kanallar + Ölçüm geri-besleme, animasyonlu nabızlar), "Nasıl çalışır" 4 adım (Bağla/Akış kur/7-24 çalıştır/Ölç), canlı operasyon paneli (örnek metrikler).
**Forum makale sayfası (`/forum/ai-sdr-araclari`):** uzun-form içerik (ilk gerçek yazı: AI SDR araçları derlemesi, kaynağa atıfla).

## 6. Tech & build
- Next.js 15 (App Router, TS), Tailwind v4, R3F + drei + custom GLSL, GSAP + ScrollTrigger, Lenis, next-intl.
- Chatbot: `/api/chat` (Node runtime) Claude'u stream eder, varsayılan `claude-opus-4-8` (env `CHAT_MODEL`), EN/TR/AR/DE/ES algılar; `ANTHROPIC_API_KEY` yoksa zarif "offline" durumu.
- Performans: Lighthouse hedef ≥95 perf / ≥100 a11y, LCP < 2.5s, WebGL lazy + degradable.
- Erişilebilirlik: semantik HTML, focus state, klavye nav, RTL-doğru, reduced-motion yolu.

## 7. Dağıtım
- Repo: `github.com/NorthAIII/kiwiwebsite.v3` (branch `main`). Her push → Vercel `north-ai/kiwi-ai-lab-v3` otomatik deploy.
- Chatbot canlıda çalışsın diye Vercel env'e `ANTHROPIC_API_KEY` eklenmeli.

## 8. Bekleyen işler (sonraki adımlar)
- **Sosyal medya gerçek profil linkleri** (Instagram / X / LinkedIn — şu an `#` placeholder).
- **Weekend demo** ("no 36") — kullanıcı verince ilgili yere konacak.
- AR/DE/ES **gerçek çevirileri**.
- **Gerçek metrikler/vaka verileri** (placeholder'ların yerine).
- Foruma **ikinci+ içerikler**; istenirse foruma gerçek backend.
- İstenirse Bunker OS'a **üretilmiş görseller** (fal.ai/Gemini) — şu an stilize SVG/kod görseller.
- Chatbot'u "book a call" formuna/akışına bağlama.

## 9. Kopya yönü (Türkçe-öncelikli, çıktı-odaklı)
Hero: "İşinizi analiz ederiz. Sonra otomatikleştiririz."
Adımlar: Analiz · Tespit · Otomasyon (asla "Dinle/Listen").
CTA: "Ücretsiz keşif görüşmesi al."
Asla: doktor, teşhis, hekim, reçete.
