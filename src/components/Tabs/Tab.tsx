import React, { memo, useCallback } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import Text, { TextColor, TextSize } from '../Text';
import styles from './Tabs.module.scss';

interface TabProps {
  id: string;
  title: string;
  icon: IconProp;
  isSelected?: boolean;
  onClick: (id: string) => void;
}

const Tab: React.FC<TabProps> = ({ id, title, icon, isSelected, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(id);
  }, [id, onClick]);

  return (
    <div
      className={clsx(styles.tab, { [styles.selectedTab]: isSelected })}
      onClick={handleClick}
    >
      <div className={styles.tabContent}>
        <div className={styles.tabContentHeader}>
          <Text uppercase color={TextColor.secondary} size={TextSize.small}>
            {title}
          </Text>
          <FontAwesomeIcon
            className={styles.userIcon}
            icon={icon}
            color="inherit"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Tab);
