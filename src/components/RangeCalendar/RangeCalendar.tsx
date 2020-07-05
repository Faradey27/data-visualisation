import React, { memo } from 'react';
import clsx from 'clsx';

import Icon, { IconName } from '../Icon';
import styles from './RangeCalendar.module.scss';

const RangeCalendar: React.FC<{}> = () => {
  return (
    <div className={styles.root}>
      <span>~15 hours ago</span>
      <span className={styles.arrow}>{' → '}</span>
      <span>~9 hours ago</span>
      <span className={styles.divider}>|</span>
      <Icon iconName={IconName.calendar} className={clsx(styles.icon)} />
      <Icon
        iconName={IconName.downArrow}
        className={clsx(styles.icon, styles.downArrowIcon)}
      />
    </div>
  );
};

export default memo(RangeCalendar);
