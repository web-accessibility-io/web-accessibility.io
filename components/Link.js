/* eslint-disable jsx-a11y/anchor-has-content */
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'next/link';
import ExternalSvg from 'public/static/images/external.svg';

const CustomLink = ({ href, icon = true, ...rest }) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href}>
        <span {...rest} />
      </Link>
    );
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return (
    <>
      <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
        {rest.children}
        {icon ? (
          <ExternalSvg role="presentation" className="-ml-0.5 -mr-2 -mt-0.5 inline-block h-7 w-7" />
        ) : (
          ''
        )}
      </a>
    </>
  );
};

export default CustomLink;
