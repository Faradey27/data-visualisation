import React, { memo } from 'react';

import styles from './HeaderBar.module.scss';

const HeaderBar: React.FC<{}> = () => {
  return <header className={styles.root} />;
};

export default memo(HeaderBar);
