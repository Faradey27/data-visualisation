import React, { memo } from 'react';

import styles from './Tabs.module.scss';

interface TabPanelProps {
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <div className={styles.tabPanel}>{children}</div>;
};

export default memo(TabPanel);
