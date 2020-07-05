import React, { memo } from 'react';

import theme from '../../../theme.scss';
import styles from './DragPoint.module.scss';

const width = 18;
const height = 18;

interface DragPointProps {
  x: number;
  y: number;
}

const DragPoint: React.FC<DragPointProps> = ({ x, y }) => {
  return (
    <div
      className={styles.root}
      style={{
        width,
        height,
        left: x - width / 2,
        top: y + theme.space * 5 + height / 2 + 5,
      }}
    >
      <div
        className={styles.circle}
        style={{ width: width / 3, height: height / 3 }}
      />
    </div>
  );
};

export default memo(DragPoint);
