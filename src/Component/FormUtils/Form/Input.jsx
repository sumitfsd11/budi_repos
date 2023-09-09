import React  from "react";
import { Input } from 'antd';
const  InputFieldLatest=({ error,
    placeholder,
    name,
    isRequired,
    type,
    icon,
    ...props }) =>{
    return (
            <div className="w-full ">
                <div className="relative">
                    {icon && <span className="absolute top-4 left-3 bg-white">{icon}</span>}
                    <Input
                        type={type}
                        name={name}
                        required={isRequired}
                        placeholder={placeholder}
                        {...props}
                        className={` rounded-md input-bordered ${icon && 'pl-10'} w-full ${error && "border border-primary-color"
                            }`}
                    />
                </div>
                <p className=" px-2 mb-0 pt-1 text-xs  text-error-color">{error?.message}</p>
            </div>
    );
}

export default React.forwardRef(InputFieldLatest);
