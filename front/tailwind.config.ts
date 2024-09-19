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
        primary: "#0095A9",
        second: "#A0E4EB",
        third: "#0095A952",
        backGround: "#00658031",
        actions: "#FFC843",
        aux_actions: "#8E6C1A",
        ok_status: "#B3EDD7",
        aux_ok_status: "#B3EDD7",
        bad_status: "#F77354",
        text_title: "#065D69",
        text_color: "#0396A6"
      },
    },
  },
  plugins: [],
};
export default config;
