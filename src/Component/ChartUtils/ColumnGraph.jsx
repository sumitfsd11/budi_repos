
import { Column } from '@ant-design/plots';

export const ColumnGraph = ({  ...props}) => {
  
 
  const config = {
    data:props?.data??[],
    xField: 'type',
    yField: 'sales',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'dd',
      },
      sales: {
        alias: 'd',
      },
    },
    minColumnWidth: 10,
    maxColumnWidth: 10,
    height: 260,
    color: ' #27AE60'
  };
    return <Column {...config} />;
// 
};

