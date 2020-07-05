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
  children?: React.ReactNode;
  isSelected?: boolean;
  onClick: (id: string) => void;
}

const Tab: React.FC<TabProps> = ({
  id,
  title,
  icon,
  children,
  isSelected,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick(id);
  }, [id, onClick]);

  return (
    <div
      className={clsx(styles.tab, { [styles.selectedTab]: isSelected })}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default memo(Tab);
