import React from 'react';
import { Text } from 'recharts';

import theme from '../../../theme.scss';

interface XAxisTickProps {
  payload: {
    value: number;
  };
  y: number;
  x: number;
}

const XAxisTick: React.FC<XAxisTickProps> = ({ payload, y, ...rest }) => {
  const { value } = payload;
  const formatedValue = new Date(value).getHours() + ':00';

  return (
    <Text
      {...rest}
      y={y + 60 + 4}
      fill={theme.textSecondaryColor}
      fontSize={12}
    >
      {formatedValue}
    </Text>
  );
};

export default XAxisTick;
