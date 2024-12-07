import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container:{
      center:true,
      screens: {
        'sm': '600px',
        'md': '728px',
        'lg': '960px',
        'xl': '1200px',
        '2xl': '1380px',
        // => @media (min-width: 1536px) { ... }
      }
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:'#4461f2',
        bgSecondary:'#f0f4fc',
        primaryDark:'#122d9c'
      },
    },
  },
  plugins: [],
} satisfies Config;
