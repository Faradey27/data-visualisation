import React, { memo } from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import HighlightStack, {
  HighlightStackItem,
} from '../../components/HighlightStack';

const cards = [
  {
    id: 1,
    title: 'Incident #41288',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: new Date(),
  },
  {
    id: 2,
    title: 'Incident #41289',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: new Date(),
  },
];

const AlertsWidget: React.FC<{}> = () => {
  return (
    <HighlightStack title="Alerts" left="Latest">
      {cards.map((card) => (
        <HighlightStackItem
          title={card.title}
          description={card.subtitle}
          iconType={faExclamationTriangle}
          date={card.date}
        />
      ))}
    </HighlightStack>
  );
};

export default memo(AlertsWidget);
