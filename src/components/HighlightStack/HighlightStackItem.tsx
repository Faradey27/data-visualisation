import React, { memo } from 'react';
import clsx from 'clsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import theme from '../../theme.scss';
import Icon, { IconName } from '../Icon';
import styles from './HighlightStackItem.module.scss';

interface HighlightStackItemProps {
  title: string;
  description: string;
  iconName: IconName;
  timestamp?: number;
  percentage?: number;
}

const HighlightStackItem: React.FC<HighlightStackItemProps> = ({
  title,
  description,
  iconName,
  timestamp,
  percentage = 0,
}) => {
  return (
    <div
      className={styles.root}
      style={{
        background: `linear-gradient(90deg, #f8f8fe ${100 * percentage}%, ${
          theme.white
        } 0%)`,
      }}
    >
      <div className={styles.leftSide}>
        <Icon iconName={iconName} />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>{title}</span>
          {timestamp && (
            <span className={clsx(styles.title, styles.secondaryText)}>
              {formatDistanceToNow(new Date(timestamp))} ago
            </span>
          )}
        </div>
        <span className={clsx(styles.title, styles.secondaryText)}>
          {description}
        </span>
      </div>
    </div>
  );
};

export default memo(HighlightStackItem);
