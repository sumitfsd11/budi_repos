import React from 'react';
import styled from 'styled-components';
import { ServiceCardData } from 'utils/ObjectUtils';
import { IconProvider } from 'utils/common.utils';
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import { BsPlusCircleFill } from "react-icons/bs";
import { Tooltip, Skeleton } from 'antd';
import { ColumnGraph, Tab, BarGraph } from 'Component';
import SiteSpeed from './SiteSpeed';
import { useFetch } from 'hooks';
const DashboardChild = () => {

  const { isLoading } = useFetch({
    initialUrl: "agents",
    skipOnStart: false
  });
  const ServiceCard = React.memo((props) => {
    return (
      <React.Fragment>
        <CardOFService style={{ backgroundColor: props?.bgColor, boxShadow: props?.dropShadow }}>
          <div className="grid  grid-cols-6  ">
            <div className='col-span-5 '>
              <span className="text-white font-semibold">
                {props?.title}
              </span>
            </div>
            <div className=" col-span-1">
              <Tooltip placement="leftTop" color="black" title={
                <React.Fragment>
                  <button>Click </button>
                  <p className="cursor-pointer">lorem ipsum </p>
                </React.Fragment>} arrowPointAtCenter>
                <span>
                  <IconProvider className={`text-white text-lg float-right cursor-pointer `} color={`white `}>
                    <HiOutlineDotsHorizontal />
                  </IconProvider>
                </span>
              </Tooltip>
            </div>
          </div>
          <div>
            <section className="">
              <h1 className='py-5 text-white text-center  text-3xl font-semibold'>145</h1>
            </section>
            <div className="grid  grid-cols-5  ">
              <div className='col-span-1 '>
                <div className="float-left">
                  <AddBtn style={{ backgroundColor: props?.btnBgColor }}>
                    <IconProvider className={`text-white m-auto text-lg float-right cursor-pointer `} color={`white `}>
                      <BsPlusCircleFill />
                    </IconProvider>
                  </AddBtn>
                </div>
              </div>
              <div className='col-span-4 '>
                <div className="float-right">
                  <CustomeBtn style={{ backgroundColor: props?.btnBgColor }}>
                    {props?.btnText}
                  </CustomeBtn>
                </div>
              </div>
            </div>
          </div>
        </CardOFService>
      </React.Fragment>
    )
  }, []);

  // tabsOne
  const TabsOneData = React.useMemo(() => {
    return [
      {
        label: 'Weekly',
        key: 'weekly',
        children: <ColumnGraph />
      },
      {
        label: '6 Month',
        key: 'month',
        children: <ColumnGraph />
      },
      {
        label: 'Year',
        key: 'year',
        children: <ColumnGraph />
      }
    ]
  }, [])

  const TabOneLeftComponent = React.memo(() => {
    return (
      <React.Fragment>
        <CustomeLabel>User Stats</CustomeLabel>
      </React.Fragment>
    )
  }, []);
  const TabOneRightComponent = React.memo(() => {
    return (
      <React.Fragment>
        <div className="">
          <Tooltip placement="leftTop" color="black" title={
            <React.Fragment>
              <button>Click </button>
              <p className="cursor-pointer">lorem ipsum </p>
            </React.Fragment>} arrowPointAtCenter>
            <span>
              <IconProvider className={`text-[4D5E80] text-lg float-right cursor-pointer `} color={`#4D5E80`}>
                <HiOutlineDotsVertical />
              </IconProvider>
            </span>
          </Tooltip>
        </div>
      </React.Fragment>
    )
  }, [])

  const TabOneProps = React.useMemo(() => {
    return {
      data: TabsOneData,
      leftComponet: <TabOneLeftComponent />,
      rightComponent: <TabOneRightComponent />
    }
  }, [TabsOneData]);
  // tabTwo
  const TabsTwoData = React.useMemo(() => {
    return [
      {
        label: 'Weekly',
        key: 'weekly',
        children: <BarGraph />
      },
      {
        label: 'Month',
        key: 'month',
        children: <BarGraph />
      },
      {
        label: 'Year',
        key: 'year',
        children: <BarGraph />
      }
    ]
  }, [])

  const TabTwoLeftComponent = React.memo(() => {
    return (
      <React.Fragment>
        <CustomeLabel>Activities</CustomeLabel>
      </React.Fragment>
    )
  }, []);
  const TabTwoRightComponent = React.memo(() => {
    return (
      <React.Fragment>
        <div className="">
          <Tooltip placement="leftTop" color="black" title={
            <React.Fragment>
              <button>Click </button>
              <p className="cursor-pointer">lorem ipsum </p>
            </React.Fragment>} arrowPointAtCenter>
            <span>
              <IconProvider className={`text-[4D5E80] text-lg float-right cursor-pointer `} color={`#4D5E80`}>
                <HiOutlineDotsVertical />
              </IconProvider>
            </span>
          </Tooltip>
        </div>
      </React.Fragment>
    )
  }, [])

  const TabTwoProps = React.useMemo(() => {
    return {
      data: TabsTwoData,
      leftComponet: <TabTwoLeftComponent />,
      rightComponent: <TabTwoRightComponent />
    }
  }, [TabsTwoData]);
  // side speed

  const SiteSpeedComponent = React.useMemo(() => {
    return [
      {
        label: 'Weekly',
        key: 'weekly',
        children: <SiteSpeed />
      },
      {
        label: 'Month',
        key: 'month',
        children: <SiteSpeed />
      },
      {
        label: 'Year',
        key: 'year',
        children: <SiteSpeed />
      }
    ]
  }, [])

  const SiteSpeedTabLeftComponent = React.memo(() => {
    return (
      <React.Fragment>
        <CustomeLabel>Activities</CustomeLabel>
      </React.Fragment>
    )
  }, []);
  const SiteSpeedTabRightComponent = React.memo(() => {
    return (
      <React.Fragment>
        <div className="">
          <Tooltip placement="leftTop" color="black" title={
            <React.Fragment>
              <button>Click </button>
              <p className="cursor-pointer">lorem ipsum </p>
            </React.Fragment>} arrowPointAtCenter>
            <span>
              <IconProvider className={`text-[4D5E80] text-lg float-right cursor-pointer `} color={`#4D5E80`}>
                <HiOutlineDotsVertical />
              </IconProvider>
            </span>
          </Tooltip>
        </div>
      </React.Fragment>
    )
  }, [])

  const SiteSpeedProps = React.useMemo(() => {
    return {
      data: SiteSpeedComponent,
      leftComponet: <SiteSpeedTabLeftComponent />,
      rightComponent: <SiteSpeedTabRightComponent />
    }
  }, [SiteSpeedComponent]);
  return (
    <React.Fragment>
      <div className="grid lg:grid-cols-2  md:grid-cols-1 grid-cols-1 gap-3">
        <div className="">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2  gap-4">
            {ServiceCardData?.map((props, index, array) => (
              isLoading ? (<Skeleton className="m-3" active key={index} />) : (
                <ServiceCard {...props} key={index} />
              )
            )
            )
            }
          </div>
          <div className='mt-8'>
            <BoxCantainer>
              {isLoading ?
                (<Skeleton className="mt-3" active />) : (<Tab props={TabOneProps} />)
              }
            </BoxCantainer>
          </div>
          <div className='mt-8'>
            <BoxCantainer>
              {isLoading ?
                (<Skeleton className="mt-3" active />) : (
                  <Tab props={TabTwoProps} />
                )}
            </BoxCantainer>
          </div>
        </div>
        <div className="lg:pl-3 md:pl-0 pl-0">
          <BoxCantainer>
            {isLoading ?
              (<Skeleton className="mt-3" active />) : (
                <Tab props={SiteSpeedProps} />
              )}
          </BoxCantainer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DashboardChild;



const CardOFService = styled.div`
height:160px;
border-radius:10px;
width:100%;
padding:15px;

`;
const CustomeBtn = styled.button`
height:30px;
border-radius:100px;
font-size:10px;
font-weight:700;
padding-left:15px;
padding-right:15px;
// font-family: 'Open Sans';
color: #FFFFFF;
transition:all ease 0.3s; 
   &:hover:hover{
  opacity:0.8;
} 
`;

const AddBtn = styled.button`
color:white ;
width:30px;
height:30px;
display:grid;
border-radius:50%;
transition:all ease 0.3s; 
&:hover:hover{
  opacity:0.8;
} 
`;
const BoxCantainer = styled.div`
background: #FFFFFF;
box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
border-radius: 10px;
padding:0px 15px 15px 15px;
`;
const CustomeLabel = styled.div`
// font-family: 'Open Sans';
// font-style: normal;
font-weight: 700;
font-size: 13px;
color: #4D5E80;
`;