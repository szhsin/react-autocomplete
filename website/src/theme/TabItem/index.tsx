import { type JSX } from 'react';
import clsx from 'clsx';
import { useTabs } from '@docusaurus/theme-common/internal';
import type { Props } from '@theme/TabItem';

import styles from './styles.module.css';

export default function TabItem({ children, className, value }: Props): JSX.Element | null {
  const { selectedValue, lazy } = useTabs();
  const isSelected = value === selectedValue;

  if (!isSelected && lazy) {
    return null;
  }

  return (
    <div role="tabpanel" className={clsx(styles.tabItem, className)} hidden={!isSelected}>
      {children}
    </div>
  );
}
