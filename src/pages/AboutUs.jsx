import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import imageAbout from "../../public/867632730_18097488959384039_7457451212607472903_n.jpg";
/* ------------------------------------------------------------------
   الصور: روابط Unsplash. لو عايز صور عندك حطها في public/images
------------------------------------------------------------------- */
const img = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMAGES = {
  hero: img("photo-1517248135467-4c7edcad34c4"), // مطعم من الداخل
};

/* أرقام الصفحة - اتأكد منها مع العميل قبل النشر */
const stats = [
  { to: 20, prefix: "+", label: "سنة خبرة في الأغذية والمشروبات" },
  { to: 7, label: "خدمات تشغيلية متخصصة" },
  { to: 10, prefix: "+", label: "شريك نجاح في التشغيل والتسويق" },
  { text: "جدة", label: "مقرنا الرئيسي، والرياض قريبًا" },
];

const goals = [
  {
    title: "هندسة الكفاءة",
    text: "بناء منظومة معقدة في تصميمها، بسيطة في تنفيذها لضمان الكفاءة التشغيلية.",
  },
  {
    title: "الريادة الابتكارية",
    text: "استباق تغيرات السوق بابتكار نماذج عمل مرنة تتكيف مع السلوك المستقبلي للمستهلك.",
  },
  {
    title: "خدمة العملاء",
    text: "تحقيق التميز في خدمة العملاء عبر تقديم تجربة استثنائية تفوق توقعاتهم.",
  },
  {
    title: "إدارة العائد",
    text: "السيطرة على سلاسل الإمداد وتكاليف التشغيل لتحقيق أقصى هامش ربح ممكن.",
  },
];

/* مراحل العمل = الخدمات السبع من الـ PDF */
const steps = [
  "التقييم والتحليل",
  "تطوير الفكرة والهوية",
  "تطوير المنيو والمنتجات",
  "تصميم المطبخ وتجهيزه",
  "بناء أنظمة التشغيل",
  "تأهيل الفريق وتدريبه",
  "إدارة الافتتاح والمتابعة",
];

/* أسماء شركاء النجاح (واضحة في الـ PDF). استبدلها باللوجوهات لما تتوفر */
const partners = [
  "SILW Coffee & More",
  "أم رواش",
  "بيسو",
  "Zenza Cafe",
  "Smoke Factory",
  "سليق زمان",
  "أسماك طروة",
  "سلطان السمك",
  "3S Roastery & Cafe",
  "MA Cafe",
  "Kavino Cafe",
  "Agave Restaurant",
];

const whyPoints = [
  "خبرة حقيقية تمتد لأكثر من 20 سنة",
  "فهم عميق لقطاع المطاعم والضيافة",
  "شريك استراتيجي من الفكرة إلى التوسع",
];

