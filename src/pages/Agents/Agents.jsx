import React from 'react';
import styled from 'styled-components';
import { Tab, RingProgressSimple, ColumnGraph } from 'Component';
import { IconProvider } from 'utils/common.utils';
import { Tooltip, Skeleton } from 'antd';
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from 'react-icons/hi';
import AgentsList from './Componets/AllAgentsList';
import { enLangauge } from 'Contents/en-langauge';
import { useFetch } from 'hooks';
import Items from './Componets/Items';

const Agents = () => {
  const onSuccess = React.useCallback((response) => {

  }, []);
  const onFailure = React.useCallback((response) => {

  }, [])
  const { isLoading, data } = useFetch({
    initialUrl: "/agent_chart",
    skipOnStart: false,
    onFailure,
    onSuccess
  });
  const graph_data = React.useMemo(() => {
    let arr = []
    if (!isLoading) {
      data.months.forEach((i, index) => {

        arr.push({
          type: [i][0],
          sales: data.count[index]
        })
      })
    }
    return arr
  }, [isLoading, data])
  const user_count = React.useMemo(() => {
    if (!isLoading) {
      return data?.count.reduce((i, b) => i + b)
    } else {
      return 0
    }
  }, [isLoading, data])

  const SiteSpeedComponent = React.useMemo(() => {
   return [
      // {
      //   label: 'Weekly',
      //   key: 'weekly',
      //   children: <ColumnGraph  {...{data:graph_data}} />
      // },
      // {
      //   label: 'Month',
      //   key: 'month',
      //   children: <ColumnGraph  {...{data:graph_data}} />
      // },
      {
        label: 'Year',
        key: 'year',
        children: <ColumnGraph  {...{ data: graph_data }} />
      }
    ]
  }, [graph_data]);

  React.useEffect(() => {
    document.getElementById("defaulopen")?.click();
  }, [])
  
  function openTab(evt, cityName) {
    var i, tabcontainer, tabbtn;
    tabcontainer = document.getElementsByClassName("tabcontainer");
    for (i = 0; i < tabcontainer.length; i++) {
      tabcontainer[i].style.display = "none";
    }
    tabbtn = document.getElementsByClassName("tabbtn");
    for (i = 0; i < tabbtn.length; i++) {
      tabbtn[i].className = tabbtn[i].className.replace(" tab-active-btn", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " tab-active-btn";
  }

  const SiteSpeedTabLeftComponent = React.memo(() => {
    return (
      <React.Fragment>
        <CustomeLabel>{enLangauge.AGENTS_ACTIVITIES}</CustomeLabel>
      </React.Fragment>
    )
  }, []);

  const SiteSpeedTabRightComponent = React.memo(() => {
    return (
      <React.Fragment>
        <div className="">
          <Tooltip placement="leftTop" color="black" title={
            <React.Fragment>
          {/* tool tip dom  */}
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
        <div className=" grid lg:grid-cols-12 mt-4  md:grid-cols-1 grid-cols-1 gap-3">
          <div className="lg:col-span-3 md:col-span-3 col-span-1">
            <div className="">
              <BoxCantainer>
                {
                  isLoading ? (
                    <Skeleton className="mt-3" active />
                  ) : (
                    <div className="p-[15px]">
                      <div className="grid  grid-cols-6  ">
                        <div className='col-span-5 '>
                          <span className="text-white font-semibold">
                            <Label>{enLangauge.AGENTS_INSIGHTS}</Label>
                          </span>
                        </div>
                        <div className=" col-span-1 ">
                          <Tooltip placement="leftTop" color="black" title={
                            <React.Fragment>
                         {/* tooltip doms  */}
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
                            } value={user_count} />
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
                  isLoading ? (
                    <Skeleton className="mt-3" active />
                  ) : (
                    <Tab props={SiteSpeedProps} />
                  )
                }
              </BoxCantainer>
            </div>
          </div>
        </div>
        <div className='my-2' >
          <button className='tabbtn  mx-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-primary-color  shadow rounded-full' id="defaulopen" onClick={(event) => openTab(event, "1")}>{enLangauge?.AGENT_BUTTON_AGENTS}</button>
          <button className='tabbtn  mx-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-primary-color shadow rounded-full' onClick={(event) => openTab(event, "2")}>{enLangauge?.AGENT_BUTTON_UNAPPROVED}</button>
     </div>
        <div>
          <div className='tabcontainer' id="1">
            <AgentsList />
          </div>
          <div className='tabcontainer' id="2">
          <Items/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Agents;


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
