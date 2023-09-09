import { Modal } from 'antd';
import React from "react";
const ModalComp = ({ onSubmit, state, SetState, title, children, ...pops }) => {
  // const handleOk = () => {
  //   SetState(false);
  //   if (onSubmit) {
  //     onSubmit()
  //   }
  // };

  const handleOk = React.useCallback(() => {
    SetState(false);
    if (onSubmit) {
      onSubmit()
    }
  }, [onSubmit , SetState])

  const handleCancel = React.useCallback(() => {
    SetState(false);
  }, [SetState])

  return (
    <React.Fragment>
      <Modal {...pops} title={title} open={state} onOk={handleOk} onCancel={handleCancel}>
        {
          children
        }
      </Modal>
    </React.Fragment>
  );
};
export default ModalComp;