import React from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { AiFillHome } from "react-icons/ai";
import { IconProvider, TxtCopy, redirectOut, phoneFormat } from 'utils/common.utils';
import { MdOutlineContentCopy } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { Selector } from 'Component';
import Items from './Componets/Items';
import { numberFormatter } from 'utils/common.utils';
import { enLangauge } from 'Contents/en-langauge';

import {
  useParams,
  //  useNavigate 
} from 'react-router-dom';
import { useFetch } from "hooks";
const UserDetails = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [
    // state,
    setState] = React.useState(null);

  const { data } = useFetch({
    initialUrl: `/user/${id}`,
    skipOnStart: false,
    config: {
      method: "get"
    }
  });


  const AgentBreadcrumbDetails = React.memo((props) => {
    return (
      <React.Fragment>
        <Breadcrumb>
          <IconProvider className={`text-white text-lg float-right cursor-pointer `} color={`#2B4C9B`}>
            <AiFillHome />
          </IconProvider>
          <Breadcrumb.Item >
            <BreadcrumbLabel theme={{ color: '#2B4C9B' }}>{enLangauge.USER_DETAIL_USERS}</BreadcrumbLabel>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <BreadcrumbLabel> {enLangauge.USER_DETAIL_VIEW_CUSTOMER}</BreadcrumbLabel>
          </Breadcrumb.Item >
        </Breadcrumb>
        <div className='lg:flex lg:justify-between md:flex md:justify-between block'>
          <div>
            <div className='flex justify-between'>
              <div>
                <CustomeTxtOne theme={{ color: "black" }}>
                  {enLangauge.USER_DETAIL_CUSTOMER_SINCE}
                </CustomeTxtOne>
                <CustomeTxtOne >
                  12 Sept 2022 - 12:55 pm
                </CustomeTxtOne>
              </div>
              <div className="pl-3">
                <CustomeTxtOne theme={{ color: "black" }}>
                  {enLangauge.USER_DETAIL_USER_ID}
                </CustomeTxtOne>
                <CustomeTxtOne >
                  <span id="agentID">
                    {id}
                  </span>
                </CustomeTxtOne>
              </div>
              <span className="px-2" onClick={() => TxtCopy("agentID")}>
                <IconProvider className={`text-white text-lg float-right cursor-pointer `} color={`#2E72B9`}>
                  <MdOutlineContentCopy />
                </IconProvider>
              </span>
            </div>
          </div>
          <div className='lg:flex md:flex lg:justify-end md:justify-end' style={{display:"none"}}>
            <div className='grid px-2'>
              <div className="m-auto">
                <CustomeButton theme={{ bg: "#2B4C9B", color: "#fff" }}>{enLangauge.USER_DETAIL_EDIT_CUSTOMER}</CustomeButton>
              </div>
            </div>
            <div className='grid px-2'>
              <div className="m-auto">
                <CustomeButton theme={{ bg: "#E95050", color: "#fff" }}>{enLangauge.USER_DETAIL_SUSPEND_CUSTOMER}</CustomeButton>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }, [])
  
  return (
    <React.Fragment>
      <div className="lg:px-4 md:px-3 px-1">
        <AgentBreadcrumbDetails />
        <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-3 mt-2">
          <div className="col-span-4">
            <BoxCantainer>
              <div className=" h-auto grid grid-cols-2 gap-2 content-between pt-2">
                <div className="">
                  <div className="float-left">
                    <div className="flex  ">
                      <div className="pt-1">
                        <Img src={data?.user?.profile?.profile_picture} alt="loading.." />
                      </div>
                      <div>
                        <div className="pl-3">
                          <Title style={{fontSize:"13px"}}>{data?.user?.name}</Title>
                          <div>
                            <span>
                              <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                                Last Order{ }
                              </Title>
                            </span>
                            <span>
                              <Title theme={{ color: "black", fontSize: "12px" }}>
                                12 Sept 2022
                              </Title>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="float-right mt-1">
                    <Status>Active</Status>
                  </div>
                </div>
                <div className="pt-3 ">
                  <div className="float-left">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        {enLangauge.USER_DETAIL_PHONE_NUM}
                      </Title>
                      <span className='cursor-pointer' onClick={() => redirectOut(`tel:+${9080}`)}>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          {phoneFormat(9621144328, "+11")}
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 ">
                  <div className="">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        {enLangauge.USER_DETAIL_EMAIL_ID}
                      </Title>
                      <span className='cursor-pointer' onClick={() => redirectOut(`mailto:${data?.user?.email}`)}>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          {data?.user?.email}
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </BoxCantainer>
          </div>
          <div className="col-span-8">
            <BoxCantainer>
              <div className=" h-auto grid grid-cols-2 gap-2 content-between pt-2">
                <div className="">
                  <div className="float-left">
                    <div className="flex  ">
                      <div className="pt-1">
                        <IconProvider className={`text-white text-lg float-right cursor-pointer `} color={`#2B4C9B`}>
                          <HiOutlineLocationMarker />
                        </IconProvider>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="float-right mt-1">

                  </div>
                </div>
                <div className="">
                  <div className="float-left">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        {enLangauge.USER_DETAILS_HOME_ADDRESS}
                      </Title>
                      <span>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          2464 Royal Ln. Mesa, New Jersey 45463
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 ">
                  <div className="">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        {enLangauge.USER_DETAILS_BILLING_ADDRESS}
                      </Title>
                      <span>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          2464 Royal Ln. Mesa, New Jersey 45463
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </BoxCantainer>
          </div>
          {/*  */}
          <div className="col-span-4">
            <BoxCantainer>
              <div className=" h-auto grid grid-cols-2 gap-2 content-between pt-2">
                <div className="">
                  <div className="float-left">
                    <div className="flex  ">
                      <div className="pt-1">
                        <IconProvider className={`text-white text-lg float-right cursor-pointer `} color={`#2B4C9B`}>
                          <BsHandbag />
                        </IconProvider>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="float-right mt-1">
                    <Select size={"small"} defaultOption={"Delhi"} setState={setState} options={["Delhi", "Mumbai", "London"]} />
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols1">
                <div className="pt-3 ">
                  <div className="">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        {enLangauge.USER_DETAIL_ALL_ORDER}
                      </Title>
                      <span>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          {numberFormatter(20)}
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 ">
                  <div className="">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        {enLangauge.USER_DETAIL_PENDING}
                      </Title>
                      <span>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          {numberFormatter(2)}
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 ">
                  <div className="">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        {enLangauge.USER_DETAIL_COMPLETED}
                      </Title>
                      <span>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          {numberFormatter(90)}
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </BoxCantainer>
          </div>
          <div className="col-span-8">
            <BoxCantainer>
              <div className=" h-auto grid grid-cols-2 gap-2 content-between pt-2">
                <div className="">
                  <div className="float-left">
                    <div className="flex  ">
                      <div className="pt-1">
                        <IconProvider className={`text-white text-lg float-right cursor-pointer `} color={`#2B4C9B`}>
                          <BsHandbag />
                        </IconProvider>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="float-right mt-1">
                    <Select size={"small"} defaultOption={"Delhi"} options={["Delhi", "Mumbai", "London"]} />
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols1">
                <div className="pt-3 ">
                  <div className="">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        {enLangauge.USER_DETAIL_CANCELED}
                      </Title>
                      <span>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          10
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 ">
                  <div className="">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        {enLangauge.USER_DETAIL_RETUNRED}
                      </Title>
                      <span>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          2
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 ">
                  <div className="">
                    <div>
                      <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                        Car Rentals {enLangauge.USER_DETAIL_DAMAGED}
                      </Title>
                      <span>
                        <Title theme={{ color: "black", fontSize: "12px" }}>
                          9
                        </Title>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </BoxCantainer>

          </div>
        </div>
        <Items />
      </div >
    </React.Fragment >
  );
}

