"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import styles from "./PhoneMockups.module.css";

/**
 * Mobil uygulama telefon mockup'ları — 4 iPhone ekranı (Üye ana ekran · randevu ·
 * antrenör yoklama · üye gelişim). En yüksek craft: co-located CSS Module ile
 * artifact `.phone`/`.ph-*` birebir port (PHASE-15 §2). Ekran içi metin **sabit TR**
 * (gerçek ürün ekranı görüntüsü — i18n-DIŞI); her telefon `dir="ltr"` (RTL'de bozulmaz).
 * Yalnız bölüm başlığı/altyazısı + telefon altı `cap` etiketleri 5-dil i18n.
 */

/** Scoped CSS Module sınıflarını birleştir (`cx("ph-btn","ghost")` → compound selector). */
const cx = (...names: string[]) => names.map((n) => styles[n]).filter(Boolean).join(" ");

/* ---- Paylaşılan parçalar (her telefonda tekrar eden) ---- */

/** iOS status bar — 4 ekranda aynı; tümü dekoratif (aria-hidden). */
function StatusBar() {
  return (
    <div className={cx("ph-status")}>
      <span className={cx("time")}>9:41</span>
      <span className={cx("icons")} aria-hidden>
        <svg className={cx("sig")} viewBox="0 0 18 12">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0.5" width="3" height="11.5" rx="1" />
        </svg>
        <svg className={cx("wifi")} viewBox="0 0 16 13">
          <path d="M1 4.3a10 10 0 0 1 14 0" />
          <path d="M3.6 6.9a6.3 6.3 0 0 1 8.8 0" />
          <path d="M6.1 9.5a2.7 2.7 0 0 1 3.8 0" />
          <circle cx="8" cy="11.7" r="1" />
        </svg>
        <svg className={cx("batt")} viewBox="0 0 26 13">
          <rect className={cx("bo")} x="0.6" y="1.2" width="21" height="10.6" rx="3" />
          <rect className={cx("bf")} x="2.2" y="2.8" width="16" height="7.4" rx="1.6" />
          <rect className={cx("bn")} x="23" y="4.4" width="2" height="4.2" rx="1" />
        </svg>
      </span>
    </div>
  );
}

/** Alt tab bar — dekoratif ikonlar; etiketler sabit TR (ekran içi metin). */
type TabIcon =
  | "home"
  | "calendar"
  | "progress"
  | "nutrition"
  | "profile"
  | "today"
  | "students";

const TAB_PATHS: Record<TabIcon, ReactNode> = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
      <line x1="8" y1="3" x2="8" y2="6.5" />
      <line x1="16" y1="3" x2="16" y2="6.5" />
    </>
  ),
  progress: <path d="M4 14.5l4.5-5 3.5 3.5 7-8" />,
  nutrition: (
    <>
      <path d="M20 4C9 4 4 10 4 20c10 0 16-5 16-16Z" />
      <path d="M4 20c3-6 7-9 12-11" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5.5 20c1-4 12-4 13 0" />
    </>
  ),
  today: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19" />
    </>
  ),
  students: (
    <>
      <circle cx="9.5" cy="8.5" r="3.2" />
      <path d="M3 19.5c1-3.6 11-3.6 12 0" />
      <path d="M16.5 6.2a3.2 3.2 0 0 1 0 5.6" />
    </>
  ),
};

type Tab = { icon: TabIcon; label: string; on?: boolean };

