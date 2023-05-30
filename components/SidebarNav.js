import { usePathname } from 'next/navigation';
import React from 'react';
import Link from './Link';

export function DocsSidebarNav({ items, overview }) {
  const pathname = usePathname();

  function getHrefValues(arr) {
    const hrefValues = [];

    function traverse(obj, level) {
      if (obj && typeof obj === 'object') {
        if (Array.isArray(obj)) {
          obj.forEach((item) => traverse(item, level));
        } else if (obj.href && typeof obj.href === 'string' && level === 2) {
          const href = obj.href;
          const hashIndex = href.indexOf('#');
          if (hashIndex !== -1) {
            hrefValues.push(href.slice(hashIndex + 1));
          }
        } else {
          Object.values(obj).forEach((value) => traverse(value, level + 1));
        }
      }
    }

    traverse(arr, 1);
    return hrefValues;
  }

  return items.length ? (
    <nav className="w-full">
      {items.map((item, index) => (
        <div key={'nav' + index} className="pb-4">
          {item?.href ? (
            <Link
              href={overview ? sliceStringAfterHash(item.href) : item.href}
              className="font-semibold hover:underline"
            >
              {item.title}
            </Link>
          ) : (
            <h4 className="font-semibold">{item.title}</h4>
          )}
          {item.items ? (
            <DocsSidebarNavItems
              items={item.items}
              itemIdss={getHrefValues(items)}
              overview={overview}
            />
          ) : null}
        </div>
      ))}
    </nav>
  ) : null;
}

export function DocsSidebarNavItems({ items, overview, itemIdss }) {
  const itemIds = React.useMemo(
    () =>
      items
        ? items
            .flatMap((item) => [item.href])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [items]
  );

  const activeHeading = useActiveItem(itemIdss);

  function useActiveItem(itemIdss, active) {
    const [activeId, setActiveId] = React.useState('');

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: `0% 0% -80% 0%` }
      );

      itemIdss?.forEach((id) => {
        if (!id) {
          return;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => {
        itemIdss?.forEach((id) => {
          if (!id) {
            return;
          }

          const element = document.getElementById(id);
          if (element) {
            observer.unobserve(element);
          }
        });
      };
    }, [itemIdss, active]);

    return activeId;
  }

  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items?.length &&
        items.map((item, index) =>
          item.href ? (
            <>
              <Link
                key={'item' + index}
                href={overview ? sliceStringAfterHash(item.href) : item.href}
                className={`flex w-full items-center rounded-md p-2 hover:underline ${
                  `#${activeHeading}` === item.href.slice(item.href.indexOf('#'))
                    ? 'font-semibold'
                    : ''
                }`}
              >
                {item.title}
              </Link>
              {!overview ||
              (item.items && `#${activeHeading}` === item.href.slice(item.href.indexOf('#'))) ? (
                <DocsSidebarNavItemsList items={item.items} />
              ) : null}
            </>
          ) : (
            <>
              <h5
                key={'item' + index}
                className={`flex w-full items-center rounded-md p-2 hover:underline ${
                  `#${activeHeading}` === item.href.slice(item.href.indexOf('#'))
                    ? 'font-semibold'
                    : ''
                }`}
              >
                {item.title}
              </h5>
              {!overview ||
              (item.items && `#${activeHeading}` === item.href.slice(item.href.indexOf('#'))) ? (
                <DocsSidebarNavItemsList items={item.items} />
              ) : null}
            </>
          )
        )}
    </div>
  ) : null;
}

export function DocsSidebarNavItemsList({ items }) {
  return items?.length ? (
    <ul className="grid grid-flow-row auto-rows-max text-sm">
      {items?.length &&
        items.map((item, index) =>
          item.href ? (
            <li key={'list' + index}>
              <Link
                href={item.href}
                className="flex w-full items-center rounded-md p-2 pl-4 hover:underline"
              >
                {item.title}
              </Link>
              {item.items ? <DocsSidebarNavItems items={item.items} /> : null}
            </li>
          ) : (
            <li key={'list' + index}>
              <h5 className="flex w-full items-center rounded-md p-2">{item.title}</h5>
              {item.items ? <DocsSidebarNavItems items={item.items} /> : null}
            </li>
          )
        )}
    </ul>
  ) : null;
}

function sliceStringAfterHash(str) {
  const hashIndex = str.indexOf('#');
  if (hashIndex !== -1) {
    return str.slice(hashIndex);
  }
  return '';
}
