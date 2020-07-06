import React, { memo, ReactNode } from 'react';

import Icon, { IconName } from '../../../components/Icon';
import styles from './DrillDownLink.module.scss';

interface DrillDownLinkProps {
  icon: IconName;
  children: ReactNode;
}

const DrillDownLink: React.FC<DrillDownLinkProps> = ({ icon, children }) => {
  return (
    <span className={styles.root}>
      <Icon iconName={icon} className={styles.icon} />
      {children}
    </span>
  );
};

export default memo(DrillDownLink);
