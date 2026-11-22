import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";

/* ------------------------------------------------------------------
   بيانات التواصل - عدّلها من هنا بس
------------------------------------------------------------------- */
const CONTACT = {
  phone: "0535360150",
  email: "prime@gmail.com",
  address: "جدة - المملكة العربية السعودية",
  instagram:
    "https://www.instagram.com/prime_consultant5?knvt=MTR2eDUwN2VqbzNraA%3D%3D", // حط رابط الإنستجرام الحقيقي
};

/* ------------------------------------------------------------------
   مكان استقبال الرسائل: أي endpoint بيستقبل POST بصيغة JSON.
   أسهل حل: اعمل فورم في https://formspree.io وحط الرابط هنا
   (الرسايل هتوصلك على الإيميل). أو حط رابط الـ API بتاعك.
------------------------------------------------------------------- */
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const SERVICES = [
  "التقييم والتحليل",
  "تطوير الفكرة والهوية",
  "تطوير المنيو والمنتجات",
  "تصميم المطبخ وتجهيزه",
  "بناء أنظمة التشغيل",
  "تأهيل الفريق وتدريبه",
  "إدارة الافتتاح والمتابعة",
  "غير ذلك / لست متأكداً",
];

/* حركة ظهور بسيطة (نفس اللي في صفحة من نحن) */
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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = {
    up: "translate-y-10",
    right: "translate-x-10",
    left: "-translate-x-10",
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${hidden}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* أيقونات بسيطة */
const Icon = {
  phone: (
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1z" />
  ),
  mail: (
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.5 7v.1L12 13l7.5-5.9V7L12 12.2z" />
  ),
  pin: (
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  ),
  insta: (
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 12 14.5 2.5 2.5 0 0 1 12 9.5zM17.3 5.7a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  ),
};

function InfoRow({ icon, label, children, href }) {
  const body = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-prime-terracotta text-white transition-colors group-hover:bg-prime-rust">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
          {Icon[icon]}
        </svg>
      </span>
      <span className="flex flex-col">
        <span className="text-xs font-semibold text-prime-dark/60">
          {label}
        </span>
        <span className="text-base font-bold md:text-lg">{children}</span>
      </span>
    </>
  );
  const cls = "group flex items-center gap-4";
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={cls}
    >
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

const fieldCls =
  "w-full border-0 border-b-2 border-prime-sand bg-white/60 px-4 py-3 text-base text-prime-dark outline-none transition-colors placeholder:text-prime-dark/40 focus:border-prime-terracotta focus:bg-white";

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-bold text-prime-dark"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  project: "",
  service: "",
  message: "",
};

