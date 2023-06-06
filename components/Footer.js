import Link from './Link';
import siteMetadata from '@/data/siteMetadata';
import SocialIcon from '@/components/social-icons';
import { usePathname } from 'next/navigation';
import { isOnGuidelines } from '@/lib/utils/path';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className={`border-gray-200 dark:border-gray-700 ${
        isOnGuidelines(pathname) ? 'border-t' : ''
      }`}
    >
      <div className="mb-2 mt-8 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">web-accessibility.io</Link>
        </div>
      </div>
    </footer>
  );
}
