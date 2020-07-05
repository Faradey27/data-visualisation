import React, { memo, ReactNode } from 'react';

import Icon, { IconName } from '../Icon';
import styles from './DashboardTitle.module.scss';

const DashboardTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Icon iconName={IconName.problem} className={styles.icon} />
      <h1 className={styles.title}>{children}</h1>
    </div>
  );
};

export default memo(DashboardTitle);
