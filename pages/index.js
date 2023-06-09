import siteMetadata from '@/data/siteMetadata';
import useTranslation from 'next-translate/useTranslation';

import { getAllFilesFrontMatter } from '@/lib/mdx';
import cn from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from '@/components/Link';
import NewsletterForm from '@/components/NewsletterForm';
import { PageSEO } from '@/components/SEO';
import { FileSearchOutlined, ReadOutlined, VideoCameraOutlined } from '@ant-design/icons';

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : '';
  const posts = await getAllFilesFrontMatter('blog', otherLocale);

  return { props: { posts, locale, availableLocales: locales } };
}

export default function Home({ posts, locale, availableLocales }) {
  const { t } = useTranslation();

  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteMetadata.linkedin}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on linkedin
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            A guide for making the web accessible
          </h1>
          <p className="max-w-[46rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Welcome to web-accessibility.io - your go-to resource for building accessible web
            applications! Join us in creating a world where technology is truly accessible to all!
          </p>
          <div className="space-x-4">
            <Link href="/playbook" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
            <Link
              href={siteMetadata.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            On project you&apos;ll find up-to-date statistics, comprehensive documentation, plain
            language guidelines, informative articles, poster, explantion videos and practical tips
            to help you get started.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border border-border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <ReadOutlined className="h-10 w-10 fill-current" style={{ fontSize: '3rem' }} />
              <div className="space-y-2">
                <h3 className="font-bold">Guidelines</h3>
                <p className="text-sm text-muted-foreground">
                  Plain language summary of the Web Content Accessibility Guidelines.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FileSearchOutlined className="h-10 w-10 fill-current" style={{ fontSize: '3rem' }} />
              <div className="space-y-2">
                <h3 className="font-bold">Posters (soon)</h3>
                <p className="text-sm text-muted-foreground">
                  Server and Client Components. Use hook.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <VideoCameraOutlined
                className="h-10 w-10 fill-current"
                style={{ fontSize: '3rem' }}
              />
              <div className="space-y-2">
                <h3 className="font-bold">Videos (soon)</h3>
                <p className="text-sm text-muted-foreground">
                  ORM using Prisma and deployed on PlanetScale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            web-accessibility.io is open source and powered by open source software. <br /> The code
            is available on{' '}
            <Link
              href={siteMetadata.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{' '}
          </p>
          {/* {stars && (
            <Link href={siteMetadata.github} target="_blank" rel="noreferrer" className="flex">
              <div className="flex items-center justify-center w-10 h-10 space-x-2 border rounded-md border-muted bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-foreground"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-l-0 border-r-8 border-solid border-muted border-y-8 border-y-transparent"></div>
                <div className="flex items-center h-10 px-4 font-medium border rounded-md border-muted bg-muted">
                  {stars} stars on GitHub
                </div>
              </div>
            </Link>
          )} */}
        </div>
      </section>
      {/* <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('common:greeting')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description[locale]}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">{t('common:pub')}</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          {t('common:more')} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            {t('common:all')} &rarr;
          </Link>
        </div>
      )} */}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm title={t('newsletter:title')} />
        </div>
      )}
    </>
  );
}
