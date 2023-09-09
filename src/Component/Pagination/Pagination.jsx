import React from 'react';
import styled from "styled-components";

export const PaginationComponent = ({
  labelClassName,
  labelText,
  children
}) => {
  return (
    <React.Fragment>
      <div className="lg:flex md:flex  lg:justify-between md:justify-between  block">
        <div className={`  py-1 ${labelClassName}`}>
          <CustomeText>{labelText ?? 'Default text '}</CustomeText>
        </div>
        <div className=' py-1 '>
          {
            children
          }
        </div>
      </div>
    </React.Fragment>
  )
}


const CustomeText = styled.div`
// font-family: 'Open Sans';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 19px;
letter-spacing: -0.01em;
color: #9295A3;

`;