import React, { memo } from 'react';
import {
  faExclamationTriangle,
  faLightbulb,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import theme from '../../theme.scss';
import Text, { TextColor, TextSize } from '../Text';
import styles from './InfoCard.module.scss';

export enum InfoCardVariant {
  resource = 'resource',
  insight = 'insight',
  alert = 'alert',
}

const variantIconsMap = {
  [InfoCardVariant.resource]: faTable,
  [InfoCardVariant.insight]: faLightbulb,
  [InfoCardVariant.alert]: faExclamationTriangle,
};

interface InfoCardProps {
  title: string;
  subtitle: string;
  variant: InfoCardVariant;
  date?: number;
  ratio?: number;
}

const formatDate = (date?: number) => {
  if (date) {
    return '3 days ago';
  }
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  subtitle,
  variant,
  date,
  ratio = 0,
}) => {
  console.log(100 * ratio, 100 - 100 * ratio);
  return (
    <div
      className={styles.root}
      style={{
        background: `linear-gradient(90deg, #f8f8fe ${100 * ratio}%, ${
          theme.white
        } 0%)`,
      }}
    >
      <div className={styles.leftSide}>
        <FontAwesomeIcon icon={variantIconsMap[variant]} />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.title}>
          <Text size={TextSize.small}>{title}</Text>
          <Text size={TextSize.small} color={TextColor.secondary}>
            {formatDate(date)}
          </Text>
        </div>
        <Text size={TextSize.small} color={TextColor.secondary}>
          {subtitle}
        </Text>
      </div>
      <div className={styles.procent} />
    </div>
  );
};

export default memo(InfoCard);
