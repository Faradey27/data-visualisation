import React, { memo } from 'react';
import { faTable } from '@fortawesome/free-solid-svg-icons';

import HighlightStack, {
  HighlightStackItem,
} from '../../components/HighlightStack';

const cards = [
  {
    id: 1,
    title: 'usage-service-prod-recird-inventory-usage-on-two-lines',
    subtitle: '125ms',
    percentage: 0.8,
  },
  {
    id: 2,
    title: 'usage-service-prod-recird-inventory-usage',
    subtitle: '125ms',
    percentage: 0.3,
  },
  {
    id: 3,
    title: 'usage-service-prod-recird-inventory-usage',
    subtitle: '125ms',
    percentage: 0.2,
  },
];

const ResourcesWidget: React.FC<{}> = () => {
  return (
    <HighlightStack title="Resources" left="Execution time">
      {cards.map((card) => (
        <HighlightStackItem
          title={card.title}
          description={card.subtitle}
          percentage={card.percentage}
          iconType={faTable}
        />
      ))}
    </HighlightStack>
  );
};

export default memo(ResourcesWidget);
