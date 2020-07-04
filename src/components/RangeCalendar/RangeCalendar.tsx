import React, { memo } from 'react';
import { faChevronDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Text from '../Text';
import { TextColor, TextSize } from '../Text/Text';
import styles from './RangeCalendar.module.scss';

const RangeCalendar: React.FC<{}> = () => {
  return (
    <div className={styles.root}>
      <div>
        <Text size={TextSize.small} link uppercase color={TextColor.accent}>
          ~15 hours ago {' → '}
        </Text>
        <Text size={TextSize.small} link uppercase color={TextColor.accent}>
          ~9 hours ago
        </Text>
      </div>
    </div>
  );
};

export default memo(RangeCalendar);
