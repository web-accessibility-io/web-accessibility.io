import { isOnGuidelines } from '@/lib/utils/path';
import { usePathname } from 'next/navigation';

export default function SectionContainer({ children }) {
  const pathname = usePathname();

  if (isOnGuidelines(pathname)) {
    return <div className="flex min-h-screen flex-col">{children}</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex min-h-screen flex-col">{children}</div>
    </div>
  );
}
