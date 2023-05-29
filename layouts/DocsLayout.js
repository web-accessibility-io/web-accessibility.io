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
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="styled-scrollbar fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-scroll border-r py-6 pr-2 md:sticky md:block lg:py-10">
        <DocsSidebarNav items={DocsConfig.sidebarNav} overview={overview} />
      </aside>
      <article className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
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
          <div className="prose mx-auto w-full min-w-0 max-w-none dark:prose-dark">{children}</div>
        </div>

        {toc && (
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
              <TOCInline toc={toc} toHeading={3} />
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
