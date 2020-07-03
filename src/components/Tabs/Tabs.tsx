import React, { memo } from 'react';

import styles from './Tabs.module.scss';

interface TabsProps {
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <div className={styles.tabs}>{children}</div>;
};

export default memo(Tabs);
