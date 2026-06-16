"use client";

import { useLocale } from "next-intl";

const SOURCE = "https://www.anthropic.com/news";

const MODELS = [
  { name: "Claude Opus 4.8", note: "amiral gemisi", ctx: "1M", io: "$5 / $25" },
  { name: "Claude Fable 5", note: "en yetenekli", ctx: "1M", io: "$10 / $50" },
  { name: "Claude Sonnet 4.6", note: "hız + zekâ", ctx: "1M", io: "$3 / $15" },
  { name: "Claude Haiku 4.5", note: "en hızlı / ekonomik", ctx: "200K", io: "$1 / $5" },
];
const MODELS_EN = [
  { name: "Claude Opus 4.8", note: "flagship", ctx: "1M", io: "$5 / $25" },
  { name: "Claude Fable 5", note: "most capable", ctx: "1M", io: "$10 / $50" },
  { name: "Claude Sonnet 4.6", note: "speed + intelligence", ctx: "1M", io: "$3 / $15" },
  { name: "Claude Haiku 4.5", note: "fastest / most economical", ctx: "200K", io: "$1 / $5" },
];

export default function ArticleClaude() {
  const locale = useLocale();
  const tr = locale === "tr";

  return (
    <article className="mx-auto max-w-2xl px-6 pb-32 pt-32 lg:pt-40">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green">
        {tr ? "Haber · Modeller" : "News · Models"}
      </p>
      <h1 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]">
        {tr
          ? "Claude’un yeni modelleri: Opus 4.8 ve Fable 5 otomasyon için ne değiştiriyor"
          : "Claude’s new models: what Opus 4.8 and Fable 5 change for automation"}
      </h1>
      <p className="mt-4 text-sm text-ink-faint">
        {tr ? "5 dk okuma · Kiwi AI Lab" : "5 min read · Kiwi AI Lab"}
      </p>

      <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink-soft">
        <p>
          {tr
            ? "Anthropic’in Claude ailesi büyüdü. İki model öne çıkıyor: günlük işin amiral gemisi Claude Opus 4.8 ve en zorlu, uzun soluklu görevler için en yetenekli model Claude Fable 5. İkisi de bizim için teknik bir merak değil — otomasyonun neyi güvenilir biçimde yapabileceğini doğrudan belirliyor."
            : "Anthropic’s Claude family has grown. Two models stand out: Claude Opus 4.8, the flagship for everyday work, and Claude Fable 5, the most capable model for the hardest, long-horizon tasks. For us these aren’t a technical curiosity — they directly set what automation can reliably do."}
        </p>

        <SectionTitle>{tr ? "Güncel model hattı" : "The current lineup"}</SectionTitle>
        <div className="overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 bg-canvas-deep/60 px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-ink-faint">
            <span>{tr ? "Model" : "Model"}</span>
            <span className="text-right">{tr ? "Bağlam" : "Context"}</span>
            <span className="text-right">{tr ? "G/Ç ·1M$" : "I/O ·1M$"}</span>
          </div>
          {(tr ? MODELS : MODELS_EN).map((m) => (
            <div
              key={m.name}
              className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 border-t border-line px-5 py-3"
            >
              <span>
                <span className="font-medium text-ink">{m.name}</span>
                <span className="ml-2 text-sm text-ink-faint">· {m.note}</span>
              </span>
              <span className="text-right text-sm tabular-nums text-ink-soft">{m.ctx}</span>
              <span className="text-right text-sm tabular-nums text-ink-faint">{m.io}</span>
            </div>
          ))}
        </div>
        <p className="text-sm">
          {tr
            ? "Fiyatlar milyon token başına giriş/çıkış. Opus 4.8 ve Fable 5, uzun bağlam için ek ücret olmadan 1 milyon token’lık bir bağlam penceresi sunuyor."
            : "Prices are per million input/output tokens. Opus 4.8 and Fable 5 both offer a 1M-token context window with no long-context premium."}
        </p>

        <SectionTitle>{tr ? "Opus 4.8 — günlük işin beyni" : "Opus 4.8 — the everyday workhorse"}</SectionTitle>
        <p>
          {tr
            ? "Opus 4.8, Opus serisinin en yetenekli modeli: yüksek özerklikle uzun soluklu ajan işlerinde, bilgi işinde ve hafıza gerektiren görevlerde güçlü. Pratikte bu, bir otomasyonun tek bir komutla daha çok adımı kendi başına ve doğru sırayla yürütebilmesi demek — yarıda bırakıp insana dönmeden. 1M bağlam, koca bir operasyonun kurallarını tek seferde modele verebilmek anlamına geliyor."
            : "Opus 4.8 is the most capable model in the Opus line: highly autonomous and strong at long-horizon agentic work, knowledge work, and memory-heavy tasks. In practice that means an automation can carry more steps on its own, in the right order, from a single instruction — without bailing back to a human midway. The 1M context means you can hand the model the rules of an entire operation in one shot."}
        </p>

        <SectionTitle>{tr ? "Fable 5 — en zorlu işler için" : "Fable 5 — for the hardest work"}</SectionTitle>
        <p>
          {tr
            ? "Fable 5, Anthropic’in geniş kapsamda yayınlanan en yetenekli modeli; en talepkâr akıl yürütme ve uzun soluklu ajan işleri için. Tek bir istek, zorlu görevlerde dakikalarca sürebiliyor — çünkü modelin akıl yürütmesi her zaman açık. Maliyeti Opus’un üzerinde, bu yüzden onu rutin işe değil; çok adımlı, yüksek değerli ve hata payı dar olan otomasyonlara saklıyoruz."
            : "Fable 5 is Anthropic’s most capable widely released model, for the most demanding reasoning and long-horizon agentic work. A single request can run for minutes on hard tasks — its reasoning is always on. It costs more than Opus, so we reserve it for multi-step, high-value automations where the margin for error is thin, not for routine work."}
        </p>

        <SectionTitle>{tr ? "İşiniz için ne anlama geliyor?" : "What it means for your business"}</SectionTitle>
        <p>
          {tr
            ? "Daha yetenekli model her zaman doğru cevap değil. Çoğu otomasyon adımı için Opus 4.8 (ya da daha hafif işlerde Sonnet/Haiku) hem yeterli hem daha ekonomik; gerçekten zor olan adımları Fable 5’e yönlendirmek maliyeti ve kaliteyi birlikte dengeliyor. Biz bir akış kurarken her adımı doğru modele eşleştiriyoruz — ‘en pahalısını her yere koy’ değil, ‘işi en uygun maliyetle bitir’."
            : "The most capable model isn’t always the right answer. For most automation steps Opus 4.8 (or Sonnet/Haiku for lighter work) is both sufficient and more economical; routing only the genuinely hard steps to Fable 5 balances cost and quality. When we build a flow we match each step to the right model — not ‘use the most expensive one everywhere,’ but ‘get the job done at the right cost.’"}
        </p>
      </div>

      {/* Kiwi note + attribution */}
      <div className="mt-12 rounded-2xl border border-line bg-canvas-deep/50 p-7">
        <p className="text-[15px] leading-relaxed text-ink">
          {tr
            ? "Kiwi AI Lab’de otomasyonlarınızı bu modellerin üstüne kurar, her adımı doğru modele bağlar ve sonucu Bunker OS içinde ölçeriz — model değil, sonuç teslim ederiz."
            : "At Kiwi AI Lab we build your automations on these models, route each step to the right one, and measure the result inside Bunker OS — we ship outcomes, not models."}
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
        {tr ? "Kaynak: " : "Source: "}
        <a href={SOURCE} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
          anthropic.com
        </a>
        {tr
          ? " — model adları, bağlam pencereleri ve fiyatlar Anthropic’in resmi duyurularına dayanmaktadır."
          : " — model names, context windows and pricing per Anthropic’s official announcements."}
      </p>
    </article>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="!mt-10 font-display text-[clamp(1.4rem,3vw,2rem)] text-ink">{children}</h2>;
}
