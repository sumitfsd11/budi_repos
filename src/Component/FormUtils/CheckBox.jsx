import React, { forwardRef } from "react";
const CheckBox = (
  {
    control,
    ...props
  }
) => {
  return (
    <React.Fragment>
      <div className={`${props?.containerName} flex justify-self-auto`}>
        <span>
          <input control={control} type="checkbox" {...props} name={props?.name} className={`  ${props?.className} 
        checkbox `} />
        </span>
        <label htmlFor="radio" className={` pl-2 ${props?.labelClassName} `}>{props?.label}</label>
      </div>
    </React.Fragment>
  )
}
export default forwardRef(CheckBox);