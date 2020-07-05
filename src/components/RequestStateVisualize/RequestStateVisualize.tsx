import React, { memo, ReactNode } from 'react';

import { RequestState } from '../../api';
import Icon, { IconName } from '../Icon';
import styles from './RequestStateVisualize.module.scss';

interface RequestStateVisualizeProps {
  children: ReactNode;
  requestState: RequestState;
}

const RequestStateVisualize: React.FC<RequestStateVisualizeProps> = ({
  requestState,
  children,
}) => {
  if (requestState === RequestState.success) {
    return <>{children}</>;
  }
  if (requestState === RequestState.failure) {
    return <div>Error</div>;
  }

  return <div>Loading...</div>;
};

export default memo(RequestStateVisualize);
