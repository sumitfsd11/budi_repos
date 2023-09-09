import React from 'react';
import styled from 'styled-components';
import { ColumnStackPlot, Tab, RingProgressSimple } from 'Component';
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import { IconProvider } from 'utils/common.utils';
import { enLangauge } from 'Contents/en-langauge';
import { Tooltip, Skeleton } from 'antd';
import TopAgents from './Components/TopAgents';
import { useFetch } from 'hooks';

const Revenue = () => {

  const { isLoading  } = useFetch({
    initialUrl: "/agents",
    skipOnStart: false
  });

  const SiteSpeedComponent = React.useMemo(() => {
    return [
      {
        label: 'Weekly',
        key: 'weekly',
        children: <ColumnStackPlot />
      },
      {
        label: 'Month',
        key: 'month',
        children: <ColumnStackPlot />
      },
      {
        label: 'Year',
        key: 'year',
        children: <ColumnStackPlot />
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
      <div className="lg:px-4 md:px-3 px-1">
        <div className=" grid lg:grid-cols-12  md:grid-cols-1 grid-cols-1 gap-3">
          <div className="lg:col-span-3 md:col-span-3 col-span-1">
            <div className="">
              <BoxCantainer>
                {
                  isLoading ? (<Skeleton className="mt-3" active />) : (
                    <div className="p-[15px]">
                      <div className="grid  grid-cols-6  ">
                        <div className='col-span-5 '>
                          <span className="text-white font-semibold">
                            <Label>{enLangauge.REVENUE_TOTAL_REVENUE} </Label>
                          </span>
                        </div>
                        <div className=" col-span-1">
                          <Tooltip placement="leftTop" color="black" title={
                            <React.Fragment>
                              <button>Click </button>
                              <p className="cursor-pointer">lorem ipsum </p>
                            </React.Fragment>} arrowPointAtCenter>
                            <span>
                              <IconProvider className={`text-white text-lg float-right cursor-pointer `} color={`#4D5E80`}>
                                <HiOutlineDotsHorizontal />
                              </IconProvider>
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="grid p-4">
                        <div className="m-auto">
                          <RingProgressSimple
                            props={
                              {
                                textClassName: 'text-[18px] font-semibold ',
                                bg: 'bg-[#1EB8D2]',
                                content: 'text-[#fff]',
                                borderWidth: 'border-4',
                                border: 'border-[#1EB8D2]'
                              }
                            } value={78} />
                        </div>
                      </div>
                    </div>
                  )
                }
              </BoxCantainer>
            </div>
          </div>
          <div className="lg:col-span-9 md:col-span-9 col-span-1 lg:pl-3 md:pl-2 pl-0">
            <div className="">
              <BoxCantainer>
                {
                  isLoading ? (<Skeleton className="mt-3" active />) : (
                    <div className='p-[15px]'>
                      <div className="grid  grid-cols-6  ">
                        <div className='col-span-5 '>
                          <span className="text-white font-semibold">
                            <Label>{enLangauge.REVENUE_REVENUE_SOURCE}</Label>
                          </span>
                        </div>
                        <div className=" col-span-1 ">
                          <Tooltip placement="leftTop" color="black" title={
                            <React.Fragment>
                              <button>Click </button>
                              <p className="cursor-pointer">lorem ipsum </p>
                            </React.Fragment>} arrowPointAtCenter>
                            <span>
                              <IconProvider className={`text-white text-lg float-right cursor-pointer `} color={`#4D5E80`}>
                                <HiOutlineDotsHorizontal />
                              </IconProvider>
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="resourceType">
                        <div className="grid lg:gird-cols-7 md:grid-cols-4 grid-cols-2 ">
                          <ResourceText>Hotel</ResourceText>
                        </div>
                        {/* resource  */}
                        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2'>
                          {
                            Array(4).fill().map((_, i) => (
                              <div className="p-3" key={i.toString()}>
                                <ResourceType>
                                  <RingProgressSimple
                                    props={
                                      {
                                        textClassName: 'text-[18px] text-[#34B53A] font-semibold ',
                                        bg: 'bg-[#E2FBD7]',
                                        content: 'text-[#34B53A]',
                                        borderWidth: 'border-4',
                                        border: 'border-[#E2FBD7]',
                                        size: '8rem'
                                      }
                                    } value={28} />
                                </ResourceType>
                              </div>
                            ))
                          }
                        </div>
                        <section>
                          <CustomeText>
                            <p>Every large design company whether it’s a multi-national branding corporation or a regular down at heel tatty magazine publisher needs to fill holes in the workforce.</p>
                          </CustomeText>
                        </section>
                      </div>
                    </div>
                  )}
              </BoxCantainer>
            </div>
          </div>
        </div>

        <div className=" grid lg:grid-cols-12 mt-4  md:grid-cols-1 grid-cols-1 gap-3">
          <div className="lg:col-span-3 md:col-span-3 col-span-1">
            <div className="">
              <BoxCantainer>
                {
                  isLoading ? (<Skeleton className="mt-3" active />) : (

                    <div className="p-[15px]">
                      <div className="grid  grid-cols-6  ">
                        <div className='col-span-5 '>
                          <span className="text-white font-semibold">
                            <Label>Insights</Label>
                          </span>
                        </div>
                        <div className=" col-span-1 ">
                          <Tooltip placement="leftTop" color="black" title={
                            <React.Fragment>
                              <button>Click </button>
                              <p className="cursor-pointer">lorem ipsum </p>
                            </React.Fragment>} arrowPointAtCenter>
                            <span>
                              <IconProvider className={`text-white text-lg float-right cursor-pointer `} color={`#4D5E80`}>
                                <HiOutlineDotsHorizontal />
                              </IconProvider>
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="grid p-4">
                        <div className="m-auto">
                          <RingProgressSimple
                            props={
                              {
                                textClassName: 'text-[18px] text-[#34B53A] font-semibold ',
                                bg: 'bg-[#E2FBD7]',
                                content: 'text-[#34B53A]',
                                borderWidth: 'border-4',
                                border: 'border-[#E2FBD7]'
                              }
                            } value={28} />
                        </div>
                      </div>
                    </div>
                  )
                }
              </BoxCantainer>
            </div>
          </div>
          <div className="lg:col-span-9 md:col-span-9 col-span-1 lg:pl-3 md:pl-2 pl-0">
            <div className="">
              <BoxCantainer>
                {
                  isLoading ? (<Skeleton className="mt-3" active />) : (
                    <Tab props={SiteSpeedProps} />
                  )
                }
              </BoxCantainer>
            </div>
          </div>
        </div>
        <div className="">
          <TopAgents />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Revenue;



const BoxCantainer = styled.div`
background: #FFFFFF;
box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
border-radius: 10px;
padding:0px 15px 15px 15px;
`;

const Label = styled.span`
// font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 130%;
color: #1B263C;
`;

const CustomeLabel = styled.div`
// font-family: 'Open Sans';
// font-style: normal;
font-weight: 700;
font-size: 13px;
color: #4D5E80;
`;
const ResourceType = styled.div`
background:transparent;
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
const ResourceText = styled.li`
list-style: none;
// font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
color: #1B263C;
`;
