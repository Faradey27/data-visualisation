import React, { memo } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import clsx from 'clsx';

import { IconName } from '../../../components/Icon';
import styles from './ChartLegend.module.scss';
import DrillDownLink from './DrillDownLink';

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

const ChartLegend: React.FC<{ pendingValue?: number }> = ({ pendingValue }) => {
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <span className={clsx(styles.legendItem, styles.pendingIncreased)}>
          {intl.formatMessage(messages.pendingIncreased)}
          {pendingValue !== undefined ? (
            <span className={styles.pendingValue}>
              +{Math.abs(pendingValue)}
            </span>
          ) : null}
        </span>
        <span className={clsx(styles.legendItem, styles.pendingDecreased)}>
          {intl.formatMessage(messages.pendingResolved)}
          {pendingValue !== undefined ? (
            <span className={styles.pendingValue}>
              -{Math.abs(pendingValue)}
            </span>
          ) : null}
        </span>
        <DrillDownLink icon={IconName.alert}>
          {intl.formatMessage(messages.alerts)}
        </DrillDownLink>
        <DrillDownLink icon={IconName.idea}>
          {intl.formatMessage(messages.insights)}
        </DrillDownLink>
        <DrillDownLink icon={IconName.settings}>
          {intl.formatMessage(messages.configChange)}
        </DrillDownLink>
      </div>
    </div>
  );
};

export default memo(ChartLegend);
