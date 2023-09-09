import React from 'react';

const RingProgressSimple = ({value ,props}) => {
  return (
    <React.Fragment>
      <div className={`radial-progress ${props?.bg??'bg-primary '} ${props?.content??'text-primary-content'}  ${props?.borderWidth??'border-0'} ${props?.border??'border-primary'}`} style={{"--value":value?value:0 , "--size": props?.size ?? "12rem"}}><span className={` ${props?.textClassName}`}>{value ??0 }</span></div>
    </React.Fragment>
  );
}

export default RingProgressSimple;
