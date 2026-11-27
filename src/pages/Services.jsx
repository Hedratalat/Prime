import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import {
  categories,
  services,
  packages,
  PRICE_NOTE,
} from "../data/servicesData";

/* ------------------------------------------------------------------
   إعدادات الصفحة
   الأسعار الفردية في الشيت "مقترحة وتحتاج اعتماد الإدارة".
   لو لسه مش معتمدة خلّيها false وهيظهر "حسب الطلب" بدل السعر.
   أسعار الباقات "الأصلية محفوظة" فبتظهر دايمًا.
------------------------------------------------------------------- */
const SHOW_SERVICE_PRICES = true;

/* لون كل تصنيف (كلها من ألوان البراند). نص الكارت الفاتح بيستخدم dark */
const THEMES = {
  assess: {
    card: "bg-prime-dark text-white",
    sub: "text-white/75",
    line: "border-white/15",
    num: "text-white/[0.06]",
    icon: "bg-prime-terracotta text-white",
    sticker: "bg-prime-gold text-prime-dark",
    dot: "bg-prime-dark",
  },
  idea: {
    card: "bg-prime-terracotta text-white",
    sub: "text-white/90",
    line: "border-white/25",
    num: "text-white/10",
    icon: "bg-white/20 text-white",
    sticker: "bg-prime-gold text-prime-dark",
    dot: "bg-prime-terracotta",
  },
  menu: {
    card: "bg-prime-orange text-white",
    sub: "text-white/90",
    line: "border-white/25",
    num: "text-white/10",
    icon: "bg-white/20 text-white",
    sticker: "bg-prime-gold text-prime-dark",
    dot: "bg-prime-orange",
  },
  kitchen: {
    card: "bg-prime-gold text-prime-dark",
    sub: "text-prime-dark/80",
    line: "border-prime-dark/20",
    num: "text-prime-dark/10",
    icon: "bg-prime-dark text-prime-gold",
    sticker: "bg-prime-dark text-prime-gold",
    dot: "bg-prime-gold",
  },
  ops: {
    card: "bg-prime-rust text-white",
    sub: "text-white/90",
    line: "border-white/25",
    num: "text-white/10",
    icon: "bg-white/20 text-white",
    sticker: "bg-prime-gold text-prime-dark",
    dot: "bg-prime-rust",
  },
  team: {
    card: "bg-gradient-to-br from-prime-rust to-prime-dark text-white",
    sub: "text-white/85",
    line: "border-white/20",
    num: "text-white/[0.07]",
    icon: "bg-prime-gold text-prime-dark",
    sticker: "bg-prime-gold text-prime-dark",
    dot: "bg-gradient-to-br from-prime-rust to-prime-dark",
  },
  launch: {
    card: "bg-gradient-to-br from-prime-gold to-prime-terracotta text-prime-dark",
    sub: "text-prime-dark/85",
    line: "border-prime-dark/20",
    num: "text-prime-dark/10",
    icon: "bg-prime-dark text-white",
    sticker: "bg-prime-dark text-prime-gold",
    dot: "bg-gradient-to-br from-prime-gold to-prime-terracotta",
  },
};

/* أيقونات (stroke) */
const ICONS = {
  assess: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </>
  ),
  idea: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" />
    </>
  ),
  menu: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="1" />
      <circle cx="4.5" cy="12" r="1" />
      <circle cx="4.5" cy="18" r="1" />
    </>
  ),
  kitchen: (
    <>
      <path d="M4 11h16v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6z" />
      <path d="M2 11h20" />
      <path d="M9 7c0-1.5 1-1.5 1-3M14 7c0-1.5 1-1.5 1-3" />
    </>
  ),
  ops: (
    <>
      <path d="M3 6h10M19 6h2" />
      <circle cx="16" cy="6" r="3" />
      <path d="M3 12h3M12 12h9" />
      <circle cx="9" cy="12" r="3" />
      <path d="M3 18h9M18 18h3" />
      <circle cx="15" cy="18" r="3" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2c2.9.2 5 2.4 5 5.3" />
    </>
  ),
  launch: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h12l-2 4 2 4H5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  list: (
    <>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <path d="M3 6l1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  arrow: <path d="M19 12H5M11 6l-6 6 6 6" />,
};

