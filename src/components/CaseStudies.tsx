"use client";

import { useLocale } from "next-intl";
import Reveal from "./Reveal";

type Study = {
  sectorTr: string;
  sectorEn: string;
  titleTr: string;
  titleEn: string;
  problemTr: string;
  problemEn: string;
  builtTr: string;
  builtEn: string;
  metric: string;
  metricLabelTr: string;
  metricLabelEn: string;
};

const STUDIES: Study[] = [
  {
    sectorTr: "Spor salonu",
    sectorEn: "Gym",
    titleTr: "Kaçan üyeyi geri kazanma",
    titleEn: "Winning back lapsed members",
    problemTr:
      "30 gündür giriş yapmayan üyeler elle takip edilemiyor; sessiz iptaller fark edilmeden birikiyor.",
    problemEn:
      "Members who haven’t checked in for 30 days can’t be tracked by hand; silent cancellations pile up unnoticed.",
    builtTr:
      "Giriş verisinden tetiklenen bir dönüş akışı kurduk: riskli üyeye kişisel bir teklif ve PT randevu önerisi WhatsApp’tan gider, dönüş takip edilir.",
    builtEn:
      "We built a win-back flow triggered by check-in data: an at-risk member gets a tailored offer and a PT slot suggestion over WhatsApp, and the return is tracked.",
    metric: "+%18",
    metricLabelTr: "geri dönen kaçan üye",
    metricLabelEn: "lapsed members recovered",
  },
  {
    sectorTr: "Klinik",
    sectorEn: "Clinic",
    titleTr: "Gelmeyen randevuyu kurtarma",
    titleEn: "No-show recovery",
    problemTr:
      "Onaylanmayan randevular boş geçiyor, takvim doluluğu düşük kalıyor.",
    problemEn:
      "Unconfirmed appointments go empty and calendar utilization stays low.",
    builtTr:
      "İki adımlı bir hatırlatma kurduk; slot boş kalırsa otomatik olarak bekleme listesine açılıyor — takvim kendini dolduruyor.",
    builtEn:
      "We set up a two-step reminder; if a slot stays open it’s auto-offered to the waitlist — the calendar fills itself.",
    metric: "%42",
    metricLabelTr: "daha az boş slot",
    metricLabelEn: "fewer empty slots",
  },
  {
    sectorTr: "E-ticaret",
    sectorEn: "E-commerce",
    titleTr: "Sepeti gerçekten kurtaran konuşma",
    titleEn: "Cart recovery that actually converts",
    problemTr:
      "Terk edilen sepetler kupon bombardımanıyla geri kazanılmaya çalışılıyor; dönüş zayıf.",
    problemEn:
      "Abandoned carts are chased with coupon blasts; conversion is weak.",
    builtTr:
      "Bir saat sonra gerçek itirazı yanıtlayan bir konuşma başlatıyoruz ve ödeme linkini aynı yazışmada iletiyoruz.",
    builtEn:
      "An hour later we open a conversation that answers the real objection and routes the payment link back in the same thread.",
    metric: "+%18",
    metricLabelTr: "kurtarılan ciro",
    metricLabelEn: "recovered revenue",
  },
  {
    sectorTr: "Emlak",
    sectorEn: "Real estate",
    titleTr: "Dakikalar içinde adaydan görüntülemeye",
    titleEn: "Lead-to-viewing in minutes",
    problemTr:
      "Portal talepleri geç yanıtlanıyor; aday rakip aramadan önce kaçıyor.",
    problemEn:
      "Portal inquiries are answered late; the lead is gone before a competitor calls back.",
    builtTr:
      "Her talebi niteleyen, canlı ilanlarla eşleştiren ve bir görüntüleme slotu öneren bir akış kurduk — danışman yalnızca hazır alıcıyı görüyor.",
    builtEn:
      "We built a flow that qualifies each inquiry, matches it to live listings, and offers a viewing slot — the agent only sees ready buyers.",
    metric: "9×",
    metricLabelTr: "daha hızlı ilk yanıt",
    metricLabelEn: "faster first response",
  },
  {
    sectorTr: "Eğitim & danışmanlık",
    sectorEn: "Education & consulting",
    titleTr: "Adaydan kayda otomatik takip",
    titleEn: "Lead-to-enrollment follow-up",
    problemTr:
      "Form dolduran adaylar elle takip edilemiyor; kayıt dönüşümü düşük.",
    problemEn:
      "Form fills can’t be followed up by hand; enrollment conversion is low.",
    builtTr:
      "Her adayı anında niteleyip programa uygun bilgiyi WhatsApp’tan iletiyoruz ve bir danışmanlık görüşmesi planlıyoruz — takip kayda dek kendiliğinden ilerliyor.",
    builtEn:
      "We qualify each lead instantly, send the right program info on WhatsApp, and book a consultation — the follow-up runs itself until enrollment.",
    metric: "+%27",
    metricLabelTr: "daha yüksek kayıt dönüşümü",
    metricLabelEn: "higher enrollment conversion",
  },
  {
    sectorTr: "Restoran & kafe",
    sectorEn: "Restaurant & café",
    titleTr: "Rezervasyon onayı, no-show’u kapatma",
    titleEn: "Reservation confirms, closing no-shows",
    problemTr:
      "Telefon trafiği yoğun; iptal olan masa boş kalıyor.",
    problemEn:
      "Phone traffic is heavy; a cancelled table sits empty.",
    builtTr:
      "Otomatik onay ve hatırlatma gönderiyoruz; iptalde slot bekleme listesine açılıyor, düzenli misafire kişisel kampanya iletiliyor.",
    builtEn:
      "We send automatic confirmations and reminders; on cancellation the slot opens to the waitlist and regulars get a tailored offer.",
    metric: "%35",
    metricLabelTr: "daha az gelmeyen rezervasyon",
    metricLabelEn: "fewer no-show reservations",
  },
];

