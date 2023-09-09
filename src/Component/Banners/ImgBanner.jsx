import React from 'react'

export default function ImgBanner({ children }) {
    return (
        <div>
            <div className='grid h-[100%]'>
                {
                    children
                }
            </div>
        </div>
    )
}
