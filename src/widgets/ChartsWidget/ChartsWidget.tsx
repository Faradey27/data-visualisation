import React, { memo, useCallback, useEffect, useState } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import './Recharts.scss';
import { IconName } from '../../components/Icon';
import RangeCalendar from '../../components/RangeCalendar';
import RequestStateVisualize from '../../components/RequestStateVisualize';
import SparkLineCard from '../../components/SparkLineCard/SparkLineCard';
import { Tab, Tabs } from '../../components/Tabs';
import TabPanel from '../../components/Tabs/TabPanel';
import {
  fetchDeadLetterQueueHistoryAction,
  fetchPayloadSizeHistoryAction,
  fetchQueueSizeHistoryAction,
  fetchResponseDelayHistoryAction,
} from '../../state/chart';
import styles from './ChartsWidget.module.scss';
import ChartLegend from './components/ChartLegend';
import GeneralAreaChart from './components/GeneralAreaChart';
import QueueCharts from './components/QueueCharts';
import { DEFAULT_POINT_INDEX, TabId, useChartData } from './useChartData';
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

const ChartsWidget: React.FC<{}> = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  // TODO use real value, not hardcoded 110 and 150
  const [startIndex, setStartIndex] = useState(110);
  const [endIndex, setEndIndex] = useState(150);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedPointIndex, setSelectedPointIndex] = useState(
    DEFAULT_POINT_INDEX
  );
  const [selectedTabId, setSelectedTabId] = useState<string>(
    TabId.lastQueueSize
  );

  // this custome hook will return to us general request state based on queue size,
  // response delay, payload size, dead letter queue requests
  // so we will assume that success means that all requests succed and failure that at least one request failed
  const chartsDataRequestState = useChartDataRequestState();
  const {
    queueSizeHistory,
    responseDelayHistory,
    payloadSizeHistory,
    deadLetterQueueHistory,
    avgResponseDelay,
    lastQueueSize,
    payloadSize,
    deadLetterQueue,
  } = useChartData(selectedPointIndex, selectedTabId as TabId);

  // TODO fix types
  const dataMap: any = {
    [TabId.lastQueueSize]: {
      items: queueSizeHistory,
      startIndex: 110,
      endIndex: 150,
    },
    [TabId.avgResponseDelay]: {
      items: responseDelayHistory,
      startIndex: 60,
      endIndex: 90,
    },
    [TabId.avgPayloadSize]: {
      items: payloadSizeHistory,
      startIndex: 40,
      endIndex: 70,
    },
    [TabId.deadLetterQueue]: {
      items: deadLetterQueueHistory,
      startIndex: 0,
      endIndex: 1,
    },
  };

  const handleTabChange = useCallback(
    (tabId) => {
      setSelectedTabId(tabId);
      setStartIndex(dataMap[tabId].startIndex);
      setEndIndex(dataMap[tabId].endIndex);
    },
    [dataMap]
  );

  const handleOpenCalendar = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);

  const handleCloseCalendar = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  const handleRangeApply = useCallback(() => {
    // TODO it should recalcaulate indexes and do request if requered
    setIsCalendarOpen(false);
  }, []);

  useEffect(() => {
    dispatch(fetchQueueSizeHistoryAction());
    dispatch(fetchResponseDelayHistoryAction());
    dispatch(fetchPayloadSizeHistoryAction());
    dispatch(fetchDeadLetterQueueHistoryAction());
  }, [dispatch]);

  return (
    <div className={styles.root} onMouseDown={handleCloseCalendar}>
      <RequestStateVisualize requestState={chartsDataRequestState}>
        <Tabs>
          <Tab
            isSelected={TabId.avgResponseDelay === selectedTabId}
            id={TabId.avgResponseDelay}
            onClick={handleTabChange}
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
            onClick={handleTabChange}
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
            onClick={handleTabChange}
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
            onClick={handleTabChange}
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
          <div className={styles.rangeCalendar}>
            <RangeCalendar
              onApply={handleRangeApply}
              isOpen={isCalendarOpen}
              onOpen={handleOpenCalendar}
            />
          </div>
          {selectedTabId === TabId.lastQueueSize ? (
            <QueueCharts
              startIndex={startIndex}
              endIndex={endIndex}
              selectedPointIndex={selectedPointIndex}
              pinnedPointIndex={120}
              data={queueSizeHistory}
              brushDataKey="value"
              areaDataKey="value"
              barDataKey="pending"
              onChangeSelectedPointIndex={setSelectedPointIndex}
              onChangeEndIndex={setEndIndex}
              onChangeStartIndex={setStartIndex}
            />
          ) : (
            <GeneralAreaChart
              startIndex={startIndex}
              endIndex={endIndex}
              selectedPointIndex={selectedPointIndex}
              pinnedPointIndex={1}
              data={dataMap[selectedTabId].items}
              brushDataKey="value"
              areaDataKey="value"
              onChangeSelectedPointIndex={setSelectedPointIndex}
              onChangeEndIndex={setEndIndex}
              onChangeStartIndex={setStartIndex}
            />
          )}
        </TabPanel>
      </RequestStateVisualize>
    </div>
  );
};

export default memo(ChartsWidget);
