import React from 'react';
import { RingProgressCmp  } from 'Component';
import styled from "styled-components";
const SiteSpeed = ({props}) => {
  return (
    <React.Fragment>
  
      <div className='grid lg:grid-cols-12 md:grid-cols-1 grid-cols-1 p-5'>
        <div className="col-span-4 grid  ">
          <div className="m-auto ">
            <RingProgressCmp />
          </div>
        </div>
        <div className="col-span-8">
          <div className="grid w-full lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-4">
            <DetailContainer>
              <div className="">
                <strong>1.9mb</strong>
                <div>Page Size </div>
              </div>
            </DetailContainer>
            <DetailContainer>
              <div className="">
              <strong>1.9mb</strong>
                <div>Page Size </div>
              </div>
            </DetailContainer>
            <DetailContainer>
              <div className="">
              <strong>1.9mb</strong>
                <div>Page Size </div>
              </div>
            </DetailContainer>
            <DetailContainer>
              <div className="">
              <strong>1.9mb</strong>
                <div>Page Size </div>
              </div>
            </DetailContainer>
          </div>

        </div>
      </div>


    </React.Fragment>
  );
}

export default SiteSpeed;

const DetailContainer = styled.div`
background: rgba(51, 97, 255, 0.05);
border-radius: 10px;
padding:16px 3px ;
text-align: center;
color: #2B4C9B;
`;