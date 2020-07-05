import React, { memo, ReactNode } from 'react';
import clsx from 'clsx';

import Icon, { IconName } from '../Icon';
import styles from './HighlightStack.module.scss';

interface HighlightStackProps {
  title: string;
  actionTitle: ReactNode;
  children: ReactNode;
}

const HighlightStack: React.FC<HighlightStackProps> = ({
  title,
  actionTitle,
  children,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <a href="#todo" className={clsx(styles.title, styles.actionText)}>
          {actionTitle}
          <Icon
            iconName={IconName.caretDown}
            className={styles.actionTextIcon}
          />
        </a>
      </div>
      <div className={styles.itemsContainer}>{children}</div>
    </div>
  );
};

export default memo(HighlightStack);
