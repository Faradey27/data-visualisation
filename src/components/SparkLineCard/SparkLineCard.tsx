import React, { memo } from 'react';
import clsx from 'clsx';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

import theme from '../../theme.scss';
import Icon, { IconName } from '../Icon';
import styles from './SparkLineCard.module.scss';

interface SparkLineCardProps {
  title: string;
  iconName: IconName;
  data: any[];
  dataKey: string;
  currentValue?: string;
  isSelected?: boolean;
}

const SparkLineCard: React.FC<SparkLineCardProps> = ({
  data,
  dataKey,
  title,
  iconName,
  currentValue,
  isSelected,
}) => {
  return (
    <div className={clsx(styles.root, { [styles.withBorder]: !isSelected })}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <Icon iconName={iconName} />
      </div>
      <span
        className={clsx(styles.currentValue, {
          [styles.selectedValue]: isSelected,
        })}
      >
        {currentValue}
      </span>
      {!isSelected ? (
        <ResponsiveContainer width="100%" height={theme.space * 3}>
          <LineChart data={data}>
            <Line
              dot={false}
              type="monotype"
              dataKey={dataKey}
              stroke={theme.borderColor}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
};

export default memo(SparkLineCard);
