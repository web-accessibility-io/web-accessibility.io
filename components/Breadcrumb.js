import { Children } from 'react';
import { Fragment } from 'react';

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const childrenWithSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span>/</span>
        </Fragment>
      );
    }
    return child;
  });

  return (
    <nav className="mb-10" aria-label="breadcrumb">
      <ol className="flex items-center space-x-4">{childrenWithSeperator}</ol>
    </nav>
  );
};

export default Breadcrumb;
