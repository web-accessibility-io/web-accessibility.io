import { getAllFilesFrontMatter } from '@/lib/mdx';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayout';
import { PageSEO } from '@/components/SEO';

import useTranslation from 'next-translate/useTranslation';

export const POSTS_PER_PAGE = 5;

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : '';
  const posts = await getAllFilesFrontMatter('60-seconds-wcag', otherLocale);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return {
    props: { initialDisplayPosts, posts, pagination, locale: 'en', availableLocales: ['en'] },
  };
}

export default function SixtySecWcag({
  posts,
  initialDisplayPosts,
  pagination,
  locale,
  availableLocales,
}) {
  const { t } = useTranslation();
  return (
    <>
      <PageSEO
        title={`60 Seconds WCAG - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t('common:all')}
        type="60-seconds-wcag"
      />
    </>
  );
}
