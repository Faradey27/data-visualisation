import React, { memo } from 'react';

import styles from './InfoCard.module.scss';

export enum InfoCardVariant {
  resource = 'resource',
  insight = 'insight',
  alert = 'alert',
}

interface InfoCardProps {
  variant: InfoCardVariant;
}

const InfoCard: React.FC<InfoCardProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.leftSide} />
      <div className={styles.rightSide} />
    </div>
  );
};

export default memo(InfoCard);