export default UserDetails;


const BreadcrumbLabel = styled.span`
// font-family: 'Open Sans';
font-style: normal;
padding-bottom:3px;
font-weight: 400;
font-size: 12px;
line-height: 16px;
padding-left:2px;
color:${props => props?.theme?.color ?? '#9295A3'}
`;
const CustomeTxtOne = styled.span`
// font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
padding-left:2px;
padding-right:2px;
font-size: 16px;
line-height: 22px;
color: ${props => props?.theme?.color ?? '#9295A3'}

`;
const CustomeButton = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 17px 16px;
gap: 10px;
color: ${props => props?.theme?.color ?? '#fff'};
width: 167px;
height: 36px;
background: ${props => props?.theme?.bg ?? '#E95050'};
border-radius: 12px;
flex: none;
order: 1;
flex-grow: 0;
`;
const BoxCantainer = styled.div`
background: #FFFFFF;
box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
border-radius: 10px;
padding:0px 15px 15px 15px;

`;
const Img = styled.img`
width: 45px;
height: 45px;
border-radius:3px;
`;

const Title = styled.div`
// font-family: 'Open Sans';
font-style: normal;
margin-bottom:0.5px;
font-weight: 400;
font-size: ${porps => porps?.theme?.fontSize ?? '14px'};
color: ${props => props?.theme?.color ?? '#9295A3'};

`;

const Status = styled.button`
width: 56px;
background: ${props => props?.theme?.bg ?? '#6FCF97'};
color:#fff;
border-radius: 8px;
padding:2px 5px;
`;

const Select = styled(Selector)`
width:80px !important;
&& :hover {
  box-shadow:none !important;
}
`;