import React from 'react';
import ReactDOM from 'react-dom';
import {
  Area,
  Bar,
  Brush,
  Cell,
  ComposedChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Icon, { IconName } from '../../../components/Icon';
import theme from '../../../theme.scss';
import BrushChart from './BrushChart';

interface ChartProps {
  data: any;
  brushDataKey: string;
  areaDataKey: string;
  barDataKey: string;
}

const formatDateTick = (tick: number) => {
  return new Date(tick).getHours() + ':00';
};

// TODO in real life here should be smth smater
const yAxisDomain = [0, (dataMax: number) => Math.min(8000, dataMax + 1000)];

const YAxisTick = (props: any) => {
  const { value } = props.payload;
  const formatedValue = value < 1000 ? '' : `${Math.floor(value / 1000)}k`;

  return (
    <Text {...props} fill={theme.textSecondaryColor} fontSize={12}>
      {formatedValue}
    </Text>
  );
};

const XAxisTick = (props: any) => {
  const { value } = props.payload;
  const formatedValue = new Date(value).getHours() + ':00';

  return (
    <Text
      {...props}
      y={props.y + 60 + 4}
      fill={theme.textSecondaryColor}
      fontSize={12}
    >
      {formatedValue}
    </Text>
  );
};

const CustomCursor = (props: any) => {
  const { value } = props.payload;
  const formatedValue = new Date(value).getHours() + ':00';

  console.log(props);

  return (
    <Text
      {...props}
      y={props.y + 60 + 4}
      fill={theme.textSecondaryColor}
      fontSize={12}
    >
      {formatedValue}
    </Text>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
      <p className="intro">{'123'}</p>
      <p className="desc">Anything you want can be displayed here.</p>
    </div>
  );
};

// we put "any" to overcome bug in typings
// TODO properly overide types
const axisStyleProps: any = {
  stroke: theme.borderColor,
};

const chartMargin = {
  top: theme.space * 2,
  left: -theme.space * 3,
};

const Chart: React.FC<ChartProps> = ({
  data,
  brushDataKey,
  areaDataKey,
  barDataKey,
}) => {
  const off = () => {
    return 0.1;
  };
  // top = 0.25, body = 0.48, bottom = 0.27
  const startIndex = 110;
  const endIndex = 151;

  return (
    <>
      <BrushChart
        data={data}
        startIndex={startIndex}
        endIndex={endIndex}
        dataKey={brushDataKey}
        areaDataKey={areaDataKey}
      />
      <div id="magic">
        <ResponsiveContainer width="100%" height={theme.space * 30}>
          <ComposedChart data={data} margin={chartMargin} syncId="anyId">
            <Brush
              dataKey={brushDataKey}
              startIndex={startIndex}
              endIndex={endIndex}
              width={0}
              height={0.00001}
            />
            <ReferenceLine y={1} stroke="grey" />
            {/* <ReferenceDot x={1000} y={data[120].timestamp} /> */}
            <ReferenceLine
              className="pinnedPoint"
              x={data[120].timestamp}
              stroke={theme.primaryColor}
              strokeDasharray={'1, 1'}
              {...{
                label: (props: any) => {
                  return ReactDOM.createPortal(
                    <div
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: props.viewBox.x - 12,
                        top: props.viewBox.y + 52,
                        width: 24,
                        height: 24,
                        backgroundColor: 'rgba(76, 68, 197, 0.2)',
                        borderRadius: 12,
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 18,
                          height: 18,
                          borderRadius: 10,
                          backgroundColor: '#fff',
                        }}
                      >
                        <Icon
                          width="12"
                          height="12"
                          x={props.viewBox.x}
                          y={0}
                          iconName={IconName.settings}
                          style={{ width: 12, height: 12 }}
                        />
                      </div>
                    </div>,
                    document.getElementById('magic') as any
                  );
                },
              }}
            />
            <XAxis
              {...axisStyleProps}
              dataKey="timestamp"
              tickSize={56}
              axisLine={false}
              tickFormatter={formatDateTick}
              tick={XAxisTick}
            />
            <YAxis
              {...axisStyleProps}
              dataKey={areaDataKey}
              type="number"
              padding={{ bottom: 60 }}
              domain={yAxisDomain}
              axisLine={false}
              tick={YAxisTick}
            />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off()} stopColor={'#feebed'} stopOpacity={1} />
                <stop offset={off()} stopColor="#f8f8f8" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="splitColorStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off()} stopColor={'red'} stopOpacity={1} />
                <stop
                  offset={off()}
                  stopColor={theme.primaryColor}
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={areaDataKey}
              stroke="url(#splitColorStroke)"
              fill="url(#splitColor)"
            />
            <Bar dataKey={barDataKey} barSize={4}>
              {data.map((item: any) => {
                // console.log(item);
                return (
                  <Cell
                    key={item.timestamp}
                    fill={item.pending <= 0 ? 'blue' : 'red'}
                  />
                );
              })}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
