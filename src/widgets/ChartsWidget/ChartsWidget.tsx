import React, { memo, useState } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import {
  faClock,
  faDatabase,
  faFile,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons';

import './Recharts.scss';
import { Tab, Tabs } from '../../components/Tabs';
import TabPanel from '../../components/Tabs/TabPanel';
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
    const value = Math.floor(Math.random() * 10 + 1);
    data.push({
      date: Date.now() + i * 1000 * 60 * 60,
      value: Math.floor(Math.random() * 10 + 1),
      usageValue: (value / 5) * (i % 2 ? -1 : 1),
    });
  }

  return data;
};

const data = dataGenerator(100);

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
        />
        <Tab
          isSelected={TabId.lastQueueSize === selectedTabId}
          id={TabId.lastQueueSize}
          title={intl.formatMessage(messages.lastQueueSizeTitle)}
          icon={faWaveSquare}
          onClick={setSelectedTabId}
        />
        <Tab
          isSelected={TabId.avgPayloadSize === selectedTabId}
          id={TabId.avgPayloadSize}
          title={intl.formatMessage(messages.avgPayloadSizeTitle)}
          icon={faDatabase}
          onClick={setSelectedTabId}
        />
        <Tab
          isSelected={TabId.deadLetterQueue === selectedTabId}
          id={TabId.deadLetterQueue}
          title={intl.formatMessage(messages.deadLetterQueueTitle)}
          icon={faFile}
          onClick={setSelectedTabId}
        />
      </Tabs>
      <TabPanel>
        <ChartLegend />
        <Chart
          data={data}
          brushDataKey="value"
          areaDataKey="value"
          barDataKey="usageValue"
        />
      </TabPanel>
    </div>
  );
};

export default memo(ChartsWidget);