function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} fill-none stroke-current`}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

const fmt = (n) => n.toLocaleString("en-US");
const pad = (n) => String(n).padStart(2, "0");

/* توحيد الحروف العربية عشان البحث يلاقي (ة/ه، ى/ي، أ/إ/ا) */
const norm = (t) =>
  t
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .trim();

/* ------------------------------------------------------------------
   Reveal / Counter / عناصر مشتركة (نفس اللي في About و Contact)
------------------------------------------------------------------- */
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = {
    up: "translate-y-10",
    right: "translate-x-10",
    left: "-translate-x-10",
    scale: "scale-95",
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : `opacity-0 ${hidden}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Counter({ to, prefix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVal(to);
      return;
    }
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} dir="ltr" className="font-latin">
      {prefix}
      {val}
    </span>
  );
}

function SectionTitle({ children, light = false }) {
  return (
    <div className="mb-6">
      <h2
        className={`font-arabic text-2xl font-extrabold md:text-4xl ${
          light ? "text-white" : "text-prime-dark"
        }`}
      >
        {children}
      </h2>
      <span
        className={`mt-3 block h-1 w-14 ${
          light ? "bg-white/80" : "bg-prime-terracotta"
        }`}
      />
    </div>
  );
}

function Eyebrow({ children, light = false, onGradient = false }) {
  const color = onGradient
    ? "text-white"
    : light
      ? "text-prime-orange"
      : "text-prime-terracotta";
  const line = onGradient
    ? "bg-white"
    : light
      ? "bg-prime-orange"
      : "bg-prime-terracotta";
  return (
    <span
      className={`font-latin mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] ${color}`}
    >
      <span className={`h-px w-10 ${line}`} />
      {children}
    </span>
  );
}

