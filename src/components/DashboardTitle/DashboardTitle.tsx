import React, { memo, ReactNode } from 'react';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './DashboardTitle.module.scss';

const DashboardTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.root}>
      <FontAwesomeIcon
        className={styles.icon}
        icon={faExclamationCircle}
        color="inherit"
      />
      <h1 className={styles.title}>{children}</h1>
    </div>
  );
};

export default memo(DashboardTitle);
