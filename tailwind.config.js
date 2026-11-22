/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prime: {
          cream: "#F1E2CC", // خلفية الشرائح الأساسية
          sand: "#EEDCC8", // الأشكال الباهتة في الخلفية
          terracotta: "#D4654A", // اللون الرئيسي (المستطيلات والكروت)
          orange: "#DB3B24", // الأحمر البرتقالي (الكروت والمظاريف)
          rust: "#B8452A", // درجة أغمق للـ hover والظلال
          dark: "#262A1E", // زيتوني غامق للنصوص والعناوين
          gold: "#D08A1E", // لون ستيكر الأسعار
        },
      },
      fontFamily: {
        arabic: ["Cairo", "Tajawal", "sans-serif"],
        latin: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
