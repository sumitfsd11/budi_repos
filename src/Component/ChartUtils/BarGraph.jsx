import React from 'react';
import { Bar } from '@ant-design/plots';

export const BarGraph = ({customeConfig}) => {
  const data = [
    {
      type: 'User',
      sales: 38,
      
    },
    {
      type: 'Offers',
      sales: 52,
    },
    {
      type: 'Agents',
      sales: 61,
    },
    {
      type: 'Other items',
      sales: 145,
    }
  ];
  const config = {
    data,
    xField: 'sales',
    yField: 'type',
    meta: {
      type: {
        alias: 'alias',
      },
      sales: {
        alias: 'alias',
      },
    },
    minBarWidth: 10,
    maxBarWidth: 10,
    height:260,
    color: '#E95050',
    animation:true
  };
  return customeConfig?(<Bar {...customeConfig} />):(<Bar {...config} />);
};


