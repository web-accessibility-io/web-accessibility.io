import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx';
import { MDXLayoutRenderer } from '@/components/MDXComponents';

const DEFAULT_LAYOUT = 'DocsLayout';

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : '';
  const authorDetails = await getFileBySlug('playbook', [`default`], otherLocale);
  const allPosts = await getAllFilesFrontMatter('playbook', otherLocale);
  return { props: { allPosts, authorDetails, availableLocales: ['en'] } };
}

export default function Playbook({ allPosts, authorDetails, availableLocales }) {
  const { mdxSource, frontMatter, toc } = authorDetails;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      overview={true}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
      availableLocales={availableLocales}
    />
  );
}
