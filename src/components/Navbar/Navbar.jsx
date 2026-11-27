import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { label: "من نحن", to: "/about" },
  { label: "خدماتنا", to: "/services" },
  { label: "مشاريعنا", to: "/projects" },
  { label: "شركاء النجاح", to: "/partners" },
];

// طاقية الشيف: متتبعة من لوجو الـ PDF (خط واحد متصل + لفة يمين + حزام)
// لو عندك ملف SVG الأصلي من المصمم حطه في public/logo.svg واستخدمه بدل الأيقونة دي
function ChefHat({ className = "" }) {
  return (
    <svg
      viewBox="190 150 860 700"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="66"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* القمة المتموجة + جسم الطاقية + القاعدة + اللفة اللي على اليمين */}
      <path d="M722 248 C680 270 650 297 610 297 C560 297 530 265 480 235 C440 210 400 200 355 200 C300 200 235 245 235 320 C235 400 300 450 360 480 C400 500 425 505 432 525 C430 570 420 620 420 690 C420 760 480 785 610 795 C700 795 760 780 790 750 C825 720 822 690 815 650 L800 575 C795 540 795 520 792 500 C790 450 785 400 800 345 C820 270 870 240 910 240 C975 240 1010 285 1005 335 C995 400 930 470 850 510 C830 518 815 525 805 535" />
      {/* الحزام الأفقي */}
      <path d="M552 550 H800" />
    </svg>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Prime">
      <ChefHat className="h-10 w-12 text-prime-orange" />
      <div className="flex flex-col leading-none" dir="ltr">
        <span className="font-latin text-2xl font-semibold tracking-tight text-prime-dark">
          Prime
        </span>
        <span className="mt-1 font-latin text-[8px] uppercase tracking-[0.3em] text-prime-orange">
          Consultant &amp; Operations
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-prime-cream/90 shadow-[0_2px_20px_rgba(38,42,30,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* خط علوي كامل بلون واحد */}
      <div className="h-1 w-full bg-prime-terracotta" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Logo />

        {/* روابط الديسكتوب */}
        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `group relative py-2 font-arabic text-[15px] font-semibold transition-colors hover:text-prime-orange ${
                    isActive ? "text-prime-orange" : "text-prime-dark"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-right bg-prime-orange transition-transform duration-300 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* زرار تواصل معنا */}
        <Link
          to="/contact"
          className="hidden rounded-none bg-prime-terracotta px-7 py-2.5 font-arabic text-sm font-bold text-white shadow-md transition-all hover:bg-prime-rust hover:shadow-lg lg:inline-block"
        >
          تواصل معنا
        </Link>
        {/* زرار الموبايل */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="القائمة"
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-6 bg-prime-dark transition-all ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-prime-dark transition-all ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-prime-dark transition-all ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* قائمة الموبايل */}
      <div
        className={`overflow-hidden bg-prime-cream transition-all duration-300 lg:hidden ${
          open ? "max-h-[500px] border-t border-prime-sand" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          {links.map((l) => (
            <li key={l.to} className="border-b border-prime-sand last:border-0">
              <NavLink
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-3 font-arabic text-base font-semibold hover:text-prime-orange ${
                    isActive ? "text-prime-orange" : "text-prime-dark"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-4">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block bg-prime-terracotta py-3 text-center font-arabic font-bold text-white hover:bg-prime-rust"
            >
              تواصل معنا
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
