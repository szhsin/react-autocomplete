import { type JSX } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/TabItem';

import styles from './styles.module.css';

export default function TabItem({ children, hidden, className }: Props): JSX.Element {
  return (
    <div role="tabpanel" className={clsx(styles.tabItem, className)} {...{ hidden }}>
      {children}
    </div>
  );
}
