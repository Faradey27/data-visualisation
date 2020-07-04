import React, { memo } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import InfoCard, { InfoCardVariant } from '../../components/InfoCard';
import Text, { TextColor } from '../../components/Text';
import styles from './ResourcesWidget.module.scss';

const messages = defineMessage({
  resourcesTitle: {
    id: 'resourcesWidget.resourceTitle',
    defaultMessage: 'Resources',
  },
  executionTime: {
    id: 'resourcesWidget.executionTime',
    defaultMessage: 'Execution time',
  },
});

const cards = [
  {
    id: 1,
    title: 'usage-service-prod-recird-inventory-usage-on-two-lines',
    subtitle: '125ms',
    ratio: 0.8,
  },
  {
    id: 2,
    title: 'usage-service-prod-recird-inventory-usage',
    subtitle: '125ms',
    ratio: 0.3,
  },
  {
    id: 3,
    title: 'usage-service-prod-recird-inventory-usage',
    subtitle: '125ms',
    ratio: 0.2,
  },
];

const ResourcesWidget: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Text uppercase color={TextColor.secondary}>
          {intl.formatMessage(messages.resourcesTitle)}
        </Text>
        <Text iconRight={faSortDown} color={TextColor.secondary}>
          {intl.formatMessage(messages.executionTime)}
        </Text>
      </div>
      <div>
        {cards.map((card) => (
          <div key={card.id} className={styles.cardContainer}>
            <InfoCard
              variant={InfoCardVariant.resource}
              title={card.title}
              subtitle={card.subtitle}
              ratio={card.ratio}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ResourcesWidget);
