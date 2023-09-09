import { Tabs } from 'antd';
import React, { useMemo, useState } from 'react';

export const Tab = ({
props }) => {

  const OperationsSlot = React.useMemo(() => {
    return {
      left: props?.leftComponet,
      right: props?.rightComponent,
    }
  }, [props?.leftComponet, props?.rightComponent]);

  const [position] = useState(['left', 'right']);
  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({
        ...acc,
        [direction]: OperationsSlot[direction],
      }),
      {},
    );
  }, [position, OperationsSlot]);
  return (
    props?.data && (
      <React.Fragment>
        <Tabs tabBarExtraContent={slot} items={props?.data ?? null} centered />
      </React.Fragment>
    )
  );
};
