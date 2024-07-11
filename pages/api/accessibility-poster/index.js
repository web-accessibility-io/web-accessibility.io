import { ImageResponse } from '@vercel/og';
import LogoWhite from '@/data/logo-white.svg';
import LogoBlack from '@/data/logo.svg';
import { ogImageSchema } from '@/lib/validations/og';

export const runtime = 'edge';

const fontHeading = fetch(
  new URL('../../../assets/fonts/CalSans-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function GET(req) {
  try {
    const url = new URL(req.url);
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));
    const heading =
      values.heading.length > 140 ? `${values.heading.substring(0, 140)}...` : values.heading;

    const { mode } = values;
    const paint = mode === 'dark' ? '#fff' : '#000';
    const paintIcon = mode === 'dark' ? '#000' : '#fff';

    const fontSize = heading.length > 100 ? '70px' : '100px';

    const tHeading = await fontHeading;

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start"
          style={{
            color: paint,
            fontFamily: '"fontRegular"',
            fontSize: '28px',
            background: mode === 'dark' ? 'linear-gradient(90deg, #082f49 0%, #111 100%)' : 'white',
          }}
        >
          <span
            tw="flex items-center justify-between text-3xl"
            style={{
              fontFamily: '"fontHeading"',
              fontSize: '1.5em',
            }}
          >
            {mode === 'dark' ? (
              <LogoWhite tw="h-20 w-20 mr-5" />
            ) : (
              <LogoBlack tw="h-20 w-20 mr-5" />
            )}{' '}
            web-accessibility.io
          </span>
          <div tw="flex flex-col py-10 mt-16">
            <div tw="flex text-2xl uppercase font-bold tracking-tight" style={{ fontSize: '40px' }}>
              What is expected
            </div>
            <div
              tw="flex leading-[1.1] font-bold"
              style={{
                fontFamily: '"fontHeading"',
                fontWeight: 'bold',
                fontSize,
              }}
            >
              Role of&nbsp;<span tw="text-sky-400 ml-5">{heading}</span>
            </div>
            <div
              tw="flex leading-[1.1] font-bold"
              style={{
                fontFamily: '"fontHeading"',
                fontWeight: 'bold',
                fontSize,
              }}
            >
              in Web Accessibility
            </div>
            <div
              tw="flex mt-5"
              style={{
                fontSize: '1.5em',
              }}
            >
              As a Web Developer, you have the ability to make the web inclusive for all. Through
              accessible coding practices, semantic HTML, and keyboard navigation, you create
              websites that can be accessed and used by people of diverse abilities. Collaborating
              with designers and testers, you play a vital role in building a barrier-free online
              experience. Your code shapes an inclusive digital world.
            </div>
          </div>
          <div
            tw="flex flex-col flex-1 bg-zinc-400 w-full h-full my-10 p-10 rounded-2xl bg-opacity-20"
            style={{
              fontSize: '1.3em',
            }}
          >
            <div tw="flex items-center w-full my-9">
              <div tw="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full border-double border-[10px] border-sky-500 mr-10">
                <span tw="w-18 h-18" style={{ fontSize: '2em', color: '#000' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    tw="w-full h-full"
                  >
                    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                    <path d="M15 8h-5" />
                    <path d="M15 12h-5" />
                  </svg>
                </span>
              </div>
              <div>
                Familiarize yourself with web accessibility standards and guidelines, such as WCAG
                2.1 (Web Content Accessibility Guidelines).
              </div>
            </div>
            <div tw="flex items-center w-full my-9">
              <div tw="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full border-double border-[10px] border-sky-500 mr-10">
                <span tw="w-18 h-18" style={{ fontSize: '2em', color: '#000' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    tw="w-full h-full"
                  >
                    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                    <path d="M15 8h-5" />
                    <path d="M15 12h-5" />
                  </svg>
                </span>
              </div>
              <div>
                Familiarize yourself with web accessibility standards and guidelines, such as WCAG
                2.1 (Web Content Accessibility Guidelines).
              </div>
            </div>
            <div tw="flex items-center w-full my-9">
              <div tw="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full border-double border-[10px] border-sky-500 mr-10">
                <span tw="w-18 h-18" style={{ fontSize: '2em', color: '#000' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    tw="w-full h-full"
                  >
                    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                    <path d="M15 8h-5" />
                    <path d="M15 12h-5" />
                  </svg>
                </span>
              </div>
              <div>
                Familiarize yourself with web accessibility standards and guidelines, such as WCAG
                2.1 (Web Content Accessibility Guidelines).
              </div>
            </div>
            <div tw="flex items-center w-full my-9">
              <div tw="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full border-double border-[10px] border-sky-500 mr-10">
                <span tw="w-18 h-18" style={{ fontSize: '2em', color: '#000' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    tw="w-full h-full"
                  >
                    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                    <path d="M15 8h-5" />
                    <path d="M15 12h-5" />
                  </svg>
                </span>
              </div>
              <div>
                Familiarize yourself with web accessibility standards and guidelines, such as WCAG
                2.1 (Web Content Accessibility Guidelines).
              </div>
            </div>
            <div tw="flex items-center w-full my-9">
              <div tw="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full border-double border-[10px] border-sky-500 mr-10">
                <span tw="w-18 h-18" style={{ fontSize: '2em', color: '#000' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    tw="w-full h-full"
                  >
                    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                    <path d="M15 8h-5" />
                    <path d="M15 12h-5" />
                  </svg>
                </span>
              </div>
              <div>
                Familiarize yourself with web accessibility standards and guidelines, such as WCAG
                2.1 (Web Content Accessibility Guidelines).
              </div>
            </div>
            <div tw="flex items-center w-full my-9">
              <div tw="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full border-double border-[10px] border-sky-500 mr-10">
                <span tw="w-18 h-18" style={{ fontSize: '2em', color: '#000' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    tw="w-full h-full"
                  >
                    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                    <path d="M15 8h-5" />
                    <path d="M15 12h-5" />
                  </svg>
                </span>
              </div>
              <div>
                Familiarize yourself with web accessibility standards and guidelines, such as WCAG
                2.1 (Web Content Accessibility Guidelines).
              </div>
            </div>
            <div tw="flex items-center w-full my-9">
              <div tw="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full border-double border-[10px] border-sky-500 mr-10">
                <span tw="w-18 h-18" style={{ fontSize: '2em', color: '#000' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    tw="w-full h-full"
                  >
                    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                    <path d="M15 8h-5" />
                    <path d="M15 12h-5" />
                  </svg>
                </span>
              </div>
              <div>
                Familiarize yourself with web accessibility standards and guidelines, such as WCAG
                2.1 (Web Content Accessibility Guidelines).
              </div>
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl" style={{ fontSize: '1em' }}>
              web-accessibility.io
            </div>
            <div tw="flex items-center text-xl" style={{ fontSize: '1em' }}>
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 36c-9.02 4-10-4-14-4"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div tw="flex ml-2">github.com/web-accessibility-io/web-accessibility.io</div>
            </div>
          </div>
        </div>
      ),
      {
        width: values.width,
        height: values.height,
        fonts: [
          {
            name: 'fontHeading',
            data: tHeading,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
