import React, { memo } from 'react';

import HighlightStack, {
  HighlightStackItem,
} from '../../components/HighlightStack';
import { IconName } from '../../components/Icon';

const cards = [
  {
    id: 1,
    title: 'Queue is growing',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: new Date(),
  },
  {
    id: 2,
    title: 'Queue is growing',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: new Date(),
  },
  {
    id: 3,
    title: 'Queue is growing',
    subtitle: 'duration (in ms) was above 1 on avarage during the last minute',
    date: new Date(),
  },
];

const InsightsWidget: React.FC<{}> = () => {
  return (
    <HighlightStack title="Insights" actionTitle="Latest">
      {cards.map((card) => (
        <HighlightStackItem
          title={card.title}
          description={card.subtitle}
          date={card.date}
          iconName={IconName.idea}
        />
      ))}
    </HighlightStack>
  );
};

export default memo(InsightsWidget);
