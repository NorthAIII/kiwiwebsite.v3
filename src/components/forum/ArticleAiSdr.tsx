"use client";

import { useLocale } from "next-intl";

const SOURCE = "https://www.whitespacesolutions.ai/content/ai-sdr-tools-comparison";

const TOOLS = [
  { name: "11x.ai (Alice/Julian)", price: "$5.000–$10.000+/ay" },
  { name: "Artisan (Ava)", price: "$1.500–$3.000+/ay" },
  { name: "AiSDR", price: "$900–$2.500/ay" },
  { name: "Salesforge (Agent Frank)", price: "$599/ay’dan" },
  { name: "Regie.ai", price: "ücretsiz / $20–$150/temsilci" },
  { name: "Relevance AI", price: "ücretsiz / $19–$199/ay" },
];
const TOOLS_EN = [
  { name: "11x.ai (Alice/Julian)", price: "$5,000–$10,000+/mo" },
  { name: "Artisan (Ava)", price: "$1,500–$3,000+/mo" },
  { name: "AiSDR", price: "$900–$2,500/mo" },
  { name: "Salesforge (Agent Frank)", price: "from $599/mo" },
  { name: "Regie.ai", price: "free / $20–$150/rep" },
  { name: "Relevance AI", price: "free / $19–$199/mo" },
];

