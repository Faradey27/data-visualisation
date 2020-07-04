import React, { memo, ReactNode } from 'react';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import Text, { TextColor, TextSize } from '../../components/Text';
import styles from './HighlightStack.module.scss';

interface HighlightStackProps {
  title: string;
  left: ReactNode;
  children: ReactNode;
}

const HighlightStack: React.FC<HighlightStackProps> = ({
  title,
  left,
  children,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Text uppercase size={TextSize.small} color={TextColor.secondary}>
          {title}
        </Text>
        <Text
          iconRight={faSortDown}
          size={TextSize.small}
          color={TextColor.secondary}
        >
          {left}
        </Text>
      </div>
      <div className={styles.itemsContainer}>{children}</div>
    </div>
  );
};

export default memo(HighlightStack);
