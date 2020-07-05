import React, { memo, useEffect, useState } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import './Recharts.scss';
import { IconName } from '../../components/Icon';
import RequestStateVisualize from '../../components/RequestStateVisualize';
import SparkLineCard from '../../components/SparkLineCard/SparkLineCard';
import { Tab, Tabs } from '../../components/Tabs';
import TabPanel from '../../components/Tabs/TabPanel';
import {
  fetchDeadLetterQueueHistoryAction,
  fetchPayloadSizeHistoryAction,
  fetchQueueSizeHistoryAction,
  fetchResponseDelayHistoryAction,
  selectDeadLetterQueueHistory,
  selectPayloadSizeHistory,
  selectQueueSizeHistory,
  selectResponseDelayHistory,
} from '../../state/chart';
import styles from './ChartsWidget.module.scss';
import ChartLegend from './components/ChartLegend';
import Chart from './components/QueueCharts';
import { useChartDataRequestState } from './useChartDataRequestState';

const messages = defineMessage({
  avgResponseDelayTitle: {
    id: 'chartsWidget.avgResponseDelayTitle',
    defaultMessage: 'Avg. response delay',
  },
  lastQueueSizeTitle: {
    id: 'chartsWidget.lastQueueSizeTitle',
    defaultMessage: 'Last queue size',
  },
  avgPayloadSizeTitle: {
    id: 'chartsWidget.avgPayloadSizeTitle',
    defaultMessage: 'Avf. payload size',
  },
  deadLetterQueueTitle: {
    id: 'chartsWidget.deadLetterQueueTitle',
    defaultMessage: 'Dead letter queue',
  },
});

enum TabId {
  avgResponseDelay = 'avgResponseDelay',
  lastQueueSize = 'lastQueueSize',
  avgPayloadSize = 'avgPayloadSize',
  deadLetterQueue = 'deadLetterQueue',
}

const ChartsWidget: React.FC<{}> = () => {
  const intl = useIntl();

  // this custome hook will return to us general request state based on queue size,
  // response delay, payload size, dead letter queue requests
  // so we will assume that success means that all requests succed and failure that at least one request failed
  const chartsDataRequestState = useChartDataRequestState();

  const queueSizeHistory = useSelector(selectQueueSizeHistory);
  const responseDelayHistory = useSelector(selectResponseDelayHistory);
  const payloadSizeHistory = useSelector(selectPayloadSizeHistory);
  const deadLetterQueueHistory = useSelector(selectDeadLetterQueueHistory);

  const dispatch = useDispatch();

  const [selectedTabId, setSelectedTabId] = useState<string>(
    TabId.lastQueueSize
  );

  useEffect(() => {
    dispatch(fetchQueueSizeHistoryAction());
    dispatch(fetchResponseDelayHistoryAction());
    dispatch(fetchPayloadSizeHistoryAction());
    dispatch(fetchDeadLetterQueueHistoryAction());
  }, [dispatch]);

  const avgResponseDelay = (responseDelayHistory[1]?.value || 0) + 'ms';
  const lastQueueSize = String(queueSizeHistory[1]?.value || 0);
  const payloadSize = String(payloadSizeHistory[1]?.value || 0) + 'kb';
  const deadLetterQueue = String(deadLetterQueueHistory[1]?.value || 0);

  return (
    <div className={styles.root}>
      <RequestStateVisualize requestState={chartsDataRequestState}>
        <Tabs>
          <Tab
            isSelected={TabId.avgResponseDelay === selectedTabId}
            id={TabId.avgResponseDelay}
            title={intl.formatMessage(messages.avgResponseDelayTitle)}
            onClick={setSelectedTabId}
          >
            <SparkLineCard
              isSelected={TabId.avgResponseDelay === selectedTabId}
              currentValue={avgResponseDelay}
              data={responseDelayHistory}
              dataKey="value"
              title={intl.formatMessage(messages.avgResponseDelayTitle)}
              iconName={IconName.clock}
            />
          </Tab>
          <Tab
            isSelected={TabId.lastQueueSize === selectedTabId}
            id={TabId.lastQueueSize}
            title={intl.formatMessage(messages.lastQueueSizeTitle)}
            onClick={setSelectedTabId}
          >
            <SparkLineCard
              isSelected={TabId.lastQueueSize === selectedTabId}
              currentValue={lastQueueSize}
              data={queueSizeHistory}
              dataKey="value"
              title={intl.formatMessage(messages.lastQueueSizeTitle)}
              iconName={IconName.sigma}
            />
          </Tab>
          <Tab
            isSelected={TabId.avgPayloadSize === selectedTabId}
            id={TabId.avgPayloadSize}
            title={intl.formatMessage(messages.avgPayloadSizeTitle)}
            onClick={setSelectedTabId}
          >
            <SparkLineCard
              isSelected={TabId.avgPayloadSize === selectedTabId}
              currentValue={payloadSize}
              data={payloadSizeHistory}
              dataKey="value"
              title={intl.formatMessage(messages.avgPayloadSizeTitle)}
              iconName={IconName.database}
            />
          </Tab>
          <Tab
            isSelected={TabId.deadLetterQueue === selectedTabId}
            id={TabId.deadLetterQueue}
            title={intl.formatMessage(messages.deadLetterQueueTitle)}
            onClick={setSelectedTabId}
          >
            <SparkLineCard
              isSelected={TabId.deadLetterQueue === selectedTabId}
              currentValue={deadLetterQueue}
              data={deadLetterQueueHistory}
              dataKey="value"
              title={intl.formatMessage(messages.deadLetterQueueTitle)}
              iconName={IconName.document}
            />
          </Tab>
        </Tabs>
        <TabPanel>
          <ChartLegend />
          <Chart
            data={queueSizeHistory}
            brushDataKey="value"
            areaDataKey="value"
            barDataKey="pending"
          />
        </TabPanel>
      </RequestStateVisualize>
    </div>
  );
};

export default memo(ChartsWidget);
