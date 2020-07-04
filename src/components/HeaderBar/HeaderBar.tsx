import React, { memo } from 'react';
import { faChevronDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Text from '../Text';
import styles from './HeaderBar.module.scss';

const HeaderBar: React.FC<{}> = () => {
  return (
    <header className={styles.root}>
      <div className={styles.rightSideContent}>
        <Text uppercase iconRight={faChevronDown}>
          dashbird.io
        </Text>
        <FontAwesomeIcon
          className={styles.userIcon}
          icon={faUserCircle}
          color="inherit"
        />
      </div>
    </header>
  );
};

export default memo(HeaderBar);
