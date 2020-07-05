import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HighlightStack, {
  HighlightStackItem,
} from '../../components/HighlightStack';
import { IconName } from '../../components/Icon';
import RequestStateVisualize from '../../components/RequestStateVisualize';
import {
  fetchAlertsDataAction,
  selectAlertsHistory,
  selectAlertsHistoryRequestState,
} from '../../state/widgets';

const AlertsWidget: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const alertsHistory = useSelector(selectAlertsHistory);
  const alertsHistoryRequestState = useSelector(
    selectAlertsHistoryRequestState
  );

  useEffect(() => {
    dispatch(fetchAlertsDataAction());
  }, [dispatch]);

  return (
    <RequestStateVisualize requestState={alertsHistoryRequestState}>
      <HighlightStack title="Alerts" actionTitle="Latest">
        {alertsHistory.map((card) => (
          <HighlightStackItem
            key={card.id}
            title={card.name}
            description={card.description}
            iconName={IconName.alert}
            timestamp={card.timestamp}
          />
        ))}
      </HighlightStack>
    </RequestStateVisualize>
  );
};

export default memo(AlertsWidget);
