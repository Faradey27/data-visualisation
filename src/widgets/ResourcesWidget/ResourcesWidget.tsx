import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HighlightStack, {
  HighlightStackItem,
} from '../../components/HighlightStack';
import { IconName } from '../../components/Icon';
import RequestStateVisualize from '../../components/RequestStateVisualize';
import {
  fetchResourcesDataAction,
  selectResourceHistory,
  selectResourceHistoryRequestState,
} from '../../state/widgets';

const ResourcesWidget: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const resourceHistory = useSelector(selectResourceHistory);
  const resourceHistoryRequestState = useSelector(
    selectResourceHistoryRequestState
  );

  useEffect(() => {
    dispatch(fetchResourcesDataAction());
  }, [dispatch]);

  return (
    <RequestStateVisualize requestState={resourceHistoryRequestState}>
      <HighlightStack title="Resources" actionTitle="Execution time">
        {resourceHistory.map((card) => (
          <HighlightStackItem
            key={card.id}
            title={card.name}
            description={card.value}
            percentage={card.percentage}
            iconName={IconName.greek}
          />
        ))}
      </HighlightStack>
    </RequestStateVisualize>
  );
};

export default memo(ResourcesWidget);
