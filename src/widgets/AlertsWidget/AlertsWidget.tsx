import React, { memo } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import InfoCard, { InfoCardVariant } from '../../components/InfoCard';
import Text, { TextColor } from '../../components/Text';
import styles from './AlertsWidget.module.scss';

const messages = defineMessage({
  alertsTitle: {
    id: 'alertsWidget.alertsTitle',
    defaultMessage: 'Alerts',
  },
  executionTime: {
    id: 'alertsWidget.executionTime',
    defaultMessage: 'Execution time',
  },
});

const cards = [
  {
    id: 1,
    title: 'Incedent #41288',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: Date.now(),
  },
  {
    id: 2,
    title: 'Incedent #41289',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: Date.now(),
  },
];

const AlertsWidget: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Text uppercase color={TextColor.secondary}>
          {intl.formatMessage(messages.alertsTitle)}
        </Text>
        <Text iconRight={faSortDown} color={TextColor.secondary}>
          {intl.formatMessage(messages.executionTime)}
        </Text>
      </div>
      <div>
        {cards.map((card) => (
          <div key={card.id} className={styles.cardContainer}>
            <InfoCard
              variant={InfoCardVariant.alert}
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

export default memo(AlertsWidget);
