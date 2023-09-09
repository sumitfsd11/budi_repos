import React ,{forwardRef} from "react";
const  Radio=({
 control,
  ...props
})=> {
  return (
    <React.Fragment>
      <div className={`${props?.containerName} flex justify-self-auto`}>
        <span><input type="radio" control={control} {...props} name={props?.name} className={`  ${props?.className}  radio`} /></span>  
        <label htmlFor="radio" className={` pl-2 ${props?.labelClassName} `}>{props?.label}</label>
      </div>
    </React.Fragment>
  )
}
export default forwardRef(Radio);