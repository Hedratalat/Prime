import { useEffect, useState } from "react";

/* ------------------------------------------------------------------
   Splash: تظهر مرة واحدة بس في الجلسة (أول زيارة)، لوجو الطاقية بيترسم
   بخط متصل في أقل من ثانية، وبعدها تتفتح بنعومة. مفيش انتظار لتحميل حاجة.
   بتتخطى نفسها لو المستخدم مفعّل "تقليل الحركة".
   مكانها: components/Splash/Splash.jsx
------------------------------------------------------------------- */
const KEY = "prime-splash-seen";

function shouldShow() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export default function Splash() {
  const [visible, setVisible] = useState(shouldShow);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    const t1 = setTimeout(() => setLeaving(true), 1300);
    const t2 = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-prime-cream transition-opacity duration-400 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes prime-draw { to { stroke-dashoffset: 0; } }
        @keyframes prime-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .prime-stroke {
          stroke-dasharray: 1 1;
          stroke-dashoffset: 1;
          animation: prime-draw 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .prime-belt { animation-delay: 0.55s; animation-duration: 0.35s; }
      `}</style>

      <svg
        viewBox="190 150 860 700"
        className="h-24 w-28 text-prime-orange md:h-32 md:w-40"
        fill="none"
        stroke="currentColor"
        strokeWidth="66"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          pathLength="1"
          className="prime-stroke"
          d="M722 248 C680 270 650 297 610 297 C560 297 530 265 480 235 C440 210 400 200 355 200 C300 200 235 245 235 320 C235 400 300 450 360 480 C400 500 425 505 432 525 C430 570 420 620 420 690 C420 760 480 785 610 795 C700 795 760 780 790 750 C825 720 822 690 815 650 L800 575 C795 540 795 520 792 500 C790 450 785 400 800 345 C820 270 870 240 910 240 C975 240 1010 285 1005 335 C995 400 930 470 850 510 C830 518 815 525 805 535"
        />
        <path
          pathLength="1"
          className="prime-stroke prime-belt"
          d="M552 550 H800"
        />
      </svg>

      <div
        dir="ltr"
        className="mt-4 flex flex-col items-center leading-none"
        style={{ animation: "prime-fade 0.4s ease-out 0.6s both" }}
      >
        <span className="font-latin text-3xl font-semibold tracking-tight text-prime-dark">
          Prime
        </span>
        <span className="mt-2 font-latin text-[9px] uppercase tracking-[0.3em] text-prime-orange">
          Consultant &amp; Operations
        </span>
      </div>
    </div>
  );
}
