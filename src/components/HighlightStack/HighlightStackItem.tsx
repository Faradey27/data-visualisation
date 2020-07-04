import React, { memo } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import theme from '../../theme.scss';
import Text, { TextColor, TextSize } from '../Text';
import styles from './HighlightStackItem.module.scss';

interface HighlightStackItemProps {
  title: string;
  description: string;
  iconType: IconProp;
  date?: Date;
  percentage?: number;
}

const HighlightStackItem: React.FC<HighlightStackItemProps> = ({
  title,
  description,
  iconType,
  date,
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
        <FontAwesomeIcon icon={iconType} />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.titleContainer}>
          <Text size={TextSize.small}>{title}</Text>
          {date && (
            <Text
              size={TextSize.small}
              color={TextColor.secondary}
              className={styles.date}
            >
              {formatDistanceToNow(date)} ago
            </Text>
          )}
        </div>

        <Text size={TextSize.small} color={TextColor.secondary}>
          {description}
        </Text>
      </div>
    </div>
  );
};

export default memo(HighlightStackItem);
