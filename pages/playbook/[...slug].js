import PageTitle from '@/components/PageTitle';
import { MDXLayoutRenderer } from '@/components/MDXComponents';
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx';
import { DashboardTableOfContents } from '@/components/Toc';
import TOCInline from '@/components/TOCInline';
import generateRss from '@/lib/generate-rss';
import fs from 'fs';

const DEFAULT_LAYOUT = 'DocsLayout';

export async function getStaticPaths({ locales, defaultLocale }) {
  const localesPost = locales
    .map((locale) => {
      const otherLocale = locale !== defaultLocale ? locale : '';
      const posts = getFiles('playbook', otherLocale);
      return posts.map((post) => [post, locale]);
    })
    .flat();

  return {
    paths: localesPost.map(([p, l]) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
      locale: l,
    })),
    fallback: false,
  };
}

export async function getStaticProps({ defaultLocale, locales, locale, params }) {
  const otherLocale = locale !== defaultLocale ? locale : '';
  const allPosts = await getAllFilesFrontMatter('playbook', otherLocale);
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'));
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug('playbook', params.slug.join('/'), otherLocale);
  const authorList = post.frontMatter.authors || ['default'];
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author], otherLocale);
    return authorResults.frontMatter;
  });
  const authorDetails = await Promise.all(authorPromise);

  // rss
  const rss = generateRss(allPosts, locale, defaultLocale, 'feed.xml', 'playbook');
  fs.writeFileSync(`./public/playbook-feed${otherLocale === '' ? '' : `.${otherLocale}`}.xml`, rss);

  // Checking if available in other locale for SEO
  const availableLocales = [];
  await locales.forEach(async (ilocal) => {
    const otherLocale = ilocal !== defaultLocale ? ilocal : '';
    const iAllPosts = await getAllFilesFrontMatter('playbook', otherLocale);
    iAllPosts.map((ipost) => {
      if (ipost.slug === post.frontMatter.slug && ipost.slug !== '') availableLocales.push(ilocal);
    });
  });

  return { props: { post, authorDetails, prev, next, availableLocales } };
}

export default function Playbook({ post, authorDetails, prev, next, availableLocales }) {
  const { mdxSource, toc, frontMatter } = post;

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          overview={false}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
          availableLocales={availableLocales}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
}
