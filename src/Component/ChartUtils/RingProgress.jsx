
import { RingProgress } from '@ant-design/plots';

export const RingProgressCmp = ({ props }) => {
  const config = {
    height: 100,
    width: 100,
    autoFit: false,
    color: ['#2B4C9B', '#E8EDF3'],
    innerRadius: 0.9,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          color: '#2B4C9B',
          fontSize: '15px',
          lineHeight: '14px',
        },
        formatter: () => 'mc',
      },
    },
    percent: 0.6,
  };
  return props ? (<RingProgress type="circle" {...props} />) : (<RingProgress type="circle" {...config} />);
};
