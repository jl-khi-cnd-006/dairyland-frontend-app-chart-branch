/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-linear": "linear-gradient(270deg, #0B2F3A 0%, #0F1F2C 100%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-bg": "url(/images/home-bg.png)",
        "archi-bg": "url(/images/archi-bg.png)",
        "login-bg": "url(/images/main/bg.png)",
      },
      fontFamily: {
        futura: ["var(--font-futura)"],
        karla: ["var(--font-karla)"],
      },
      colors: {
        "indigo-100": "#002FA7",
        "indigo-200": "#03A1D8",
        "indigo-300": "#02B7D2",
        "indigo-400": "#22205D",
        "indigo-500": "#3D67B1",
        "gray-100": "#837A73",
        "gray-200": "#CFC9C2",
        "gray-300": "#808286",
        "gray-400": "#D3D1CE",
        "gray-500": "#254146",
        "gray-600": "#141D2B",
        "gray-700": "#2E333B",
        "gray-800": "#5F636B",
        "gray-900": "#0e2a38",
        "black-200": "#1C2634",
        "black-300": "#253A43",
        "black-400": "#0D121F",
        "black-500": "#231F20",
        "black-600": "#0A101A",
        "white-100": "#4E535B",
        "black-transparent": "rgba(16, 23, 35, 0.8)",
      },
    },
  },
  plugins: [],
};
