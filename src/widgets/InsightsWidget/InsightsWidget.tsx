import React, { memo } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import InfoCard, { InfoCardVariant } from '../../components/InfoCard';
import Text, { TextColor } from '../../components/Text';
import styles from './InsightsWidget.module.scss';

const messages = defineMessage({
  insightsTitle: {
    id: 'insightsWidget.insightsTitle',
    defaultMessage: 'Insights',
  },
  executionTime: {
    id: 'insightsWidget.executionTime',
    defaultMessage: 'Execution time',
  },
});

const cards = [
  {
    id: 1,
    title: 'Queue is growing',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: Date.now(),
  },
  {
    id: 2,
    title: 'Queue is growing',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: Date.now(),
  },
  {
    id: 3,
    title: 'Queue is growing',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: Date.now(),
  },
];

const InsightsWidget: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Text uppercase color={TextColor.secondary}>
          {intl.formatMessage(messages.insightsTitle)}
        </Text>
        <Text iconRight={faSortDown} color={TextColor.secondary}>
          {intl.formatMessage(messages.executionTime)}
        </Text>
      </div>
      <div>
        {cards.map((card) => (
          <div key={card.id} className={styles.cardContainer}>
            <InfoCard
              variant={InfoCardVariant.insight}
              title={card.title}
              subtitle={card.subtitle}
              date={card.date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(InsightsWidget);
