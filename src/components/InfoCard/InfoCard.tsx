import React, { memo } from 'react';
import {
  faExclamationTriangle,
  faLightbulb,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
}

const InfoCard: React.FC<InfoCardProps> = ({ title, subtitle, variant }) => {
  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <FontAwesomeIcon icon={variantIconsMap[variant]} />
      </div>
      <div className={styles.rightSide}>
        <Text size={TextSize.small}>{title}</Text>
        <Text size={TextSize.small} color={TextColor.secondary}>
          {subtitle}
        </Text>
      </div>
    </div>
  );
};

export default memo(InfoCard);
