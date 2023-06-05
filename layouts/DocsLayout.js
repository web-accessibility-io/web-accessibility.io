import { DocsConfig } from '@/data/playbook';
import { DocsSidebarNav } from '@/components/SidebarNav';
import PageTitle from '@/components/PageTitle';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import formatDate from '@/lib/utils/formatDate';
import Comments from '@/components/comments';
import Link from '@/components/Link';
import TOCInline from '@/components/Toc';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/BreadcrumbItem';
import SectionContainer from '@/components/SectionContainer';
import { BlogSEO } from '@/components/SEO';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import siteMetadata from '@/data/siteMetadata';
import { usePathname } from 'next/navigation';
import { GithubOutlined, GlobalOutlined, TwitterOutlined } from '@ant-design/icons';

const editUrl = (slug, locale) =>
  `${siteMetadata.siteRepo}/blob/master/data/playbook/${slug}.${
    locale === 'en' ? 'd' : locale
  }.mdx`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`;

export default function DocsLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  availableLocales,
  children,
  toc,
  overview,
}) {
  const { date, title, slug, fileName } = frontMatter;
  const { t } = useTranslation();
  const { locale } = useRouter();

  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();
  const pathname = usePathname();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split('?')[0];
    let pathArray = pathWithoutQuery.split('/');
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== '');

    const breadcrumbs = pathArray.map((path, index) => {
      const href = '/' + pathArray.slice(0, index + 1).join('/');
      const label = path
        .slice(0, path.indexOf('#') === -1 ? path.length : path.indexOf('#'))
        .replace(/\d/g, '')
        .replace(/-/g, ' ');

      return {
        href,
        label: label,
        isCurrent: index === pathArray.length - 1,
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    <SectionContainer>
      <BlogSEO
        availableLocales={availableLocales}
        url={`${siteMetadata.siteUrl}/playbook/${frontMatter.slug}`}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="styled-scrollbar fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-scroll border-r border-gray-200 border-opacity-60 py-6 pr-2 dark:border-gray-700 md:sticky md:block lg:py-10">
          <DocsSidebarNav items={DocsConfig.sidebarNav} overview={overview} />
        </aside>
        <article className={`relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_250px]`}>
          <div>
            {breadcrumbs && breadcrumbs.length > 1 && (
              <Breadcrumb>
                {breadcrumbs.map((breadcrumb) => (
                  <BreadcrumbItem
                    key={breadcrumb.href}
                    href={breadcrumb.href}
                    isCurrent={breadcrumb.isCurrent}
                  >
                    {breadcrumb.label}
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            )}
            <div className="prose mx-auto w-full min-w-0 max-w-none dark:prose-dark">
              {children}
            </div>
            <div className="mt-8 border-y border-gray-200 dark:border-gray-700">
              <div className="py-6 text-sm text-gray-700 dark:text-gray-300">
                <Link
                  href={discussUrl(slug)}
                  rel="nofollow"
                  className="mx-1 inline-flex items-center"
                >
                  <span className="mr-1">{t('common:twitter')}</span>{' '}
                  <TwitterOutlined role="presentation" />
                </Link>
                {` • `}
                <Link href={editUrl(slug, locale)} className="mx-1 inline-flex items-center">
                  <span className="mr-1">{t('common:github')}</span>{' '}
                  <GithubOutlined role="presentation" />
                </Link>
                {` • `}
                <Link href="/playbook/sources" className="mx-1 inline-flex items-center">
                  <span className="mr-1">{t('common:mainSources')}</span>
                  <GlobalOutlined />
                </Link>
              </div>
            </div>
            <Comments frontMatter={frontMatter} />
          </div>

          {toc && (
            <div className="hidden text-sm xl:block">
              <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
                <TOCInline toc={toc} toHeading={2} />
              </div>
            </div>
          )}
        </article>
      </div>
    </SectionContainer>
  );
}
