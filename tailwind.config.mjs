// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
      textShadow: {
        sm: "1px 1px 1px rgba(0, 0, 0, 0.2)",
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.25)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const shadows = theme("textShadow") || {};
      const newUtilities = Object.entries(shadows).reduce(
        (acc, [key, value]) => {
          acc[`.text-shadow${key === "DEFAULT" ? "" : `-${key}`}`] = {
            textShadow: value,
          };
          return acc;
        },
        {}
      );
      addUtilities(newUtilities);
    },
  ],

  fontFamily: {
    geist: ["Geist", "sans-serif"],
  },
};
