/* eslint-disable jsx-a11y/no-onchange */
import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Logo from '@/data/logo.svg';
import Link from './Link';
import SectionContainer from './SectionContainer';
import Footer from './Footer';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { isOnGuidelines } from '@/lib/utils/path';
import { usePathname } from 'next/navigation';

import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

console.log(fontSans, fontHeading);

const LayoutWrapper = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { locale, locales, defaultLocale } = router;

  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push(router.asPath, router.asPath, { locale });
  };

  return (
    <SectionContainer>
      <header
        className={`sticky top-0 z-40 w-full border-gray-200 border-opacity-60 bg-background text-black dark:border-gray-700 dark:text-white ${
          isOnGuidelines(pathname) ? 'border-b' : ''
        }`}
      >
        <div className="container flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-1">
                  <Logo className="mr-1 h-10 fill-foreground" />
                </div>
                {typeof siteMetadata.headerTitle[locale] === 'string' ? (
                  <div className="hidden h-6 text-xl font-semibold sm:block">
                    {siteMetadata.headerTitle[locale]}
                  </div>
                ) : (
                  siteMetadata.headerTitle[locale]
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 text-base font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {t(`headerNavLinks:${link.title.toLowerCase()}`)}
                </Link>
              ))}
            </div>
            <select
              onChange={changeLanguage}
              defaultValue={locale}
              style={{ textAlignLast: 'center' }}
              className="text-shadow-sm bg-transparent text-sm tracking-wide text-gray-900 dark:text-gray-100"
            >
              {locales.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </header>
      <main className="container mb-auto flex-1">{children}</main>
      <Footer />
    </SectionContainer>
  );
};

export default LayoutWrapper;
