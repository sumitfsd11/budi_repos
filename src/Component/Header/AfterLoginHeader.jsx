import React from 'react';
import { Drawer, Tooltip , Space } from "antd"
import { IconProvider , ImgProvider} from 'utils/common.utils';
import { Sidebar, TopHeader , Icon } from "Component"
import styled from "styled-components";
import { SidebarContants, AgentRemainSideConstant } from 'constants/Sidebar.menu';
import { ChildSubMenu, ChildSubAgent } from 'Component/Sidebar/Sidebar';
import { Outlet , useNavigate} from 'react-router-dom';
import { useFetch } from 'hooks';
import { BsPeopleFill } from "react-icons/bs";
import { useAuth } from 'hooks';
import { Logo } from 'utils/common.utils';
import logo from "Assets/budi.png"
const AfterLoginHeader = () => {
  const { session , userValue} = useAuth()
  const navigate = useNavigate()
  const [sideMenu, SetMenu] = React.useState(false);
  const onClose = () => {
    SetMenu(false);
  };
  const onSuccess = React.useCallback((response) => {

  }, []);
  const onFailure = React.useCallback((response) => {

  }, [])
  const { isLoading, data } = useFetch({
    initialUrl: "/agents",
    skipOnStart: false,
    onFailure,
    onSuccess
  });

  const { data:userData,  } = useFetch({
    initialUrl: `/user/${userValue?.id}`,
    skipOnStart: false,
    config: {
        method: 'get'
    }
})
 
const redirectOnprofile = React.useCallback(()=>{
navigate('/profile')
onClose()
},[navigate])
  const agents = React.useMemo(() => {
    if (!isLoading) {
      return data?.agents?.data?.map((i, index) => ({
        img: i?.profile?.profile_picture,
        isLive: 'Live',
        name: i?.name,
        link: `/agent/${i?.id}`,
        id: i.id,
      }));
    }
  }, [isLoading, data?.agents]);
  const AgentUser = [
    {
      link: '/agents',
      key: '',
      title: 'Agents',
      permissionKey: '',
      tag: null,
      notification: 12,
      IconColor: '#FFCB33',
      icon: <BsPeopleFill />,
      child: agents,
    },
    ...AgentRemainSideConstant
  ]


  return (
    <React.Fragment>
      <div className="lg:block md:block hidden">
        <TopHeader />
        <div className=" grid grid-cols-12 gap-2 lg:px-4 md:px-4 px-1">
          <div className="lg:col-span-2 md:col-span-3 col-span-12">
            <div className="">
              <SideBarContainer>
                {
                  SidebarContants?.map((i, index) => (
                    <Sidebar props={i} key={index}>
                      {
                        i?.child?.map((i, index) => (
                          <ChildSubMenu key={index} props={i} />
                        ))
                      }
                    </Sidebar>
                  ))
                }
              </SideBarContainer>
            </div>
            <div className="mt-3">
              <SideBarContainer>
                {
                  AgentUser?.slice(0 , 8).map((i, index) => (
                    <Sidebar props={i} key={index}>
                      {
                        i?.child?.map((i, index) => (
                          <ChildSubAgent key={index} props={i} />
                        ))
                      }
                    </Sidebar>
                  ))
                }
              </SideBarContainer>
            </div>
          </div>
          <div className="lg:col-span-10 md:col-span-9 col-span-10">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="lg:hidden md:hidden block">
        <TopHeader SetMenu={SetMenu} sideMenu={sideMenu}>
          <Drawer
            placement="left"
            title={<div className='float-left'><Logo src={logo} style={{width:"100px"}} /></div>}
            size={'230'}
            onClose={onClose}
            closable={false}
            open={sideMenu}
            extra={
              <Space style={{padding:"1px"}}>
                {session && (
                  <div className='flex justify-between'>
                    <div className=' w-[120px ] text-primary-color  whitespace-nowrap pt-2 '>
                     <span className='font-bold '>Welcome, </span> {userData?.user?.name} 
                    </div>
                  <div className=' pr-2' onClick={redirectOnprofile}>
                    <Tooltip placement="bottomRight" title={'Profile'}>
                      <Icon className={" w-[40px] grid h-[40px] rounded-full border  drop-shadow-md cursor-pointer border-2 overflow-auto border-primary-color mx-1 relative "} >
                        <IconProvider className={` text-[20px] cursor-pointer `} color={`#6B7A99`}>
                          <img className='border border-1 ' src={ImgProvider(userData?.user?.profile?.profile_picture)} alt="loading..." />
                        </IconProvider>
                      </Icon>
                    </Tooltip>
                  </div>
                  </div>
                )}
              </Space>
            }
          >
            <div className="sidebar ">
              <div className="">
                <SideBarContainer>
                  {
                    SidebarContants?.map((i, index) => (
                      <Sidebar props={i} SetMenu={SetMenu} key={index}>
                        {
                          i?.child?.map((i, index) => (
                            <ChildSubMenu SetMenu={SetMenu} key={index} props={i} />
                          ))
                        }
                      </Sidebar>
                    ))
                  }
                </SideBarContainer>
              </div>
              <div className="mt-3">
                <SideBarContainer>
                  {
                    AgentUser?.map((i, index) => (
                      <Sidebar SetMenu={SetMenu} props={i} key={index}>
                        {
                          i?.child?.map((i, index) => (
                            <ChildSubAgent SetMenu={SetMenu} key={index} props={i} />
                          ))
                        }
                      </Sidebar>
                    ))
                  }
                </SideBarContainer>
              </div>
            </div>
          </Drawer>
          <div className="mt-[65px]">
            <Outlet />
            <br />
            <br />
            <br />
          </div>
        </TopHeader>
      </div>
    </React.Fragment>
  );
}

export default AfterLoginHeader;

const SideBarContainer = styled.div`
background:#fff;
border-radius:10px;
padding:6px;
border:1px solid #c5d5e2;

`;
