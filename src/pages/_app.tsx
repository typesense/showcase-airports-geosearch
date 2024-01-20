import type { AppProps } from 'next/app';
import { Inter, Merriweather } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['900'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-merriweather: ${merriweather.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}
