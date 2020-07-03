import React, { memo } from 'react';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './DashboardTitle.module.scss';

const DashboardTitle: React.FC<{}> = () => {
  return (
    <div className={styles.root}>
      <FontAwesomeIcon
        className={styles.icon}
        icon={faExclamationCircle}
        color="inherit"
      />
      <h1 className={styles.title}>alerting-check-policy-conditions</h1>
    </div>
  );
};

export default memo(DashboardTitle);
