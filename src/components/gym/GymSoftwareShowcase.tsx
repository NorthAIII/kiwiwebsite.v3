"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import LivingFlow from "@/components/living-flow/LivingFlow";
import FlowScrim from "@/components/living-flow/FlowScrim";
import Reveal from "@/components/Reveal";

const FEATURES_TR = [
  { t: "Üyelik & paketler", d: "Üyelik tipleri, dondurma, yenileme ve paket yönetimi tek yerde." },
  { t: "Ödeme & tahsilat", d: "Otomatik tahsilat takibi, gecikme hatırlatması ve tahsilat raporu." },
  { t: "Yoklama & giriş", d: "QR/turnike ile giriş, anlık doluluk ve yoklama geçmişi." },
  { t: "Ders & PT takvimi", d: "Grup dersleri, PT randevuları ve eğitmen takvimi — çakışmasız rezervasyon." },
  { t: "Otomatik mesajlaşma", d: "WhatsApp/SMS ile hatırlatma, onay ve kampanya — elle uğraşmadan." },
  { t: "Kaçan üye geri kazanım", d: "Giriş yapmayan üyeye otomatik kişisel teklif ve dönüş takibi." },
  { t: "Raporlar & panel", d: "Gelir, üye, doluluk ve eğitmen performansı tek gösterge panelinde." },
  { t: "Personel & yetki", d: "Rol bazlı yetki, vardiya ve personel yönetimi." },
];
const FEATURES_EN = [
  { t: "Memberships & plans", d: "Membership types, freezes, renewals and plans — managed in one place." },
  { t: "Payments & billing", d: "Automatic billing tracking, overdue reminders and collection reports." },
  { t: "Check-in & access", d: "QR/turnstile entry, live occupancy and attendance history." },
  { t: "Class & PT calendar", d: "Group classes, PT appointments and trainer calendars — conflict-free booking." },
  { t: "Automated messaging", d: "Reminders, confirmations and campaigns over WhatsApp/SMS — hands-off." },
  { t: "Member win-back", d: "Automatic tailored offers and return follow-up for lapsed members." },
  { t: "Reports & dashboard", d: "Revenue, members, occupancy and trainer performance in one dashboard." },
  { t: "Staff & roles", d: "Role-based permissions, shifts and staff management." },
];

const SHOTS = [
  { tr: "Çok-şube gösterge paneli", en: "Multi-branch dashboard", src: "/gym/dashboard.png" },
  { tr: "Üye profili", en: "Member profile", src: "/gym/member.png" },
  { tr: "Ders & PT takvimi", en: "Class & PT calendar", src: "/gym/calendar.png" },
  { tr: "Kampanya & mesajlaşma", en: "Campaigns & messaging", src: "/gym/messaging.png" },
];

export default function GymSoftwareShowcase() {
  const locale = useLocale();
  const tr = locale === "tr";
  const features = tr ? FEATURES_TR : FEATURES_EN;

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative flex min-h-[68svh] items-center overflow-hidden">
        <LivingFlow />
        <FlowScrim />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-10">
          <Reveal className="max-w-3xl">
            <p
              data-reveal
              className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-green"
            >
              <span className="h-px w-8 bg-green/50" />
              {tr ? "Sektöre özel ürün" : "Sector-specific product"}
            </p>
            <h1 data-reveal className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1]">
              {tr ? "Spor Salonu Yönetim Yazılımı" : "Gym Management Software"}
            </h1>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {tr
                ? "Üyelikten ödemeye, yoklamadan ders takvimine ve otomatik mesajlaşmaya kadar bir spor salonunun tüm operasyonunu tek panelde yöneten, sektöre özel kapsamlı bir yazılım."
                : "A comprehensive, sector-specific platform that runs a gym's entire operation in one panel — from memberships and payments to check-ins, scheduling and automated messaging."}
            </p>
            <a
              data-reveal
              href="/#contact"
              data-cursor="hover"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
            >
              {tr ? "Ücretsiz keşif görüşmesi al" : "Book a free discovery call"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mb-12 max-w-2xl">
          <h2 data-reveal className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05]">
            {tr ? "Uygulama ne işe yarar?" : "What the app does"}
          </h2>
        </Reveal>
        <Reveal className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {features.map((f) => (
            <div key={f.t} data-reveal className="bg-canvas p-6">
              <span className="mb-4 grid h-9 w-9 place-items-center rounded-full border border-line text-green">
                <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden>
                  <circle cx="8" cy="8" r="2.3" fill="currentColor" />
                  <path d="M2 8h3M11 8h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className="mb-2 font-display text-lg">{f.t}</h3>
              <p className="text-[14px] leading-relaxed text-ink-soft">{f.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Interfaces / screenshots */}
      <section className="border-t border-line bg-canvas-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="mb-12 max-w-2xl">
            <p data-reveal className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green">
              {tr ? "Arayüzler" : "Interfaces"}
            </p>
            <h2 data-reveal className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05]">
              {tr ? "Yazılımın içinden" : "Inside the software"}
            </h2>
            <p data-reveal className="mt-4 text-lg text-ink-soft">
              {tr
                ? "Alpfit demosundan gerçek ürün arayüzleri — çok-şube panelinden takvime ve mesajlaşmaya."
                : "Real product interfaces from the Alpfit demo — from the multi-branch panel to scheduling and messaging."}
            </p>
          </Reveal>

          <Reveal className="grid gap-6 sm:grid-cols-2" stagger={0.08}>
            {SHOTS.map((s) => (
              <figure
                key={s.src}
                data-reveal
                className="group relative overflow-hidden rounded-2xl border border-line bg-canvas"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.src}
                    alt={tr ? s.tr : s.en}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="flex items-center justify-between border-t border-line px-5 py-3 text-sm">
                  <span className="font-medium text-ink">{tr ? s.tr : s.en}</span>
                  <span className="text-xs uppercase tracking-[0.12em] text-ink-faint">Alpfit demo</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-line bg-canvas p-10">
          <h2 className="max-w-md font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-tight">
            {tr ? "Salonunuza özel kurulalım." : "Let's set it up for your gym."}
          </h2>
          <a
            href="/#contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
          >
            {tr ? "Görüşme al" : "Book a call"}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
