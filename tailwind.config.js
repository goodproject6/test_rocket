const { nextui } = require("@nextui-org/react");
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: "#007AFF",
        "light-theme": "#F0F7FF",
        danger: "#EB0100",
        label: "#6C6C6C",
        "custom-gray": "#6B6B6B",
        "dashboard-bg": "#F0F2F8",
        "dark-blue": "#0D3159",
        success: "#14A800",
      },
      screens: {
        xxs: "360px",
        xs: "480px",
        ...defaultTheme.screens,
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
