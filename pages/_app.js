import '@/css/tailwind.css';
import '@/css/prism.css';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

import siteMetadata from '@/data/siteMetadata';
import Analytics from '@/components/analytics';
import LayoutWrapper from '@/components/LayoutWrapper';
import RSS from '@/components/Rss';
import { ClientReload } from '@/components/ClientReload';
import cn from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <div className={cn('font-sans', fontSans.variable, fontHeading.variable)}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </div>
      <RSS />
    </ThemeProvider>
  );
}
