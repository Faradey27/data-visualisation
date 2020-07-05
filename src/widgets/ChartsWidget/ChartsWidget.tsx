import React, { memo, useState } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import {
  faClock,
  faDatabase,
  faFile,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

import './Recharts.scss';
import { IconName } from '../../components/Icon';
import SparkLineCard from '../../components/SparkLineCard/SparkLineCard';
import { Tab, Tabs } from '../../components/Tabs';
import TabPanel from '../../components/Tabs/TabPanel';
import Text, { TextColor } from '../../components/Text';
import theme from '../../theme.scss';
import styles from './ChartsWidget.modules.scss';
import Chart from './components/Chart';
import ChartLegend from './components/ChartLegend';

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

const dataGenerator = (n: number) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    const value0 = Math.floor(Math.random() * 10 + 1);
    const value1 = Math.floor(Math.random() * 10 + 1);
    const value2 = -Math.floor(Math.random() * 10 + 1);
    data.push({
      date: Date.now() + i * 1000 * 60 * 60,
      size: value1 - value2,
      pendingIncreased: value1 / 5,
      pendingResolved: value2 / 5,
    });
  }

  return data;
};

const data = dataGenerator(100);

const avgResponseDelayHistoryData: any[] = [];

const hour = 1000 * 60 * 60;

for (let i = 0; i < 100; i++) {
  let value = 0;
  if (i < 30) {
    value = Math.floor(Math.random() * 10 + 1) * i * 12;
  } else if (value >= 30 && value < 70) {
    value = Math.floor(Math.random() * 10 + 1) * i * 4;
  } else {
    value = Math.floor(Math.random() * 10 + 1) * i * 2;
  }

  console.log(value, i);
  avgResponseDelayHistoryData.push({
    date: Date.now() - hour * i,
    avgResponseDelay: value,
  });
}

enum TabId {
  avgResponseDelay = 'avgResponseDelay',
  lastQueueSize = 'lastQueueSize',
  avgPayloadSize = 'avgPayloadSize',
  deadLetterQueue = 'deadLetterQueue',
}

const ChartsWidget: React.FC<{}> = () => {
  const intl = useIntl();

  console.log(theme);

  const [selectedTabId, setSelectedTabId] = useState<string>(
    TabId.lastQueueSize
  );

  return (
    <div className={styles.root}>
      <Tabs>
        <Tab
          isSelected={TabId.avgResponseDelay === selectedTabId}
          id={TabId.avgResponseDelay}
          title={intl.formatMessage(messages.avgResponseDelayTitle)}
          icon={faClock}
          onClick={setSelectedTabId}
        >
          <SparkLineCard
            isSelected={TabId.avgResponseDelay === selectedTabId}
            currentValue={'23ms'}
            data={avgResponseDelayHistoryData}
            dataKey="avgResponseDelay"
            title={intl.formatMessage(messages.avgResponseDelayTitle)}
            iconName={IconName.clock}
          />
        </Tab>
        <Tab
          isSelected={TabId.lastQueueSize === selectedTabId}
          id={TabId.lastQueueSize}
          title={intl.formatMessage(messages.lastQueueSizeTitle)}
          icon={faWaveSquare}
          onClick={setSelectedTabId}
        >
          <SparkLineCard
            isSelected={TabId.lastQueueSize === selectedTabId}
            currentValue={'32'}
            data={data}
            dataKey="size"
            title={intl.formatMessage(messages.lastQueueSizeTitle)}
            iconName={IconName.sigma}
          />
        </Tab>
        <Tab
          isSelected={TabId.avgPayloadSize === selectedTabId}
          id={TabId.avgPayloadSize}
          title={intl.formatMessage(messages.avgPayloadSizeTitle)}
          icon={faDatabase}
          onClick={setSelectedTabId}
        >
          <SparkLineCard
            isSelected={TabId.avgPayloadSize === selectedTabId}
            currentValue={'1.35kb'}
            data={data}
            dataKey="size"
            title={intl.formatMessage(messages.avgPayloadSizeTitle)}
            iconName={IconName.database}
          />
        </Tab>
        <Tab
          isSelected={TabId.deadLetterQueue === selectedTabId}
          id={TabId.deadLetterQueue}
          title={intl.formatMessage(messages.deadLetterQueueTitle)}
          icon={faFile}
          onClick={setSelectedTabId}
        >
          <SparkLineCard
            isSelected={TabId.deadLetterQueue === selectedTabId}
            currentValue={'0'}
            data={[{ size: 0 }, { size: 0 }]}
            dataKey="size"
            title={intl.formatMessage(messages.deadLetterQueueTitle)}
            iconName={IconName.database}
          />
        </Tab>
      </Tabs>
      <TabPanel>
        <ChartLegend />
        <Chart
          data={data}
          brushDataKey="size"
          areaDataKey="size"
          barDataKey="pendingIncreased"
          barDataKey2="pendingResolved"
        />
      </TabPanel>
    </div>
  );
};

export default memo(ChartsWidget);
