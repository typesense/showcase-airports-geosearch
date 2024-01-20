import type { Config } from 'tailwindcss';
import theme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...theme.fontFamily.sans],
        serif: ['var(--font-merriweather)', ...theme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
export default config;
