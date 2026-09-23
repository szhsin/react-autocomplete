// Swizzled from Docusaurus 3.10.2 to support external links via attributes.link.
import React, { type JSX } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useScrollPositionBlocker,
  useTabsContextValue,
  useTabs,
  sanitizeTabsChildren,
  TabsProvider
} from '@docusaurus/theme-common/internal';
import useIsBrowser from '@docusaurus/useIsBrowser';
import type { Props } from '@theme/Tabs';
import ExternalLink from '@site/static/img/external-link.svg';
import styles from './styles.module.css';

function TabList({ className }: { className?: string }) {
  const { block, selectedValue, selectValue, tabValues } = useTabs();
  const tabRefs: (HTMLLIElement | null)[] = [];
  const { blockElementScrollPositionUntilNextRender } = useScrollPositionBlocker();

  const handleTabChange = (
    event:
      | React.FocusEvent<HTMLLIElement>
      | React.MouseEvent<HTMLLIElement>
      | React.KeyboardEvent<HTMLLIElement>
  ) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);

    const { value: newTabValue, attributes } = tabValues[newTabIndex];

    if (!attributes?.link && newTabValue !== selectedValue) {
      blockElementScrollPositionUntilNextRender(newTab);
      selectValue(newTabValue);
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    let focusElement: HTMLLIElement | null = null;

    switch (event.key) {
      case 'Enter': {
        handleTabChange(event);
        break;
      }
      case 'ArrowRight': {
        const nextTab = tabRefs.indexOf(event.currentTarget) + 1;
        focusElement = tabRefs[nextTab] ?? tabRefs[0]!;
        break;
      }
      case 'ArrowLeft': {
        const prevTab = tabRefs.indexOf(event.currentTarget) - 1;
        focusElement = tabRefs[prevTab] ?? tabRefs[tabRefs.length - 1]!;
        break;
      }
      default:
        break;
    }

    (focusElement?.querySelector('a') ?? focusElement)?.focus();
  };

  return (
    <ul
      role="tablist"
      aria-orientation="horizontal"
      className={clsx(
        'tabs',
        {
          'tabs--block': block
        },
        className
      )}
    >
      {tabValues.map(({ value, label, attributes }, index) => {
        const tab = label ?? value;
        const { link, ...tabAttributes } = attributes ?? {};
        const href = link as string | undefined;
        return (
          <li
            // TODO extract TabListItem
            role={href ? 'presentation' : 'tab'}
            tabIndex={href ? undefined : selectedValue === value ? 0 : -1}
            aria-selected={href ? undefined : selectedValue === value}
            key={value}
            ref={(tabControl) => {
              tabRefs[index] = tabControl;
            }}
            onKeyDown={handleKeydown}
            onClick={handleTabChange}
            {...tabAttributes}
            className={clsx(
              'tabs__item',
              styles.tabItem,
              href && styles.tabItemLink,
              attributes?.className as string,
              {
                'tabs__item--active': selectedValue === value
              }
            )}
          >
            {href ? (
              <a
                className={styles.tabLink}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tab} <ExternalLink />
              </a>
            ) : (
              tab
            )}
          </li>
        );
      })}
    </ul>
  );
}

function TabsContainer({ className, children }: Props): JSX.Element {
  return (
    <div className={clsx(ThemeClassNames.tabs.container, 'tabs-container', styles.tabList)}>
      <TabList className={className} />
      <div className="margin-top--md">{children}</div>
    </div>
  );
}

export default function Tabs(props: Props): JSX.Element {
  const isBrowser = useIsBrowser();
  const children = sanitizeTabsChildren(props.children);
  const value = useTabsContextValue({ ...props, children });
  return (
    <TabsProvider
      value={value}
      // Remount tabs after hydration
      // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
      key={String(isBrowser)}
    >
      <TabsContainer className={props.className}>{children}</TabsContainer>
    </TabsProvider>
  );
}
