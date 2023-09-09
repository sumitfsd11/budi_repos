import React  from "react";
import {BsFillPersonFill} from "react-icons/bs";
const  TextInput=({ 
    control , 
    ...props }) =>{
    return (
            <div className="w-full ">
                <div className="relative">
                    {props?.icon && <span className="absolute top-4 left-3 bg-white">{<BsFillPersonFill/>}</span>}
                    <input control={control}
                        type={props?.type}
                        name={props?.name}
                        required={props?.isRequired}
                        placeholder={props?.placeholder}
                        {...props}
                        data-theme={props?.them??'light'}
                        className={`  ${props?.icon && 'pl-10 pt-4 pb-2 pr-1 border '} w-full ${props?.error && "border border-error-color"
                            }`}
                    />
                </div>
                <p className=" px-2 mb-0 pt-1 text-xs text-error-color">{props?.error?.message}</p>
            </div>
    );
}

export default React.forwardRef(TextInput);

