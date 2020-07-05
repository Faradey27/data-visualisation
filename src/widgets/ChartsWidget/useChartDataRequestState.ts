import { useSelector } from 'react-redux';

import { RequestState } from '../../api';
import {
  selectDeadLetterQueueHistoryRequestState,
  selectPayloadSizeHistoryRequestState,
  selectQueueSizeHistoryRequestState,
  selectResponseDelayHistoryRequestState,
} from '../../state/chart';

export const useChartDataRequestState = () => {
  const queueSizeHistoryRequestState = useSelector(
    selectQueueSizeHistoryRequestState
  );
  const responseDelayHistoryRequestState = useSelector(
    selectResponseDelayHistoryRequestState
  );
  const payloadSizeHistoryRequestState = useSelector(
    selectPayloadSizeHistoryRequestState
  );
  const deadLetterQueueHistoryRequestState = useSelector(
    selectDeadLetterQueueHistoryRequestState
  );

  const requestStates = [
    queueSizeHistoryRequestState,
    responseDelayHistoryRequestState,
    payloadSizeHistoryRequestState,
    deadLetterQueueHistoryRequestState,
  ];

  if (
    requestStates.some((requestState) => requestState === RequestState.failure)
  ) {
    return RequestState.failure;
  }

  if (
    requestStates.some((requestState) => requestState === RequestState.waiting)
  ) {
    return RequestState.waiting;
  }

  if (
    requestStates.every((requestState) => requestState === RequestState.success)
  ) {
    return RequestState.success;
  }

  return RequestState.unset;
};
