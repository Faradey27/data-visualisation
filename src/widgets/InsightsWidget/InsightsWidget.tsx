import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HighlightStack, {
  HighlightStackItem,
} from '../../components/HighlightStack';
import { IconName } from '../../components/Icon';
import RequestStateVisualize from '../../components/RequestStateVisualize';
import {
  fetchInsightsDataAction,
  selectInsightsHistory,
  selectInsightsHistoryRequestState,
} from '../../state/widgets';

const InsightsWidget: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const insightsHistory = useSelector(selectInsightsHistory);
  const insightsHistoryRequestState = useSelector(
    selectInsightsHistoryRequestState
  );

  useEffect(() => {
    dispatch(fetchInsightsDataAction());
  }, [dispatch]);

  return (
    <RequestStateVisualize requestState={insightsHistoryRequestState}>
      <HighlightStack title="Insights" actionTitle="Latest">
        {insightsHistory.map((card) => (
          <HighlightStackItem
            key={card.id}
            title={card.name}
            description={card.description}
            timestamp={card.timestamp}
            iconName={IconName.idea}
          />
        ))}
      </HighlightStack>
    </RequestStateVisualize>
  );
};

export default memo(InsightsWidget);
