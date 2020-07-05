import React, { memo } from 'react';

import styles from './RangeCalendar.module.scss';

const RangeCalendar: React.FC<{}> = () => {
  return (
    <div className={styles.root}>
      <div>
        <span>~15 hours ago {' → '}</span>
        <span>~9 hours ago</span>
      </div>
    </div>
  );
};

export default memo(RangeCalendar);
