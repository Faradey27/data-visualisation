import React, { memo } from 'react';

const NavigationBar: React.FC<{}> = () => {
  return (
    <div aria-label="breadcrumb">
      <span>Dashbird.io</span>
      <span>US-EAST1</span>
      <span>SQS</span>
    </div>
  );
};

export default memo(NavigationBar);