export default function ContactUs() {
  const [form, setForm] = useState(EMPTY);
  const [honey, setHoney] = useState(""); // فخ للبوتات
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (honey) return; // بوت
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setForm(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <section
        dir="rtl"
        className="overflow-hidden bg-prime-cream pt-[72px] font-arabic text-prime-dark"
      >
        {/* ============ الهيدر ============ */}
        {/* pt-[72px] فوق = مساحة الـ Navbar عشان يفضل ظاهر فوق خلفية كريمي */}
        <div className="relative isolate overflow-hidden bg-prime-dark pb-28 pt-16 lg:pb-40 lg:pt-24">
          {/* دوائر ديكور */}
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
            className="absolute -left-20 bottom-[-6rem] -z-10 h-72 w-72 rounded-full border-[28px] border-white/5 lg:h-96 lg:w-96"
          />
          {/* شبكة نقاط */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <span
            aria-hidden="true"
            className="font-latin pointer-events-none absolute bottom-10 left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap text-[4.5rem] font-extrabold leading-none text-white/[0.07] md:bottom-14 md:text-[10rem] lg:bottom-16 lg:text-[12rem]"
          >
            CONTACT
          </span>

          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal>
              <span className="font-latin inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-prime-orange">
                <span className="h-px w-10 bg-prime-orange" />
                Get in touch
              </span>
            </Reveal>
            <Reveal delay={150}>
              <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.5] text-white md:text-5xl md:leading-[1.45]">
                خلّينا نحوّل فكرتك إلى{" "}
                <span className="text-prime-terracotta">مشروع ناجح</span>
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-5 max-w-xl text-base leading-[2.1] text-white/80 md:text-lg">
                احكيلنا عن مشروعك أو استفسارك، وفريق Prime هيتواصل معاك في أقرب
                وقت.
              </p>
            </Reveal>
          </div>

          {/* حافة منحنية */}
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

        {/* ============ البيانات + الفورم ============ */}
        {/* في RTL أول عنصر على اليمين، وعلى الموبايل بيبقى فوق الفورم */}
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-6 lg:grid-cols-[1fr_1.4fr] lg:gap-14 lg:px-10 lg:pb-24 lg:pt-10">
          {/* البيانات */}
          <div className="flex flex-col gap-7">
            <Reveal direction="right">
              <InfoRow
                icon="phone"
                label="اتصل بنا"
                href={`tel:${CONTACT.phone}`}
              >
                <span dir="ltr" className="font-latin">
                  {CONTACT.phone}
                </span>
              </InfoRow>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <InfoRow
                icon="mail"
                label="البريد الإلكتروني"
                href={`mailto:${CONTACT.email}`}
              >
                <span dir="ltr" className="font-latin">
                  {CONTACT.email}
                </span>
              </InfoRow>
            </Reveal>
            <Reveal direction="right" delay={240}>
              <InfoRow icon="pin" label="العنوان">
                {CONTACT.address}
              </InfoRow>
            </Reveal>
            <Reveal direction="right" delay={360}>
              <InfoRow icon="insta" label="تابعنا" href={CONTACT.instagram}>
                <span dir="ltr" className="font-latin">
                  Instagram
                </span>
              </InfoRow>
            </Reveal>
          </div>

          {/* الفورم */}
          <Reveal direction="left" delay={150}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl bg-white/50 p-6 shadow-xl backdrop-blur-sm md:p-10"
            >
              {/* حقل مخفي للبوتات */}
              <input
                type="text"
                name="company_website"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="الاسم" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="اسمك الكريم"
                    className={fieldCls}
                  />
                </Field>

                <Field label="رقم الموبايل" htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="05xxxxxxxx"
                    className={`${fieldCls} text-right`}
                  />
                </Field>

                <Field label="البريد الإلكتروني (اختياري)" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    dir="ltr"
                    value={form.email}
                    onChange={onChange}
                    placeholder="name@email.com"
                    className={`${fieldCls} text-right`}
                  />
                </Field>

                <Field label="اسم المشروع / النشاط" htmlFor="project">
                  <input
                    id="project"
                    name="project"
                    type="text"
                    autoComplete="organization"
                    value={form.project}
                    onChange={onChange}
                    placeholder="مثال: كافيه، مطعم..."
                    className={fieldCls}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="الخدمة المطلوبة" htmlFor="service">
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={onChange}
                    className={fieldCls}
                  >
                    <option value="">اختر الخدمة</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="رسالتك" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={onChange}
                    placeholder="احكيلنا عن مشروعك وإيه اللي محتاجه..."
                    className={`${fieldCls} resize-none`}
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-7 w-full bg-prime-terracotta px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-prime-rust hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {status === "sending" ? "جاري الإرسال..." : "إرسال الرسالة"}
              </button>

              {status === "success" && (
                <p
                  role="status"
                  className="mt-4 text-sm font-semibold text-green-700"
                >
                  وصلتنا رسالتك، شكرًا لك! هنتواصل معاك قريبًا.
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className="mt-4 text-sm font-semibold text-prime-orange"
                >
                  حصلت مشكلة أثناء الإرسال، حاول مرة تانية أو كلمنا على الرقم
                  اللي في الصفحة.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
