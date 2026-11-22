import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";

/* ------------------------------------------------------------------
   الصور: روابط Unsplash (مجانية للاستخدام). لو عايز تستخدم صور عندك
   حطها في public/images وغيّر الروابط هنا.
------------------------------------------------------------------- */
const img = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMAGES = {
  about: img("photo-1517248135467-4c7edcad34c4"), // مطعم من الداخل
  vision: img("photo-1552566626-52f8b828add9"), // صالة ضيافة حديثة
  mission: img("photo-1414235077428-338989a2e8c0"), // تقديم طبق راقي
  why: img("photo-1556761175-5973dc0f32e7"), // اجتماع عمل / شراكة
};

const goals = [
  {
    title: "هندسة الكفاءة",
    text: "بناء منظومة معقدة في تصميمها، بسيطة في تنفيذها لضمان  الكفائة التشغيلية.",
  },
  {
    title: "الريادة الابتكارية",
    text: "استباق تغيرات السوق بابتكار نماذج عمل مرنة تتكيف مع السلوك المستهلك المستقبلي.",
  },
  {
    title: " خدمة العملاء",
    text: "تحقيق التميز في خدمة العملاء عبر تقديم تجربة استثنائية تفوق توقعاتهم.",
  },
  {
    title: "إدارة العائد",
    text: "السيطرة على سلاسل الإمداد وتكاليف التشغيل لتحقيق أقصى هامش ربح ممكن.",
  },
];

/* ------------------------------------------------------------------
   Reveal: يظهر العنصر بحركة لما يدخل الشاشة (مرة واحدة)
   direction: up | right | left | scale
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

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <section
        id="about"
        dir="rtl"
        className="overflow-hidden bg-prime-cream font-arabic text-prime-dark"
      >
        {/* ============ من نحن ============ */}
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1.1fr_1fr] lg:px-10 lg:pb-24 lg:pt-36">
          <div>
            <Reveal>
              <SectionTitle>مَنْ نحن؟</SectionTitle>
            </Reveal>
            <Reveal delay={150}>
              <p className="max-w-xl text-base leading-[2.1] text-prime-dark/90 md:text-lg">
                نحن المحرك التشغيلي والذراع الاستشاري لرواد الأعمال في قطاع
                الأغذية والمشروبات . نحن كيان متخصص في هندسة المشاريع وتحويل
                مفاهيم الضيافة من مجرد «أفكار طموحة» إلى «كيانات ربحية مستدامة».
                لا نكتفي بالإدارة، بل نصمم الأنظمة التي تضمن التفوق التشغيلي
                والتوسع في سوق لا يقبل إلا الأقوياء. بفريق عمل احترافي وبخبره
                تمتد لأكثر من 20 سنة في مجال الأغذية والمشروبات.
              </p>
            </Reveal>
          </div>

          <Reveal
            direction="left"
            delay={200}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -bottom-8 -left-8 h-52 w-52 rounded-full border-[22px] border-prime-sand" />
            <img
              src={IMAGES.about}
              alt="صالة مطعم"
              className="relative h-80 w-full rounded-t-full bg-prime-sand object-cover shadow-xl md:h-[26rem]"
            />
          </Reveal>
        </div>

        {/* ============ الرؤية والرسالة (الاتنين ظاهرين) ============ */}
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:px-10">
          {/* الرؤية */}
          <Reveal direction="right">
            <article className="h-full overflow-hidden rounded-3xl bg-gradient-to-l from-prime-orange to-prime-terracotta text-white shadow-xl">
              <img
                src={IMAGES.vision}
                alt="صالة ضيافة حديثة"
                className="h-44 w-full bg-prime-sand object-cover md:h-52"
              />
              <div className="p-7 md:p-9">
                <h3 className="mb-3 text-xl font-extrabold md:text-2xl">
                  الرؤية
                </h3>
                <p className="text-sm leading-[2.1] text-white/95 md:text-base">
                  أن نكون المهندس الأول لمنظومة الضيافة الحديثة في المنطقة؛ عبر
                  صياغة معايير تشغيلية عالمية تضع شركاءنا في صدارة المشهد
                  الاستثماري، ونقود التحول من الإدارة التقليدية إلى الإدارة
                  الذكية القائمة على البيانات.
                </p>
              </div>
            </article>
          </Reveal>

          {/* الرسالة */}
          <Reveal direction="left" delay={150}>
            <article className="h-full overflow-hidden rounded-3xl bg-prime-dark text-white shadow-xl">
              <img
                src={IMAGES.mission}
                alt="تقديم طبق في مطعم راقٍ"
                className="h-44 w-full bg-prime-sand object-cover md:h-52"
              />
              <div className="p-7 md:p-9">
                <h3 className="mb-3 text-xl font-extrabold md:text-2xl">
                  الرسالة
                </h3>
                <p className="text-sm leading-[2.1] text-white/90 md:text-base">
                  صناعة الفارق التنافسي لشركائنا من خلال تقديم حلول تبدأ من
                  ابتكار المفاهيم واختراق الأسواق، وصولاً إلى ذروة الكفاءة
                  التشغيلية. التزامنا هو تحويل «التعقيدات التشغيلية» إلى «عمليات
                  انسيابية» تضمن استدامة العمليات التشغيلية وخدمة العملاء.
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        {/* ============ الأهداف ============ */}
        <div className="mx-auto mt-24 grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_2fr] lg:px-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionTitle>الأهداف</SectionTitle>
            </Reveal>
          </div>

          <ul>
            {goals.map((g, i) => (
              <Reveal key={g.title} delay={i * 120}>
                <li className="group grid gap-2 border-t-2 border-prime-sand py-6 transition-colors last:border-b-2 hover:bg-prime-sand/40 md:grid-cols-[1fr_1.6fr] md:gap-10 md:px-4">
                  <h3 className="flex items-center gap-3 text-lg font-bold md:text-xl">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-prime-terracotta transition-transform duration-300 group-hover:scale-150" />
                    {g.title}
                  </h3>
                  <p className="text-sm leading-[2.1] text-prime-dark/85 md:text-base">
                    {g.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* ============ لماذا تختارنا؟ ============ */}
        <div className="relative mt-24 overflow-hidden bg-prime-dark">
          <span
            aria-hidden="true"
            className="font-latin pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[7rem] font-extrabold leading-none text-white/5 md:text-[13rem]"
          >
            PRIME
          </span>

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal direction="right" className="order-2 lg:order-1">
              <div className="relative">
                <span className="absolute -right-4 top-6 hidden h-[75%] w-3 bg-prime-terracotta sm:block" />
                <img
                  src={IMAGES.why}
                  alt="اجتماع عمل مع شريك استراتيجي"
                  className="relative h-64 w-full bg-prime-sand object-cover shadow-2xl sm:h-80"
                />
              </div>
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal>
                <SectionTitle light>لماذا تختارنا؟</SectionTitle>
              </Reveal>
              <Reveal delay={150}>
                <p className="text-base leading-[2.2] text-white/90 md:text-lg">
                  لأن <span className="font-latin">PRIME</span> لا تقدم استشارات
                  نظرية، بل حلولاً عملية مبنية على خبرة حقيقية وفهم عميق لقطاع
                  المطاعم والضيافة. نعمل معكم كشريك استراتيجي، ندرس مشروعكم،
                  نحدد فرص التطوير، ونبني منظومة أكثر كفاءة وربحية واستدامة من
                  الفكرة والتأسيس إلى التشغيل والتوسع.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
