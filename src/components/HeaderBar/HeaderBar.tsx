import React, { memo } from 'react';

import Icon, { IconName } from '../Icon';
import styles from './HeaderBar.module.scss';

const HeaderBar: React.FC<{}> = () => {
  return (
    <header className={styles.root}>
      <div className={styles.rightSideContent}>
        <a href="#todo" className={styles.userName}>
          dashbird.io
          <Icon
            iconName={IconName.downArrow}
            className={styles.downArrowIcon}
          />
        </a>
        <Icon iconName={IconName.user} className={styles.userIcon} />
      </div>
    </header>
  );
};

export default memo(HeaderBar);
