import React, { memo, ReactNode } from 'react';
import clsx from 'clsx';

import { RequestState } from '../../api';
import styles from './RequestStateVisualize.module.scss';

interface RequestStateVisualizeProps {
  children: ReactNode;
  requestState: RequestState;
  className?: string;
}

const RequestStateVisualize: React.FC<RequestStateVisualizeProps> = ({
  className,
  requestState,
  children,
}) => {
  if (requestState === RequestState.success) {
    return <>{children}</>;
  }
  if (requestState === RequestState.failure) {
    return <div className={clsx(styles.loading, className)}>Error</div>;
  }

  return <div className={clsx(styles.loading, className)}>Loading...</div>;
};

export default memo(RequestStateVisualize);
