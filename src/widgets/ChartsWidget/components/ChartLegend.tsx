import React, { memo } from 'react';
import { defineMessage, useIntl } from 'react-intl';

import RangeCalendar from '../../../components/RangeCalendar';
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
        <span className={styles.legendItem}>
          {intl.formatMessage(messages.pendingIncreased)}
        </span>
        <span className={styles.legendItem}>
          {intl.formatMessage(messages.pendingResolved)}
        </span>
        <span className={styles.legendItem}>
          {intl.formatMessage(messages.alerts)}
        </span>
        <span className={styles.legendItem}>
          {intl.formatMessage(messages.insights)}
        </span>
        <span className={styles.legendItem}>
          {intl.formatMessage(messages.configChange)}
        </span>
      </div>
      <div className={styles.rightSide}>
        <RangeCalendar />
      </div>
    </div>
  );
};

export default memo(ChartLegend);
