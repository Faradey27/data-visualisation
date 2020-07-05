import React, { memo } from 'react';

import Icon, { IconName } from '../../../components/Icon';
import theme from '../../../theme.scss';
import styles from './PinnedPoint.module.scss';

const width = 24;
const height = 24;

interface PinnedPointProps {
  x: number;
  y: number;
}

const PinnedPoint: React.FC<PinnedPointProps> = ({ x, y }) => {
  return (
    <div
      className={styles.root}
      style={{
        width,
        height,
        left: x - width / 2,
        top: y + theme.space * 5 + height / 2,
      }}
    >
      <div
        className={styles.circle}
        style={{
          width: width * 0.75,
          height: height * 0.75,
        }}
      >
        <Icon
          iconName={IconName.settings}
          style={{ width: width * 0.5, height: height * 0.5 }}
        />
      </div>
    </div>
  );
};

export default memo(PinnedPoint);
