import React, { memo, useCallback } from 'react';

import Icon, { IconName } from '../Icon';
import styles from './RangeCalendarBody.module.scss';

interface RangeCalendarBodyProps {
  onApply: (start: number, end: number) => void;
}

const RangeCalendarBody: React.FC<RangeCalendarBodyProps> = ({ onApply }) => {
  // TODO should receive proper data from each item
  const handleApply = useCallback(() => {
    onApply(Date.now(), Date.now() + 5000);
  }, [onApply]);

  return (
    <div className={styles.root}>
      <p className={styles.title}>Quick select</p>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <div className={styles.actionContainer}>
            <span className={styles.action}>{'Last'}</span>
            <Icon
              iconName={IconName.downArrow}
              className={styles.iconDownArrow}
            />
          </div>
          <div className={styles.actionContainer}>
            <span className={styles.action}>{'15'}</span>
            <Icon
              iconName={IconName.downArrow}
              className={styles.iconDownArrow}
            />
          </div>
          <div className={styles.actionContainer}>
            <span className={styles.action}>{'Minutes'}</span>
            <Icon
              iconName={IconName.downArrow}
              className={styles.iconDownArrow}
            />
          </div>
        </div>
        <button className={styles.applyButton} onClick={handleApply}>
          Apply
        </button>
      </div>
      <p className={styles.title}>Commonly used</p>
      <div className={styles.commonlyUsed}>
        <div>
          <p className={styles.action} onClick={handleApply}>
            {'Today'}
          </p>
          <p className={styles.action} onClick={handleApply}>
            {'This week'}
          </p>
          <p className={styles.action} onClick={handleApply}>
            {'Last 15 minutes'}
          </p>
          <p className={styles.action} onClick={handleApply}>
            {'Last 30 minutes'}
          </p>
          <p className={styles.action} onClick={handleApply}>
            {'Last 1 hour'}
          </p>
        </div>
        <div>
          <p className={styles.action} onClick={handleApply}>
            {'Last 24 hours'}
          </p>
          <p className={styles.action} onClick={handleApply}>
            {'Last 7 days'}
          </p>
          <p className={styles.action} onClick={handleApply}>
            {'Last 30 days'}
          </p>
          <p className={styles.action} onClick={handleApply}>
            {'Last 90 days'}
          </p>
          <p className={styles.action} onClick={handleApply}>
            {'Last 1 year'}
          </p>
        </div>
      </div>
      <p className={styles.title}>Recently used ranges</p>
      <div className={styles.recentlyUsed}>
        <p className={styles.action} onClick={handleApply}>
          {'May 19 @ 01:03:02 to May 20, 2020 @01:03:02'}
        </p>
        <p className={styles.action} onClick={handleApply}>
          {'May 22 @ 01:03:02 to May 20, 2020 @01:03:02'}
        </p>
        <p className={styles.action} onClick={handleApply}>
          {'May 25 @ 01:03:02 to May 20, 2020 @01:03:02'}
        </p>
      </div>
    </div>
  );
};

export default memo(RangeCalendarBody);
