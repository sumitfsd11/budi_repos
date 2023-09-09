import { Pie } from '@ant-design/plots';

export const PieChart = ({ customConfig }) => {
  const data = [
    {
      type: 'abhijeet',
      value: 27,
    },
    {
      type: 'ashutosh',
      value: 25,
    },
    {
      type: 'delhi',
      value: 18,
    },
    {
      type: 'hello',
      value: 15,
    },
    {
      type: 'compliment',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '83',
      },
    },
  };
  return    customConfig ? <Pie { ...customConfig } />: <Pie {...config} />

};

