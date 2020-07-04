import React, { memo } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import RangeCalendar from '../../../components/RangeCalendar';
import Text, { TextColor, TextSize } from '../../../components/Text';
import styles from './ChartLegend.module.scss';

const messages = defineMessage({
  pendingIncreased: {
    id: 'chartsWidget.pendingIncreased',
    defaultMessage: 'Pending increased',
  },
  pendingResolved: {
    id: 'chartsWidget.pendingResolved',
    defaultMessage: 'Pending resolved',
  },
  alerts: {
    id: 'chartsWidget.alerts',
    defaultMessage: 'Alerts',
  },
  insights: {
    id: 'chartsWidget.insights',
    defaultMessage: 'Insights',
  },
  configChange: {
    id: 'chartsWidget.configChange',
    defaultMessage: 'Config. change',
  },
});

const ChartLegend: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <Text
          className={styles.legendItem}
          size={TextSize.small}
          color={TextColor.secondary}
        >
          {intl.formatMessage(messages.pendingIncreased)}
        </Text>
        <Text
          className={styles.legendItem}
          size={TextSize.small}
          color={TextColor.secondary}
        >
          {intl.formatMessage(messages.pendingResolved)}
        </Text>
        <Text
          className={styles.legendItem}
          size={TextSize.small}
          color={TextColor.accent}
        >
          {intl.formatMessage(messages.alerts)}
        </Text>
        <Text
          className={styles.legendItem}
          size={TextSize.small}
          color={TextColor.accent}
        >
          {intl.formatMessage(messages.insights)}
        </Text>
        <Text
          className={styles.legendItem}
          size={TextSize.small}
          color={TextColor.accent}
        >
          {intl.formatMessage(messages.configChange)}
        </Text>
      </div>
      <div className={styles.rightSide}>
        <RangeCalendar />
      </div>
    </div>
  );
};

export default memo(ChartLegend);
