import React, { memo } from 'react';

import InfoCard, { InfoCardVariant } from '../../components/InfoCard';

const ResourcesWidget: React.FC<{}> = () => {
  return (
    <div>
      RESOURCES
      <InfoCard variant={InfoCardVariant.resource} />
    </div>
  );
};

export default memo(ResourcesWidget);
