import React from 'react';
import styled from 'styled-components';
import { Tab, RingProgressSimple, ColumnGraph } from 'Component';
import { IconProvider } from 'utils/common.utils';
import { Tooltip, Skeleton } from 'antd';
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from 'react-icons/hi';
import AllUserList from './Componets/AllUserList';
import { useFetch } from 'hooks';
import { enLangauge } from 'Contents/en-langauge';
const Users = () => {
  const { isLoading, data } = useFetch({
    initialUrl: "/user_chart",
    skipOnStart: false,
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
  },[graph_data])


  const SiteSpeedTabLeftComponent = React.memo(() => {
    return (
      <React.Fragment>
        <CustomeLabel>{enLangauge.USERS_ACTIVITIES}</CustomeLabel>
      </React.Fragment>
    )
  }, []);
  const SiteSpeedTabRightComponent = React.memo(() => {
    return (
      <React.Fragment>
        <div className="">
          <Tooltip placement="leftTop" color="black" title={
            <React.Fragment>
              {/* tooltip dom  */}
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
                <div className="p-[15px]">
                  {
                    isLoading ? (<Skeleton className='m-1' active />) : (
                      <React.Fragment>
                        <div className="grid  grid-cols-6  ">
                          <div className='col-span-5 '>
                            <span className="text-white font-semibold">
                              <Label>{enLangauge.USERS_INSIGHTS}</Label>
                            </span>
                          </div>
                          <div className=" col-span-1 ">
                            <Tooltip placement="leftTop" color="black" title={
                              <React.Fragment>
                                {/* tooltip dom  */}
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
                      </React.Fragment>)
                  }
                </div>
              </BoxCantainer>
            </div>
          </div>
          <div className="lg:col-span-9 md:col-span-9 col-span-1 lg:pl-3 md:pl-2 pl-0">
            <div className="">
              <BoxCantainer>
                {
                  isLoading ? (<Skeleton className='m-1' active />) : (
                    <Tab props={SiteSpeedProps} />
                  )
                }
              </BoxCantainer>
            </div>
          </div>
        </div>

        <div className="">
          <AllUserList />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Users;


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
