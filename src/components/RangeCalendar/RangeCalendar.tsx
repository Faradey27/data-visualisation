import React, { memo, useCallback } from 'react';
import clsx from 'clsx';

import Icon, { IconName } from '../Icon';
import styles from './RangeCalendar.module.scss';
import RangeCalendarBody from './RangeCalendarBody';

interface RangeCalendarProps {
  isOpen?: boolean;
  onOpen: () => void;
  onApply: (start: number, end: number) => void;
}

const RangeCalendar: React.FC<RangeCalendarProps> = ({
  isOpen,
  onOpen,
  onApply,
}) => {
  const handleApply = useCallback(
    (start, end) => {
      onApply(start, end);
    },
    [onApply]
  );
  const handleOpen = useCallback(
    (e) => {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
      onOpen();
    },
    [onOpen]
  );

  return (
    <div className={styles.root} onMouseDown={handleOpen}>
      <span>~15 hours ago</span>
      <span className={styles.arrow}>{' → '}</span>
      <span>~9 hours ago</span>
      <span className={styles.divider}>|</span>
      <Icon iconName={IconName.calendar} className={clsx(styles.icon)} />
      <Icon
        iconName={IconName.downArrow}
        className={clsx(styles.icon, styles.downArrowIcon)}
      />
      {isOpen ? <RangeCalendarBody onApply={handleApply} /> : null}
    </div>
  );
};

export default memo(RangeCalendar);