/* ------------------------------------------------------------------
   Reveal: يظهر العنصر بحركة لما يدخل الشاشة (مرة واحدة)
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
      { threshold: 0.15 },
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

/* عدّاد أرقام بيعدّ لما يدخل الشاشة */
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
          light ? "bg-prime-orange" : "bg-prime-terracotta"
        }`}
      />
    </div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`font-latin mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] ${
        light ? "text-prime-orange" : "text-prime-terracotta"
      }`}
    >
      <span
        className={`h-px w-10 ${light ? "bg-prime-orange" : "bg-prime-terracotta"}`}
      />
      {children}
    </span>
  );
}

function PrimaryButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-block bg-prime-terracotta px-8 py-3.5 text-center text-base font-bold text-white shadow-md transition-all hover:bg-prime-rust hover:shadow-lg"
    >
      {children}
    </Link>
  );
}

function GhostButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-block border-2 border-white/40 px-8 py-3 text-center text-base font-bold text-white transition-colors hover:border-white hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <section
        id="about"
        dir="rtl"
        className="overflow-hidden bg-prime-cream pt-[72px] font-arabic text-prime-dark"
      >
        <style>{`
          @keyframes prime-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .prime-marquee-track { animation: prime-marquee 35s linear infinite; }
          .prime-marquee:hover .prime-marquee-track { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) { .prime-marquee-track { animation: none; } }
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
                <Eyebrow light>About Prime</Eyebrow>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.5] text-white md:text-5xl md:leading-[1.45]">
                  نحوّل أفكار الضيافة الطموحة إلى{" "}
                  <span className="text-prime-terracotta">
                    كيانات ربحية مستدامة
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-5 max-w-xl text-base leading-[2.1] text-white/80 md:text-lg">
                  المحرك التشغيلي والذراع الاستشاري لرواد الأعمال في قطاع
                  الأغذية والمشروبات، بخبرة تمتد لأكثر من 20 سنة.
                </p>
              </Reveal>
              <Reveal delay={360}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton to="/contact">تواصل معنا</PrimaryButton>
                  <GhostButton to="/services">تعرّف على خدماتنا</GhostButton>
                </div>
              </Reveal>
            </div>

            <Reveal
              direction="left"
              delay={200}
              className="relative mx-auto w-full max-w-sm lg:max-w-md"
            >
              {/* إطار مزاح خلف الصورة */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-4 translate-y-4 rounded-3xl border-2 border-prime-terracotta"
              />
              <img
                src={imageAbout}
                alt="صالة مطعم"
                className="relative h-80 w-full rounded-3xl bg-prime-sand object-cover shadow-2xl md:h-[26rem]"
              />
              {/* شارة الخبرة */}
              <div className="absolute -bottom-6 -right-3 flex items-center gap-3 rounded-2xl bg-prime-terracotta px-5 py-3 text-white shadow-xl md:-right-6">
                <span
                  dir="ltr"
                  className="font-latin text-3xl font-extrabold leading-none md:text-4xl"
                >
                  +20
                </span>
                <span className="text-xs font-bold leading-[1.6] md:text-sm">
                  سنة خبرة في
                  <br />
                  الأغذية والمشروبات
                </span>
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
                    {s.text ? s.text : <Counter to={s.to} prefix={s.prefix} />}
                  </span>
                  <span className="mt-2 text-xs font-semibold leading-[1.9] text-prime-dark/75 md:text-sm">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ============ من نحن ============ */}
        <div className="mx-auto mt-24 grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-10">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <SectionTitle>مَنْ نحن؟</SectionTitle>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-base leading-[2.2] text-prime-dark/90 md:text-lg">
              نحن المحرك التشغيلي والذراع الاستشاري لرواد الأعمال في قطاع
              الأغذية والمشروبات. كيان متخصص في هندسة المشاريع وتحويل مفاهيم
              الضيافة من مجرد «أفكار طموحة» إلى «كيانات ربحية مستدامة». لا نكتفي
              بالإدارة، بل نصمم الأنظمة التي تضمن التفوق التشغيلي والتوسع في سوق
              لا يقبل إلا الأقوياء. بفريق عمل احترافي وبخبرة تمتد لأكثر من 20
              سنة في مجال الأغذية والمشروبات.
            </p>
          </Reveal>
        </div>

        {/* ============ الرؤية والرسالة ============ */}
        <div className="mx-auto mt-24 max-w-6xl px-6 lg:px-10">
          <Reveal>
            <Eyebrow>Vision &amp; Mission</Eyebrow>
            <SectionTitle>الرؤية والرسالة</SectionTitle>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 grid overflow-hidden rounded-3xl shadow-xl md:grid-cols-2">
              {/* الرؤية */}
              <article className="relative overflow-hidden bg-white/80 p-8 md:p-12">
                <span
                  aria-hidden="true"
                  className="font-latin pointer-events-none absolute -bottom-6 -left-4 select-none text-7xl font-extrabold leading-none text-prime-sand md:text-8xl"
                >
                  VISION
                </span>
                <div className="relative">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-prime-terracotta text-white shadow-md">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7 fill-none stroke-current"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  <span className="font-latin mt-6 block text-xs font-semibold uppercase tracking-[0.3em] text-prime-terracotta">
                    01 — Our Vision
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">
                    الرؤية
                  </h3>
                  <span className="mt-3 block h-1 w-12 bg-prime-terracotta" />
                  <p className="mt-5 pb-10 text-sm leading-[2.2] text-prime-dark/90 md:text-base">
                    أن نكون المهندس الأول لمنظومة الضيافة الحديثة في المنطقة؛
                    عبر صياغة معايير تشغيلية عالمية تضع شركاءنا في صدارة المشهد
                    الاستثماري، ونقود التحول من الإدارة التقليدية إلى الإدارة
                    الذكية القائمة على البيانات.
                  </p>
                </div>
              </article>

              {/* الرسالة */}
              <article className="relative overflow-hidden bg-prime-dark p-8 text-white md:p-12">
                <span
                  aria-hidden="true"
                  className="font-latin pointer-events-none absolute -bottom-6 -left-4 select-none text-7xl font-extrabold leading-none text-white/5 md:text-8xl"
                >
                  MISSION
                </span>
                <div className="relative">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-prime-orange text-white shadow-md">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7 fill-none stroke-current"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="12" cy="12" r="1.5" />
                    </svg>
                  </span>
                  <span className="font-latin mt-6 block text-xs font-semibold uppercase tracking-[0.3em] text-prime-orange">
                    02 — Our Mission
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">
                    الرسالة
                  </h3>
                  <span className="mt-3 block h-1 w-12 bg-prime-orange" />
                  <p className="mt-5 pb-10 text-sm leading-[2.2] text-white/90 md:text-base">
                    صناعة الفارق التنافسي لشركائنا من خلال تقديم حلول تبدأ من
                    ابتكار المفاهيم واختراق الأسواق، وصولاً إلى ذروة الكفاءة
                    التشغيلية. التزامنا هو تحويل «التعقيدات التشغيلية» إلى
                    «عمليات انسيابية» تضمن استدامة العمليات التشغيلية وخدمة
                    العملاء.
                  </p>
                </div>
              </article>
            </div>
          </Reveal>
        </div>

        {/* ============ الأهداف ============ */}
        <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Eyebrow>Our goals</Eyebrow>
            <SectionTitle>الأهداف</SectionTitle>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {goals.map((g, i) => (
              <Reveal key={g.title} delay={i * 120} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-3xl bg-white/70 p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <span
                    aria-hidden="true"
                    className="font-latin absolute -left-2 -top-4 select-none text-7xl font-extrabold text-prime-sand transition-colors group-hover:text-prime-terracotta/30"
                  >
                    0{i + 1}
                  </span>
                  <div className="relative mt-10">
                    <h3 className="mb-3 text-lg font-extrabold md:text-xl">
                      {g.title}
                    </h3>
                    <p className="text-sm leading-[2.1] text-prime-dark/85">
                      {g.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ============ رحلة العمل ============ */}
        <div className="relative mt-24 overflow-hidden bg-gradient-to-l from-prime-orange to-prime-terracotta py-20 text-white lg:py-28">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[26px] border-white/10"
          />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <Eyebrow light>How we work</Eyebrow>
              <SectionTitle light>من الفكرة إلى التشغيل</SectionTitle>
              <p className="max-w-xl text-sm leading-[2.1] text-white/90 md:text-base">
                سبع مراحل متكاملة نرافقك فيها خطوة بخطوة، من التقييم الأولي حتى
                الافتتاح والمتابعة.
              </p>
            </Reveal>

            <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s} delay={i * 100}>
                  <li className="relative flex items-center gap-4 border-t-2 border-white/30 pt-5">
                    <span className="font-latin flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-prime-cream text-base font-bold text-prime-orange shadow-lg">
                      0{i + 1}
                    </span>
                    <span className="text-base font-bold md:text-lg">{s}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* ============ شركاء النجاح (شريط متحرك) ============ */}
        <div className="mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <Eyebrow>Our partners</Eyebrow>
              <SectionTitle>شركاء النجاح</SectionTitle>
            </Reveal>
          </div>

          <div
            dir="ltr"
            className="prime-marquee relative mt-6 overflow-hidden border-y-2 border-prime-sand bg-white/50 py-8"
          >
            <div className="prime-marquee-track flex w-max items-center gap-6 px-3">
              {[...partners, ...partners].map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  dir="auto"
                  className="whitespace-nowrap rounded-full border-2 border-prime-sand bg-prime-cream px-7 py-3 text-base font-bold text-prime-dark md:text-lg"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ============ لماذا تختارنا؟ ============ */}
        <div className="relative mt-24 overflow-hidden bg-prime-dark">
          <span
            aria-hidden="true"
            className="font-latin pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[7rem] font-extrabold leading-none text-white/5 md:text-[13rem]"
          >
            PRIME
          </span>
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-prime-terracotta/20 blur-3xl"
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-10 lg:py-28">
            <div>
              <Reveal>
                <Eyebrow light>Why Prime</Eyebrow>
                <SectionTitle light>لماذا تختارنا؟</SectionTitle>
              </Reveal>
              <Reveal delay={150}>
                <p className="max-w-2xl text-base leading-[2.2] text-white/90 md:text-lg">
                  لأن <span className="font-latin">PRIME</span> لا تقدم استشارات
                  نظرية، بل حلولاً عملية مبنية على خبرة حقيقية وفهم عميق لقطاع
                  المطاعم والضيافة. نعمل معكم كشريك استراتيجي، ندرس مشروعكم،
                  نحدد فرص التطوير، ونبني منظومة أكثر كفاءة وربحية واستدامة من
                  الفكرة والتأسيس إلى التشغيل والتوسع.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8">
                  <PrimaryButton to="/contact">تواصل معنا</PrimaryButton>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-4">
              {whyPoints.map((p, i) => (
                <Reveal key={p} direction="left" delay={150 + i * 120}>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-prime-terracotta/60 hover:bg-white/10">
                    <span className="font-latin flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-prime-terracotta text-base font-bold text-white">
                      0{i + 1}
                    </span>
                    <span className="text-sm font-bold leading-[1.9] text-white md:text-base">
                      {p}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ============ دعوة للتواصل ============ */}
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal direction="scale">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-prime-orange to-prime-terracotta px-8 py-12 text-center text-white shadow-xl md:px-16 md:py-16">
              <div
                aria-hidden="true"
                className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[22px] border-white/10"
              />
              <h2 className="relative text-2xl font-extrabold leading-[1.6] md:text-4xl">
                جاهز تبني مشروعًا أكثر كفاءة وربحية؟
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-sm leading-[2.1] text-white/90 md:text-base">
                احكيلنا عن فكرتك أو مشروعك القائم، وفريقنا هيرد عليك بخطوة
                واضحة.
              </p>
              <Link
                to="/contact"
                className="relative mt-8 inline-block bg-prime-cream px-10 py-3.5 text-base font-bold text-prime-orange shadow-lg transition-all hover:bg-white"
              >
                تواصل معنا
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
