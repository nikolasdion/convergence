// import { heroui } from "@heroui/react";
// import type { Config } from "tailwindcss";

// export default {
//   content: ["./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [heroui()],
// } satisfies Config;

// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/client/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs,mts}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