export default function ArticleAiSdr() {
  const locale = useLocale();
  const tr = locale === "tr";

  return (
    <article className="mx-auto max-w-2xl px-6 pb-32 pt-32 lg:pt-40">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green">
        {tr ? "Rehber · Satış otomasyonu" : "Guide · Sales automation"}
      </p>
      <h1 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]">
        {tr
          ? "2026’da AI SDR araçları: fiyatlarıyla karşılaştırma"
          : "AI SDR tools in 2026: a comparison with pricing"}
      </h1>
      <p className="mt-4 text-sm text-ink-faint">
        {tr ? "8 dk okuma · Kiwi AI Lab derlemesi" : "8 min read · A Kiwi AI Lab roundup"}
      </p>

      <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink-soft">
        <p>
          {tr
            ? "Bir satış geliştirme temsilcisi (SDR); maaş, yan haklar, araçlar ve genel giderlerle birlikte yılda çoğu zaman 110.000 doları aşan bir maliyet. AI SDR platformları bu işin önemli bir kısmını 7/24, molasız ve maliyetin küçük bir kısmına yapmayı vaat ediyor. Ama araçlar kalite ve fiyat modeli açısından ciddi biçimde farklılaşıyor — doğru seçim, işinizin hacmine ve mesaj/playbook olgunluğunuza bağlı."
            : "A sales development rep (SDR) — with salary, benefits, tools, and overhead — often costs more than $110,000 a year. AI SDR platforms promise to do a big part of that job 7/24, without breaks, at a fraction of the cost. But the tools vary sharply in quality and pricing model — the right pick depends on your volume and the maturity of your messaging/playbook."}
        </p>

        <SectionTitle>{tr ? "AI SDR nedir, neyi otomatikleştirir?" : "What an AI SDR automates"}</SectionTitle>
        <p>
          {tr
            ? "AI SDR; aday araştırma ve veri zenginleştirme, kişiselleştirilmiş e-posta/LinkedIn dizileri, takip mesajları, gelen yanıtların nitelendirilmesi, toplantı planlama ve CRM güncellemesi gibi tekrarlayan dış erişim işlerini üstlenir. Kısacası: hacimli ve kurala bağlanabilen ilk temas katmanı."
            : "An AI SDR takes over the repetitive outbound layer: prospect research and enrichment, personalized email/LinkedIn sequences, follow-ups, qualifying inbound replies, booking meetings, and updating the CRM. In short — the high-volume, rule-able first-touch layer."}
        </p>

        <SectionTitle>{tr ? "Öne çıkan platformlar ve fiyat aralıkları" : "Leading platforms and price ranges"}</SectionTitle>
        <ul className="space-y-2.5">
          {(tr ? TOOLS : TOOLS_EN).map((tool) => (
            <li key={tool.name} className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5">
              <span className="font-medium text-ink">{tool.name}</span>
              <span className="shrink-0 text-sm tabular-nums text-ink-faint">{tool.price}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm">
          {tr
            ? "Ek olarak Apollo.io (veritabanı + dizileme, ~$49/kullanıcı/ay’dan) ve Qualified/Piper (gelen ziyaretçi nitelendirme, özel fiyat) gibi seçenekler var. 11x ve Artisan çok kanallı ve veri-yoğunken, AiSDR ve Salesforge daha çok e-posta odaklı; Regie.ai ve Relevance AI ise tam otonomiden çok “insan kontrollü” araçlar."
            : "Apollo.io (database + sequencing, from ~$49/user/mo) and Qualified/Piper (inbound visitor qualification, custom pricing) are also worth knowing. 11x and Artisan are multi-channel and data-heavy, AiSDR and Salesforge lean email-first, while Regie.ai and Relevance AI are more “human-in-the-loop” than fully autonomous."}
        </p>

        <SectionTitle>{tr ? "Fiyat modelleri ve gizli maliyetler" : "Pricing models and hidden costs"}</SectionTitle>
        <p>
          {tr
            ? "Abonelikler ayda 599 dolardan 10.000+ dolara uzanıyor. Alternatif modeller: toplantı başına ($30–$500), kişi/işleme başına, e-posta başına. Sık unutulan gizli kalemler: e-posta altyapısı, veri zenginleştirme, ek CRM koltukları ve kurulum/onboarding ($2.000–$10.000)."
            : "Subscriptions run from $599 to $10,000+/month. Alternative models: per-meeting ($30–$500), per-contact, per-email. Easily-missed hidden costs: email infrastructure, data enrichment, extra CRM seats, and setup/onboarding ($2,000–$10,000)."}
        </p>

        <SectionTitle>{tr ? "Gerçekçi sonuçlar" : "Realistic results"}</SectionTitle>
        <p>
          {tr
            ? "Tahmin edilebilir sonuç için 60–90 günlük bir olgunlaşma süresi gerçekçi. Optimize edildikten sonra tipik aralıklar: e-posta açılma %40–50, yanıt %3–5, kişi başına toplantı %0,5–1, toplantı katılım %60–70, toplantı maliyeti $200–400. Kazanç çoğunlukla hacimde: 3–5 kat dış erişim kapasitesi. “Anında ROI” söylemi pazarlama; gerçek sonuç 2–3 ayda gelir."
            : "Expect a realistic 60–90 day ramp before predictable results. After optimization, typical ranges: 40–50% open rate, 3–5% reply, 0.5–1% meetings per contact, 60–70% show rate, $200–400 cost per meeting. The win is mostly volume: 3–5× outbound capacity. “Instant ROI” is marketing — real results land in 2–3 months."}
        </p>

        <SectionTitle>{tr ? "En iyisi hibrit yaklaşım" : "The hybrid approach wins"}</SectionTitle>
        <p>
          {tr
            ? "Çoğu ekip için en iyi sonuç hibritle geliyor: AI ilk teması ve nitelendirmeyi yapar, insan önemli konuşmaları devralır. AI SDR; sık karşılaşılan itirazlarda ve ilk nitelendirmede güçlü, karmaşık/yaratıcı müzakerelerde zayıf. AI adoption özellikle hacim insan kapasitesini aştığında, kanıtlı bir playbook varsa, yanıt hızı kritikse ve anlaşma değeri ~$5.000–$100.000 bandındaysa mantıklı."
            : "For most teams the best outcome is hybrid: AI handles first touch and qualification, humans take the conversations that matter. AI SDRs are strong on common objections and initial qualification, weak on complex/creative negotiation. Adoption makes most sense when volume exceeds human capacity, a proven playbook exists, response speed matters, and deal values sit around $5,000–$100,000."}
        </p>
      </div>

      {/* Kiwi note + attribution */}
      <div className="mt-12 rounded-2xl border border-line bg-canvas-deep/50 p-7">
        <p className="text-[15px] leading-relaxed text-ink">
          {tr
            ? "Kiwi AI Lab’de hangi aracın işinize oturduğunu birlikte seçer, kurulumunu yapar ve Crew OS içinde ölçülebilir bir akışa bağlarız — araç değil, sonuç teslim ederiz."
            : "At Kiwi AI Lab we help you pick the tool that fits, set it up, and wire it into a measurable flow inside Crew OS — we ship outcomes, not tools."}
        </p>
        <a
          href="/#contact"
          data-cursor="hover"
          className="group mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
        >
          {tr ? "Ücretsiz keşif görüşmesi al" : "Book a free discovery call"}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
      <p className="mt-6 text-xs text-ink-faint">
        {tr ? "Kaynak / ilham: " : "Source / inspiration: "}
        <a href={SOURCE} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
          whitespacesolutions.ai
        </a>
        {tr
          ? " — platform listesi, fiyat ve metrik aralıkları kaynaktan derlenmiştir."
          : " — platform list, pricing and metric ranges drawn from the source."}
      </p>
    </article>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="!mt-10 font-display text-[clamp(1.4rem,3vw,2rem)] text-ink">{children}</h2>;
}
