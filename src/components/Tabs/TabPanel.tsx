import React, { memo } from 'react';

import styles from './Tabs.module.scss';

const TabPanel: React.FC<{}> = () => {
  return <div className={styles.tabPanel}></div>;
};

export default memo(TabPanel);
