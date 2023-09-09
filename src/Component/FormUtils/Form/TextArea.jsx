import React from 'react'
import { Input } from 'antd';

const { TextArea } = Input;
const TextFieldArea = ({
    placeholder,
    className,
    label,
    rows,
    error,
    isRequired = false,
    labelClassName,
    ...props
}) => {
    return (
        <div>
            <div>
                <label htmlFor={'name'} >{label}</label>
                <br />
                <div>
                    <TextArea {...props} required={isRequired} className={` rounded-md textarea-bordered ${className}`} rows={rows ?? 4} placeholder={placeholder} />
                </div>
                <p className=" px-2 mb-0 pt-1 text-xs  text-error-color">{error?.message}</p>
            </div>
        </div>
    )
}

export default React.forwardRef(TextFieldArea);