function Btn({ to, href, variant = "primary", children }) {
  const styles = {
    primary:
      "bg-prime-terracotta text-white shadow-md hover:bg-prime-rust hover:shadow-lg px-8 py-3.5",
    ghost:
      "border-2 border-white/40 text-white hover:border-white hover:bg-white/10 px-8 py-3",
    light:
      "bg-prime-cream text-prime-orange shadow-lg hover:bg-white px-10 py-3.5",
  }[variant];
  const cls = `inline-block text-center text-base font-bold transition-all ${styles}`;
  return to ? (
    <Link to={to} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

/* ستيكر السعر */
function PriceSticker({ value, unit, cls, big = false }) {
  const base = `inline-block -rotate-2 rounded-xl text-center shadow-md ${cls} ${
    big ? "px-5 py-3" : "px-3 py-1.5"
  }`;
  if (value === 0) {
    return <span className={`${base} text-sm font-extrabold`}>مجانًا</span>;
  }
  if (value === null) {
    return <span className={`${base} text-xs font-extrabold`}>حسب الطلب</span>;
  }
  return (
    <span className={base}>
      <span
        dir="ltr"
        className={`font-latin font-extrabold ${big ? "text-3xl" : "text-lg"}`}
      >
        {fmt(value)}
      </span>
      <span className={`mr-1 font-bold ${big ? "text-sm" : "text-[11px]"}`}>
        ر.س
      </span>
      {unit && (
        <span className="block text-[10px] font-semibold opacity-80">
          {unit}
        </span>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------
   كارت الخدمة (ملوّن حسب التصنيف)
------------------------------------------------------------------- */
function ServiceCard({ s }) {
  const t = THEMES[s.category];
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${t.card}`}
    >
      <span
        aria-hidden="true"
        className={`font-latin pointer-events-none absolute -bottom-6 -left-2 select-none text-8xl font-extrabold leading-none ${t.num}`}
      >
        {pad(s.n)}
      </span>

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${t.icon}`}
        >
          <Icon name={s.category} />
        </span>
        <PriceSticker
          value={SHOW_SERVICE_PRICES || s.price === 0 ? s.price : null}
          unit={s.unit}
          cls={t.sticker}
        />
      </div>

      <h3 className="relative mt-5 text-lg font-extrabold leading-[1.7]">
        {s.title}
      </h3>
      <p className={`relative mb-5 mt-2 text-sm leading-[2] ${t.sub}`}>
        {s.scope}
      </p>

      <div
        className={`relative mt-auto flex items-center gap-2 border-t pt-4 text-sm font-bold ${t.line}`}
      >
        <Icon name="clock" className="h-4 w-4" />
        مدة التنفيذ: {s.duration}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------
   الصفحة
------------------------------------------------------------------- */
export default function Services() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [pkgId, setPkgId] = useState(packages[0].id);

  const pkg = packages.find((p) => p.id === pkgId);
  const q = norm(query);

  const counts = useMemo(() => {
    const c = {};
    services.forEach((s) => (c[s.category] = (c[s.category] || 0) + 1));
    return c;
  }, []);

  const groups = useMemo(() => {
    const visible = services.filter(
      (s) =>
        (active === "all" || s.category === active) &&
        (!q || norm(`${s.title} ${s.scope}`).includes(q)),
    );
    return categories
      .map((c) => ({ c, items: visible.filter((s) => s.category === c.id) }))
      .filter((g) => g.items.length);
  }, [active, q]);

  const goTo = (id) => {
    setActive(id);
    setQuery("");
    setTimeout(() => {
      document
        .getElementById("all-services")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const stats = [
    { to: services.length, label: "خدمة منفردة بنطاق وسعر ومدة واضحة" },
    { to: categories.length, label: "مجالات تشغيلية تغطي رحلة المشروع" },
    { to: packages.length, label: "باقات جاهزة بحسب مرحلة مشروعك" },
    { text: "مجانًا", label: "استشارة عند توقيع عقد إحدى الباقات" },
  ];

  return (
    <>
      <Navbar />
      <section
        dir="rtl"
        className="overflow-hidden bg-prime-cream pt-[72px] font-arabic text-prime-dark"
      >
        <style>{`
          @keyframes prime-pop { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
          .prime-pop { animation: prime-pop .45s ease-out both; }
          .prime-hide-scroll { scrollbar-width: none; }
          .prime-hide-scroll::-webkit-scrollbar { display: none; }
          @media (prefers-reduced-motion: reduce) { .prime-pop { animation: none; } }
        `}</style>

        {/* ============ الهيرو ============ */}
        <div className="relative isolate overflow-hidden bg-prime-dark pb-32 pt-14 lg:pb-40 lg:pt-20">
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-prime-terracotta/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-prime-orange/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_1fr] lg:px-10">
            <div>
              <Reveal>
                <Eyebrow light>Our services</Eyebrow>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.5] text-white md:text-5xl md:leading-[1.45]">
                  من الفكرة إلى الافتتاح،
                  <span className="block text-prime-terracotta">
                    كل خدمة بنطاق وسعر واضح
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-5 max-w-xl text-base leading-[2.1] text-white/80 md:text-lg">
                  {services.length} خدمة في {categories.length} مجالات تشغيلية.
                  اختر ما يحتاجه مشروعك من الخدمات المنفردة، أو ابدأ بباقة جاهزة
                  تجمع لك ما يلزم.
                </p>
              </Reveal>
              <Reveal delay={360}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Btn href="#all-services">استعرض الخدمات</Btn>
                  <Btn href="#packages" variant="ghost">
                    شاهد الباقات
                  </Btn>
                </div>
              </Reveal>
            </div>

            {/* خريطة المجالات */}
            <Reveal direction="left" delay={200} className="relative">
              <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full border-[20px] border-white/10" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
                <p className="font-latin mb-3 px-3 text-xs font-semibold uppercase tracking-[0.3em] text-prime-orange">
                  Service map
                </p>
                <ul>
                  {categories.map((c, i) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => goTo(c.id)}
                        className="flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-right transition-colors hover:bg-white/10"
                      >
                        <span
                          className={`font-latin flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-2 ring-white/20 ${THEMES[c.id].dot} ${c.id === "kitchen" || c.id === "launch" ? "text-prime-dark" : "text-white"}`}
                        >
                          {pad(i + 1)}
                        </span>
                        <span className="flex-1 text-sm font-bold text-white md:text-base">
                          {c.title}
                        </span>
                        <span className="font-latin text-xs text-white/60">
                          {counts[c.id]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 h-12 w-full text-prime-cream lg:h-20"
          >
            <path
              fill="currentColor"
              d="M0 80V40C240 0 480 0 720 30s480 40 720 0v50z"
            />
          </svg>
        </div>

        {/* ============ شريط الأرقام ============ */}
        <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-6 lg:-mt-20 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-prime-sand shadow-xl lg:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center bg-white px-4 py-7 text-center md:py-9"
                >
                  <span className="text-3xl font-extrabold text-prime-terracotta md:text-5xl">
                    {s.text ? s.text : <Counter to={s.to} />}
                  </span>
                  <span className="mt-2 text-xs font-semibold leading-[1.9] text-prime-dark/75 md:text-sm">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ============ خدمة منفردة أو باقة؟ ============ */}
        <div className="mx-auto mt-24 max-w-6xl px-6 lg:px-10">
          <Reveal>
            <Eyebrow>Two ways to work with us</Eyebrow>
            <SectionTitle>كيف تبدأ معنا؟</SectionTitle>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal direction="right" className="h-full">
              <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-prime-terracotta p-8 text-white shadow-xl md:p-10">
                <span
                  aria-hidden="true"
                  className="font-latin pointer-events-none absolute -bottom-6 -left-2 select-none text-8xl font-extrabold leading-none text-white/10"
                >
                  01
                </span>
                <h3 className="relative text-xl font-extrabold md:text-2xl">
                  خدمة منفردة
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-[2.1] text-white md:text-base">
                  تعرف بالضبط ما تحتاجه؟ اختر خدمة أو أكثر، لكل منها نطاق وسعر
                  ومدة تنفيذ، وادفع مقابل ما تحتاجه فقط.
                </p>
                <a
                  href="#all-services"
                  className="relative mt-6 inline-flex items-center gap-2 self-start font-bold underline-offset-8 hover:underline"
                >
                  تصفح الخدمات الـ {services.length}
                  <Icon name="arrow" className="h-5 w-5" />
                </a>
              </article>
            </Reveal>

            <Reveal direction="left" delay={150} className="h-full">
              <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-prime-dark p-8 text-white shadow-xl md:p-10">
                <span
                  aria-hidden="true"
                  className="font-latin pointer-events-none absolute -bottom-6 -left-2 select-none text-8xl font-extrabold leading-none text-white/[0.06]"
                >
                  02
                </span>
                <h3 className="relative text-xl font-extrabold md:text-2xl">
                  باقة جاهزة
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-[2.1] text-white/85 md:text-base">
                  لست متأكدًا من أين تبدأ؟ كل باقة تجمع الخدمات المناسبة لمرحلة
                  معينة من مشروعك بسعر ومدة وزيارات محددة.
                </p>
                <a
                  href="#packages"
                  className="relative mt-6 inline-flex items-center gap-2 self-start font-bold text-prime-gold underline-offset-8 hover:underline"
                >
                  قارن الباقات الـ {packages.length}
                  <Icon name="arrow" className="h-5 w-5" />
                </a>
              </article>
            </Reveal>
          </div>
        </div>

        {/* ============ كل الخدمات ============ */}
        <div
          id="all-services"
          className="mx-auto mt-24 max-w-7xl scroll-mt-24 px-6 lg:px-10"
        >
          <Reveal>
            <Eyebrow>All services</Eyebrow>
            <SectionTitle>الخدمات المنفردة</SectionTitle>
          </Reveal>

          {/* بحث */}
          <Reveal delay={100}>
            <div className="relative mt-2 max-w-md">
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-prime-dark/50">
                <Icon name="search" className="h-5 w-5" />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن خدمة، مثل: منيو أو تدريب"
                aria-label="ابحث في الخدمات"
                className="w-full border-0 border-b-2 border-prime-sand bg-white/60 py-3 pl-4 pr-12 text-base text-prime-dark outline-none transition-colors placeholder:text-prime-dark/40 focus:border-prime-terracotta focus:bg-white"
              />
            </div>
          </Reveal>

          {/* فلتر التصنيفات */}
          <Reveal delay={200}>
            <div
              role="tablist"
              aria-label="تصنيفات الخدمات"
              className="prime-hide-scroll -mx-6 mt-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
            >
              {[{ id: "all", title: "الكل", count: services.length }]
                .concat(
                  categories.map((c) => ({
                    id: c.id,
                    title: c.title,
                    count: counts[c.id],
                  })),
                )
                .map((c) => {
                  const on = active === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(c.id)}
                      className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                        on
                          ? "bg-prime-dark text-white shadow-md"
                          : "bg-white/70 text-prime-dark hover:bg-white"
                      }`}
                    >
                      {c.id !== "all" && (
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${THEMES[c.id].dot} ${on ? "ring-2 ring-white/60" : ""}`}
                        />
                      )}
                      {c.title}
                      <span
                        className={`font-latin text-xs ${on ? "text-white/70" : "text-prime-dark/50"}`}
                      >
                        {c.count}
                      </span>
                    </button>
                  );
                })}
            </div>
          </Reveal>

          {/* المجموعات */}
          <div className="mt-10 space-y-14">
            {groups.length === 0 && (
              <p className="rounded-3xl bg-white/60 px-6 py-12 text-center text-base font-semibold text-prime-dark/70">
                لا توجد خدمة مطابقة لبحثك. جرّب كلمة أخرى أو اختر "الكل".
              </p>
            )}

            {groups.map(({ c, items }) => (
              <section key={c.id} aria-label={c.title}>
                <Reveal>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-prime-dark text-white">
                      <Icon name={c.id} className="h-6 w-6" />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold md:text-2xl">
                        {c.title}
                      </h3>
                      <p className="text-sm text-prime-dark/70">{c.desc}</p>
                    </div>
                    <span className="font-latin rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-prime-dark/70">
                      {items.length}
                    </span>
                  </div>
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s, i) => (
                    <Reveal key={s.n} delay={(i % 3) * 100} className="h-full">
                      <ServiceCard s={s} />
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-sm leading-[2] text-prime-dark/70">
              * {PRICE_NOTE}
            </p>
          </Reveal>
        </div>

        {/* ============ الباقات ============ */}
        <div
          id="packages"
          className="relative mt-24 scroll-mt-16 overflow-hidden bg-gradient-to-l from-prime-orange to-prime-terracotta py-20 text-white lg:py-28"
        >
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[26px] border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[22px] border-white/10"
          />

          <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal>
              <Eyebrow onGradient>Ready-made packages</Eyebrow>
              <SectionTitle light>الباقات الجاهزة</SectionTitle>
              <p className="max-w-xl text-sm leading-[2.1] text-white md:text-base">
                كل باقة تجمع عدة خدمات بسعر ثابت ومدة محددة. اختر باقة لتعرف ما
                تشمله وما يناسب مرحلة مشروعك.
              </p>
            </Reveal>

            {/* تبويبات الباقات */}
            <Reveal delay={120}>
              <div
                role="tablist"
                aria-label="الباقات"
                className="prime-hide-scroll -mx-6 mt-10 flex gap-3 overflow-x-auto px-6 pb-3 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
              >
                {packages.map((p) => {
                  const on = p.id === pkgId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setPkgId(p.id)}
                      className={`flex min-w-[9.5rem] shrink-0 flex-col items-start rounded-2xl px-5 py-4 text-right transition-all lg:min-w-0 ${
                        on
                          ? "bg-prime-cream text-prime-dark shadow-xl"
                          : "bg-white/15 text-white hover:bg-white/25"
                      }`}
                    >
                      <span className="text-sm font-extrabold md:text-base">
                        {p.short}
                      </span>
                      <span
                        className={`mt-1 text-xs font-bold ${on ? "text-prime-terracotta" : "text-white/85"}`}
                      >
                        <span dir="ltr" className="font-latin">
                          {fmt(p.price)}
                        </span>{" "}
                        ر.س
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* تفاصيل الباقة */}
            <div
              key={pkg.id}
              role="tabpanel"
              className="prime-pop mt-4 rounded-3xl bg-prime-cream p-6 text-prime-dark shadow-2xl md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-extrabold md:text-3xl">
                    {pkg.name}
                  </h3>
                  <span className="mt-3 block h-1 w-12 bg-prime-terracotta" />
                  <p className="mt-4 text-sm leading-[2.1] text-prime-dark/85 md:text-base">
                    <span className="font-bold text-prime-terracotta">
                      تناسب:{" "}
                    </span>
                    {pkg.forWho}
                  </p>
                </div>
                <div className="shrink-0 md:pt-2">
                  <PriceSticker
                    value={pkg.price}
                    cls="bg-prime-gold text-prime-dark"
                    big
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: "clock", label: "مدة التنفيذ", value: pkg.duration },
                  { icon: "pin", label: "الزيارات", value: pkg.visits },
                  {
                    icon: "list",
                    label: "عدد البنود",
                    value: `${pkg.features.length} بندًا`,
                  },
                ].map((i) => (
                  <div
                    key={i.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/70 p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-prime-terracotta text-white">
                      <Icon name={i.icon} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold text-prime-dark/60">
                        {i.label}
                      </span>
                      <span className="block text-sm font-bold leading-[1.8]">
                        {i.value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <h4 className="mt-10 text-lg font-extrabold">ما تشمله الباقة</h4>
              <ul className="mt-4 grid gap-x-8 gap-y-1 md:grid-cols-2">
                {pkg.features.map((f) => (
                  <li
                    key={f.title}
                    className="flex items-start gap-3 border-b border-prime-sand py-3"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-prime-terracotta">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5 fill-none stroke-white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12l5 5L19 7" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-sm font-bold leading-[1.9] md:text-base">
                        {f.title}
                      </span>
                      {f.note && (
                        <span className="block text-xs leading-[1.9] text-prime-dark/70 md:text-sm">
                          {f.note}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Btn to="/contact">اطلب هذه الباقة</Btn>
                <p className="text-xs leading-[2] text-prime-dark/65">
                  {PRICE_NOTE}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ دعوة للتواصل ============ */}
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal direction="scale">
            <div className="relative overflow-hidden rounded-3xl bg-prime-dark px-8 py-12 text-center text-white shadow-xl md:px-16 md:py-16">
              <div
                aria-hidden="true"
                className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[22px] border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -right-10 h-60 w-60 rounded-full bg-prime-terracotta/30 blur-3xl"
              />
              <h2 className="relative text-2xl font-extrabold leading-[1.6] md:text-4xl">
                لست متأكدًا من الخدمة المناسبة؟
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-sm leading-[2.1] text-white/85 md:text-base">
                احكِ لنا عن مشروعك ونرشّح لك الخدمة أو الباقة الأنسب. وعند توقيع
                عقد إحدى الباقات تحصل على استشارة مجانية لمدة ساعتين.
              </p>
              <div className="relative mt-8">
                <Btn to="/contact">تواصل معنا</Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
