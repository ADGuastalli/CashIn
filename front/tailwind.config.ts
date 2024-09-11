import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A0E4EB",
        secondary: "#0396A6",
        backGround: "#E1F3F5",
        actions: "#F2B441",
        ok_status: "#B3EDD7",
        bad_status: "#F2786D",
        ralative_status: "#F2B441",
        text_title: "#006580",
        text:"#60BDC9",
      },
    },
  },
  plugins: [],
};
export default config;