export default function CaseStudies() {
  const locale = useLocale();
  const tr = locale === "tr";

  return (
    <main className="pt-16">
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-24 lg:px-10 lg:pb-32 lg:pt-28">
        <Reveal className="mb-14 max-w-2xl">
          <p data-reveal className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green">
            {tr ? "Vaka çalışmaları" : "Case studies"}
          </p>
          <h1 data-reveal className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
            {tr ? "Sektör sektör, kurduğumuz otomasyon." : "Sector by sector, the automation we ship."}
          </h1>
          <p data-reveal className="mt-5 text-lg leading-relaxed text-ink-soft">
            {tr
              ? "Her vaka tek bir gerçek otomasyon: durum, kurduğumuz akış ve getirdiği sonuç. Rakamlar gerçek müşteri verisi gelene dek açıkça işaretlenmiş öngörülerdir."
              : "Each case is a single real automation: the situation, the flow we built, and the outcome. Figures are clearly marked projections until live client data replaces them."}
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {STUDIES.map((s) => (
            <Reveal key={s.titleEn}>
              <article
                data-reveal
                className="flex h-full flex-col rounded-3xl border border-line bg-canvas p-8 transition-colors hover:border-ink/20 lg:p-10"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-green">
                  {tr ? s.sectorTr : s.sectorEn}
                </p>
                <h2 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.1]">
                  {tr ? s.titleTr : s.titleEn}
                </h2>

                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                  <p>
                    <span className="font-medium text-ink">{tr ? "Durum. " : "Situation. "}</span>
                    {tr ? s.problemTr : s.problemEn}
                  </p>
                  <p>
                    <span className="font-medium text-ink">{tr ? "Kurduğumuz. " : "What we built. "}</span>
                    {tr ? s.builtTr : s.builtEn}
                  </p>
                </div>

                <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl text-green">{s.metric}</span>
                    <span className="max-w-[10rem] text-sm leading-tight text-ink-soft">
                      {tr ? s.metricLabelTr : s.metricLabelEn}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full border border-line px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                    {tr ? "Öngörü · örnek" : "Projected · sample"}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-start gap-5 rounded-3xl border border-line bg-canvas-deep/50 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <p data-reveal className="max-w-xl text-lg text-ink">
            {tr
              ? "Sizin sektörünüzde hangi tek otomasyon en çok zaman kazandırır? Birlikte bulalım."
              : "Which single automation would save the most time in your sector? Let’s find it together."}
          </p>
          <a
            data-reveal
            href="/#contact"
            data-cursor="hover"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
          >
            {tr ? "Ücretsiz keşif görüşmesi al" : "Book a free discovery call"}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </section>
    </main>
  );
}
