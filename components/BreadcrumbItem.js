import Link from 'next/link';

const BreadcrumbItem = ({ children, href, isCurrent, ...props }) => {
  return (
    <li {...props}>
      <Link
        href={href}
        passHref
        className={
          isCurrent
            ? 'block shrink-0 first-letter:capitalize'
            : 'block text-gray-500 first-letter:capitalize hover:text-gray-600 dark:text-gray-400'
        }
        aria-current={isCurrent ? 'page' : 'false'}
      >
        {children}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
