import React from 'react';
import { Text } from 'recharts';

import theme from '../../../theme.scss';

interface YAxisTickProps {
  payload: {
    value: number;
  };
}

const YAxisTick: React.FC<YAxisTickProps> = ({ payload, ...rest }) => {
  const { value } = payload;
  const formatedValue = value < 1000 ? '' : `${Math.floor(value / 1000)}k`;

  console.log('RENDER');

  return (
    <Text {...rest} fill={theme.textSecondaryColor} fontSize={12}>
      {formatedValue}
    </Text>
  );
};

export default YAxisTick;
