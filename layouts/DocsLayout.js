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
  const { date, title } = frontMatter;
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
          </div>

          {toc && (
            <div className="hidden text-sm xl:block">
              <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
                <TOCInline toc={toc} toHeading={2} />
              </div>
            </div>
          )}
          <footer>
            {/* <div className="text-sm font-medium leading-5 divide-gray-200 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
              {(next || prev) && (
                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                  {prev && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {t('common:preva')}
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {t('common:nexta')}
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div> */}
            {pathname !== '/playbook' && (
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/playbook"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; {t('common:backPlaybook')}
                </Link>
              </div>
            )}
          </footer>
        </article>
      </div>
    </SectionContainer>
  );
}
