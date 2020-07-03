import React, { memo, useState } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import {
  faClock,
  faDatabase,
  faFile,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons';

import { Tab, Tabs } from '../../components/Tabs';
import TabPanel from '../../components/Tabs/TabPanel';

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

  const [selectedTabId, setSelectedTabId] = useState<string>(
    TabId.lastQueueSize
  );

  return (
    <div>
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
      <TabPanel />
    </div>
  );
};

export default memo(ChartsWidget);
