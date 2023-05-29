import { usePathname } from 'next/navigation';
import React from 'react';
import Link from './Link';

export function DocsSidebarNav({ items, overview }) {
  const pathname = usePathname();

  return items.length ? (
    <nav className="w-full">
      {items.map((item, index) => (
        <div key={'nav' + index} className="pb-8">
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
          {item.items ? <DocsSidebarNavItems items={item.items} overview={overview} /> : null}
        </div>
      ))}
    </nav>
  ) : null;
}

export function DocsSidebarNavItems({ items, overview }) {
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

  const activeHeading = useActiveItem(itemIds);

  function useActiveItem(itemIds, active) {
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

      itemIds?.forEach((id) => {
        if (!id) {
          return;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => {
        itemIds?.forEach((id) => {
          if (!id) {
            return;
          }

          const element = document.getElementById(id);
          if (element) {
            observer.unobserve(element);
          }
        });
      };
    }, [itemIds, active]);

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
                className="flex w-full items-center rounded-md p-2 hover:underline"
              >
                {item.title}
              </Link>
              {item.items && `#${activeHeading}` === item.href.slice(item.href.indexOf('#')) ? (
                <DocsSidebarNavItemsList items={item.items} />
              ) : null}
            </>
          ) : (
            <>
              <h5 key={'item' + index} className="flex w-full items-center rounded-md p-2">
                {item.title}
              </h5>
              {item.items ? <DocsSidebarNavItemsList items={item.items} /> : null}
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
