import React, { memo, useCallback } from 'react';
import clsx from 'clsx';

import styles from './Tabs.module.scss';

interface TabProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  isSelected?: boolean;
  onClick: (id: string) => void;
}

const Tab: React.FC<TabProps> = ({ id, children, isSelected, onClick }) => {
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
