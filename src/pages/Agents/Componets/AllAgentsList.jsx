import React from 'react';
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { IconProvider } from 'utils/common.utils';
import { PaginationContainer } from 'Component';
import { useFetch } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import { enLangauge } from 'Contents/en-langauge';
import { Pagination } from 'antd';
const AgentsList = ({ props }) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = React.useState(1)
  const onSuccess = React.useCallback((response) => {

  }, []);
  const onFailure = React.useCallback((response) => {

  }, [])
  const { isLoading, data, callFetch } = useFetch({
    initialUrl: "/agents",
    skipOnStart: false,
    onFailure,
    onSuccess
  });

  const paginationAction = React.useCallback((a, b) => {
    if (a) {
      setCurrentPage(a)
      callFetch({
        url: `/agents?page=${a}`,
        method: "get"
      })
    }
  }, [callFetch])
  
  // fiteration fucntion

  // const timeFrameFilteration = React.useCallback((e) => {
  // }, []);

  // const offerAllTime =
  //   React.useCallback((e) => {
  //   }, []);

  // const profitAll =
  //   React.useCallback((e) => {
  //   }, []);

  // filteration components
  // const FilterationComponent = React.memo(() => {
  //   return (
  //     <React.Fragment>
  //       <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3">
  //         <div className="p-2 grid" >
  //           <select onChange={timeFrameFilteration} className="select m-auto select-bordered select-sm w-full max-w-xs">
  //             <option value={undefined} selected>{enLangauge.TOP_AGENT_FILTERATION_TIME_FRAMED}</option>
  //             <option>English</option>
  //             <option>Japanese</option>
  //             <option>Italian</option>
  //           </select>
  //         </div>

  //         <div className="p-2 grid">
  //           <select onChange={offerAllTime} className="select m-auto select-bordered select-sm w-full max-w-xs">
  //             <option value={undefined} selected>{enLangauge.TOP_AGENT_FILTERATION_OFFER_ALLD}</option>
  //             <option>English</option>
  //             <option>Japanese</option>
  //             <option>Italian</option>
  //           </select>
  //         </div>

  //         <div className="p-2 grid">
  //           <select onChange={profitAll} className="select m-auto select-bordered select-sm w-full max-w-xs">
  //             <option value={undefined} selected>{enLangauge.TOP_AGENT_FILTERATION_PROFIT_ALLD}</option>
  //             <option>English</option>
  //             <option>Japanese</option>
  //             <option>Italian</option>
  //           </select>
  //         </div>
  //       </div>
  //     </React.Fragment>
  //   )
  // }, []);

  return (
    <React.Fragment>

      <React.Fragment>
        <div className="">
          <div className="pl-2">
            <Label>{enLangauge.AGENTS_HEADING}</Label>
          </div>
          <div className="my-2">
            {/* <FilterationComponent /> */}
          </div>
          <div className="lg:overflow-x-hidden md:overflow-x-hidden overflow-x-scroll ">
            {
              isLoading ? (
                <React.Fragment>
                  <Skeleton className="mt-3" active />
                  <br />
                  <Skeleton className="mt-3" active />
                </React.Fragment>
              ) : (
                data?.agents?.data?.map((agent, index) => (
                  <AgentContainer key={index.toString()}>
                    <div className="grid grid-cols-4 lg:w-full md:w-full w-[550px] ">
                      <div>
                        <div className="flex items-center ">
                          <div className="">
                            <Img src={agent?.profile?.profile_picture} alt="loading... " />
                          </div>
                          <div className="pl-2">
                            <CustomeTxt>{agent?.name.split(" ")[0]}</CustomeTxt>
                            <CustomeText>{agent?.name.split(" ")[1]}</CustomeText>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="grid grid-cols-2 lg:pt-3 md:pt-3">
                          <div className='float-left text-center'>
                            <CustomeTxt>-- </CustomeTxt>
                            <CustomeText>Offer</CustomeText>
                          </div>
                          <div className='float-right  text-center'>
                            <CustomeTxt>--</CustomeTxt>
                            <CustomeText>Finished Project</CustomeText>
                          </div>
                        </div>
                      </div>
                      <div className="lg:inline md:inline grid ">
                        <div className="lg:m-0 md:m-0 m-auto">
                          <div className="flex lg:float-right md:float-right float-none pr-3 lg:pt-2 md:pt-2 lg:pb-0 md:pb-0 pb-2 ">
                            <div className=''>
                              <AgentRevenueTxt>$--</AgentRevenueTxt>
                              <CustomeText>Total Profit</CustomeText>
                            </div>
                            <div className="grid mt-3 ml-3 ">
                              <div className="auto l">
                                <AddBtn onClick={() => navigate(`/agent/${agent?.id}`)}>
                                  <IconProvider className={`text-white m-auto text-lg float-right cursor-pointer `} color={`#1B263C`}>
                                    <IoIosArrowForward />
                                  </IconProvider>
                                </AddBtn>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AgentContainer>
                ))
              )
            }
            <div className="mb-3">
              <PaginationContainer labelText={"Total : "
                + "" + data?.agents?.total + " of Page " + data?.agents?.current_page
              } >
                <Pagination showSizeChanger={false}
                  defaultCurrent={1}
                  current={currentPage}
                  defaultPageSize={10}
                  total={data?.agents?.total} onChange={paginationAction} />
              </PaginationContainer>
            </div>
          </div>
        </div>

      </React.Fragment>
    </React.Fragment>
  );
}

export default AgentsList;

const AgentRevenueTxt = styled.div`
// font-family: 'Open Sans';
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 30px;
color: #2B4C9B;
`;

const AddBtn = styled.button`
color:white ;
width:35px;
height:35px;
display:grid;
border-radius:50%;
transition:all ease 0.3s; 
background: rgba( 228,226,226, 0.45 );
 backdrop-filter: blur(9px);
&:hover:hover{
  opacity:0.8;
} 
`;
const Img = styled.img`
height:60px;
width:60px;
border-radius:50%;
`;

const CustomeTxt = styled.div`
// font-family: 'Open Sans';
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 30px;
color: #1B263C;
`;
const CustomeText = styled.div`
// font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
color: #9295A3;
mix-blend-mode: normal;
`;
const AgentContainer = styled.div`
background: #FFFFFF;
box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
border-radius: 10px;
margin-top:10px;
margin-bottom:10px;
padding:5px 15px;
`;
const Label = styled.span`
// font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 130%;
color: #1B263C;
`;