function TabBar({ tabs }: { tabs: Tab[] }) {
  return (
    <div className={cx("ph-tabs")}>
      {tabs.map((tab, i) => (
        <div key={i} className={tab.on ? cx("ph-tab", "on") : cx("ph-tab")}>
          <svg viewBox="0 0 24 24" aria-hidden>
            {TAB_PATHS[tab.icon]}
          </svg>
          <span>{tab.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Üye alt tab seti (ana/randevu/gelişim/beslenme/profil) — `active` = vurgulu index. */
function memberTabs(active: number): Tab[] {
  return [
    { icon: "home", label: "Ana" },
    { icon: "calendar", label: "Randevu" },
    { icon: "progress", label: "Gelişim" },
    { icon: "nutrition", label: "Beslenme" },
    { icon: "profile", label: "Profil" },
  ].map((t, i) => ({ ...t, on: i === active }) as Tab);
}

const trainerTabs: Tab[] = [
  { icon: "today", label: "Bugün", on: true },
  { icon: "calendar", label: "Takvim" },
  { icon: "students", label: "Öğrenci" },
  { icon: "profile", label: "Profil" },
];

/* ---- Telefon çerçevesi ---- */

/**
 * Metal çerçeve + ekran kabuğu. `dir="ltr"` telefonda zorlanır (ekran-görüntüsü
 * semantiği — AR sayfada bile içerik LTR). Alt `cap` etiketi çerçeve dışında kalır →
 * sayfa yönünü (RTL dahil) izler.
 */
function Phone({
  cap,
  tabs,
  children,
}: {
  cap: { role: string; screen: string };
  tabs: Tab[];
  children: ReactNode;
}) {
  return (
    <div className={cx("phone-wrap")} data-reveal>
      <div className={cx("phone")} dir="ltr">
        <div className={cx("ph-screen")}>
          <StatusBar />
          <div className={cx("ph-app")}>{children}</div>
          <TabBar tabs={tabs} />
        </div>
      </div>
      <p className="text-[12.5px] font-semibold text-ink-soft">
        <b className="font-bold text-green">{cap.role}</b> · {cap.screen}
      </p>
    </div>
  );
}

/* ---- Bölüm ---- */

export default function PhoneMockups() {
  const t = useTranslations("alpfit");
  const cap = (k: string) => ({
    role: t(`app.caps.${k}.role`),
    screen: t(`app.caps.${k}.screen`),
  });

  return (
    <section
      id="uygulama"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
    >
      {/* Section head */}
      <Reveal className="mb-14 max-w-[64ch]">
        <p
          data-reveal
          className="mb-[18px] inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-green before:h-0.5 before:w-5 before:rounded-[2px] before:bg-current before:opacity-55 before:content-['']"
        >
          {t("app.eyebrow")}
        </p>
        <h2
          data-reveal
          className="font-display text-[clamp(30px,4.2vw,44px)] font-semibold leading-[1.08] tracking-[-0.021em] text-balance"
        >
          {t("app.title")}
        </h2>
        <p
          data-reveal
          className="mt-[18px] max-w-[58ch] text-[18.5px] leading-[1.55] text-ink-soft"
        >
          {t("app.sub")}
        </p>
      </Reveal>

      {/* 4 telefon mockup — içerik sabit TR (ekran-görüntüsü), her telefon dir="ltr" */}
      <Reveal stagger={0.08} y={24}>
        <div className={cx("phones")}>
          {/* 1 · Üye ana ekran */}
          <Phone cap={cap("memberHome")} tabs={memberTabs(0)}>
            <div className={cx("ph-hi")}>Merhaba, Deniz</div>
            <div className={cx("ph-mem")}>
              <div className={cx("ph-mem-row")}>
                <b>Aylık Üyelik</b>
                <span className={cx("ph-pill")}>Aktif</span>
              </div>
              <div className={cx("ph-mem-bar")}>
                <i style={{ width: "62%" }} />
              </div>
              <div className={cx("ph-mem-sub")}>12 gün kaldı</div>
            </div>
            <div className={cx("ph-label")}>Sıradaki randevu</div>
            <div className={cx("ph-card")}>
              <div className={cx("ph-card-t")}>Reformer Pilates</div>
              <div className={cx("ph-card-s")}>Bugün · 18:00 · Alper ile</div>
            </div>
            <div className={cx("ph-actions")}>
              <div className={cx("ph-btn")}>Randevu Al</div>
              <div className={cx("ph-btn", "ghost")}>Grup Bul</div>
            </div>
          </Phone>

          {/* 2 · Üye randevu al */}
          <Phone cap={cap("memberBooking")} tabs={memberTabs(1)}>
            <div className={cx("ph-head")}>Randevu Al</div>
            <div className={cx("ph-days")}>
              <div className={cx("ph-day")}>
                <span>Pzt</span>
                <b>14</b>
              </div>
              <div className={cx("ph-day")}>
                <span>Sal</span>
                <b>15</b>
              </div>
              <div className={cx("ph-day", "on")}>
                <span>Çar</span>
                <b>16</b>
              </div>
              <div className={cx("ph-day")}>
                <span>Per</span>
                <b>17</b>
              </div>
              <div className={cx("ph-day")}>
                <span>Cum</span>
                <b>18</b>
              </div>
            </div>
            <div className={cx("ph-label")}>Uygun saatler · Alper</div>
            <div className={cx("ph-slots")}>
              <div className={cx("ph-slot")}>
                09:00 <span className={cx("t")}>Müsait</span>
              </div>
              <div className={cx("ph-slot", "off")}>
                10:00 <span className={cx("t")}>Dolu</span>
              </div>
              <div className={cx("ph-slot")}>
                17:00 <span className={cx("t")}>Müsait</span>
              </div>
              <div className={cx("ph-slot", "on")}>
                18:00 <span className={cx("t")}>Seçildi</span>
              </div>
            </div>
            <div className={cx("ph-btn", "full")} style={{ marginTop: "auto" }}>
              18:00&apos;i onayla
            </div>
          </Phone>

          {/* 3 · Antrenör bugün & yoklama */}
          <Phone cap={cap("trainer")} tabs={trainerTabs}>
            <div className={cx("ph-head")}>
              Bugün <span>16 Tem</span>
            </div>
            <div className={cx("ph-strip")}>
              <div className={cx("ph-stat")}>
                <b>5</b>
                <span>Seans</span>
              </div>
              <div className={cx("ph-stat")}>
                <b>2</b>
                <span>Grup</span>
              </div>
              <div className={cx("ph-stat")}>
                <b>%88</b>
                <span>Doluluk</span>
              </div>
            </div>
            <div className={cx("ph-label")}>18:00 · Reformer — Yoklama</div>
            <div className={cx("ph-att")}>
              <div className={cx("ph-att-row")}>
                <div className={cx("ph-av")}>DY</div>
                <div className={cx("nm")}>Deniz Y.</div>
                <div className={cx("ph-tick", "yes")}>Geldi</div>
              </div>
              <div className={cx("ph-att-row")}>
                <div className={cx("ph-av")}>SK</div>
                <div className={cx("nm")}>Selin K.</div>
                <div className={cx("ph-tick", "yes")}>Geldi</div>
              </div>
              <div className={cx("ph-att-row")}>
                <div className={cx("ph-av")}>MA</div>
                <div className={cx("nm")}>Mert A.</div>
                <div className={cx("ph-tick", "no")}>Gelmedi</div>
              </div>
            </div>
          </Phone>

          {/* 4 · Üye gelişim */}
          <Phone cap={cap("memberProgress")} tabs={memberTabs(2)}>
            <div className={cx("ph-head")}>Gelişim</div>
            <div className={cx("ph-chart")}>
              <div className={cx("cap")}>
                <b>72,4 kg</b>
                <span>▼ 2,1 kg · 8 hafta</span>
              </div>
              <svg viewBox="0 0 220 92" role="img" aria-label="Kilo grafiği">
                <line className={cx("grid")} x1="0" y1="24" x2="220" y2="24" />
                <line className={cx("grid")} x1="0" y1="48" x2="220" y2="48" />
                <line className={cx("grid")} x1="0" y1="72" x2="220" y2="72" />
                <path
                  d="M8 30 L44 40 L80 36 L116 52 L152 50 L188 64 L212 60 L212 88 L8 88 Z"
                  fill="url(#phg)"
                />
                <path
                  className={cx("ln")}
                  d="M8 30 L44 40 L80 36 L116 52 L152 50 L188 64 L212 60"
                />
                <circle className={cx("dot")} cx="212" cy="60" r="3.6" />
                <defs>
                  <linearGradient id="phg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#1c7a3b" stopOpacity=".22" />
                    <stop offset="1" stopColor="#1c7a3b" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={cx("ph-strip")}>
              <div className={cx("ph-stat")}>
                <b>%18</b>
                <span>Yağ</span>
              </div>
              <div className={cx("ph-stat")}>
                <b>34</b>
                <span>Kas kg</span>
              </div>
              <div className={cx("ph-stat")}>
                <b>78</b>
                <span>Bel cm</span>
              </div>
            </div>
          </Phone>
        </div>
      </Reveal>
    </section>
  );
}
