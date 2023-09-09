import React from 'react';
import { HiOutlineDotsHorizontal, HiMenuAlt1 } from "react-icons/hi";
import { Icon, SearchBar } from "Component";
import { IconProvider, ImgProvider } from 'utils/common.utils';
import { Tooltip } from "antd";
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarContants } from 'constants/Sidebar.menu';
import styled from 'styled-components';
import { Logo } from 'utils/common.utils';
import logo from "Assets/budi.png"
// notification icon 
import { FaBell } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { useAuth, useFetch } from 'hooks';

const TopHeader = ({ SetMenu, sideMenu, children }) => {
  const { userValue } = useAuth()
  const location = useLocation();
  const navigate = useNavigate();

  const { data  } = useFetch({
    initialUrl: `/user/${userValue?.id}`,
    skipOnStart: false,
    config: {
      method: 'get'
    }
  })


  const TopLayoutSm = React.memo(() => {
    return (
      <React.Fragment>
        <div className="fixed top-0 w-full z-[99]  h-[55px] lg:hidden md:block block pt-2   bg-[#FFFFFF] rounded-md ">
          <div className='grid grid-cols-10 px-3'>
            <div className="col-span-1 grid ">
              <div className="m-auto" onClick={() => SetMenu(!sideMenu)}>
                <IconProvider className={` text-lg float-right cursor-pointer `} color={`#000000`}>
                  <HiMenuAlt1 />
                </IconProvider>
              </div>
            </div>
            <div className="col-span-2 grid">
              <div className="m-auto text-secondry-color font-bold">
                <div className='float-left'><Logo src={logo} style={{ width: "100px" }} /></div>
              </div>
            </div>
            <div className="col-span-7 px-3">
              <SearchBar />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }, []);

  const notificationList = React.useMemo(() => {
    return [
      {
        icon: <FaBell />,
        Link: '',
        notificationCount: 10,
      },
      {
        icon: <MdMessage />,
        Link: '',
        notificationCount: 14,
      },
      {
        icon: <BsFillPeopleFill />,
        Link: '',
        notificationCount: null,
      }, {
        icon: <BsFillPeopleFill />,
        Link: '',
        notificationCount: null,
      }
    ]
  }, [])
  const BottomLayoutSm = React.memo(() => {
    return (
      <React.Fragment>
        <div className="fixed bottom-0 z-[99]  drop-shadow-md w-full h-[55px] lg:hidden md:block block pt-2   bg-[#FFFFFF] rounded-md ">
          <div className='grid grid-cols-4'>
            {
              notificationList?.map((icon, i) => (
                <div key={i} className="m-auto px-1" >
                  <Icon notification={icon?.notificationCount}>
                    <IconProvider className={` text-[20px] cursor-pointer `} color={`#6B7A99`}>
                      {icon.icon}
                    </IconProvider>
                  </Icon>
                </div>
              ))
            }
          </div>
        </div>
      </React.Fragment>
    )
  }, []);
  const redirectIT = React.useCallback((e) => {
    if (e) {
      navigate(e);
    }
  }, [navigate])
  const ToggleComponent = React.memo(() => {
    return (
      <React.Fragment>
        {
          SidebarContants?.map((name, i, arr) => (<div onClick={() => redirectIT(name?.link)} className={location?.pathname === name.link ? "text-[#1eb8d2] cursor-pointer" : "text-white cursor-pointer"}><ToggleTxt >{name?.title}</ToggleTxt></div>))
        }
      </React.Fragment>
    )
  })

  return (
    <React.Fragment>
      <div className=" h-[55px] pt-2 m-2 lg:block md:hidden hidden  bg-[#FFFFFF] rounded-md ">
        <div className='grid grid-cols-2'>
          <div>
            <div className='grid grid-cols-7'>
              <div className='col-span-2'>
                <div className='grid h-[100%]'><strong className="m-auto text-secondry-color text-xl">
                  <div className='float-left'><Logo src={logo} style={{ width: "100px" }} /></div>
                </strong>
                </div>
              </div>
              {
                SidebarContants?.slice(0, 4).map((name, i, arr) => (
                  <div key={i} className="relative">
                    <li onClick={() => redirectIT(name?.link)} className={` ${location?.pathname === name?.link ? 'text-primary-color' : 'text-secondry-color '} leading-[40px]  list-none cursor-pointer text-sm  font-bold hover:text-primary-color`}>{name?.title}
                    </li>
                    {
                      <span className=" bg-primary-color text-white font-semibold rounded-md px-1 text-[9px]  absolute top-0 right-[30px] cursor-pointer ">
                        {
                          (<span className="">{name?.tag}</span>)
                        }
                      </span>
                    }
                    <span className="absolute top-0 right-1.5 cursor-pointer ">
                      {
                        (i === arr.length - 1) && (
                          <Tooltip placement="bottom" title={<ToggleComponent />}>
                            <HiOutlineDotsHorizontal />
                          </Tooltip>)
                      }
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
          <div className=''>
            <div className='grid grid-cols-2'>
              <div className=''>
                <SearchBar />
              </div>
              <div className="px-3   ">
                <div className='grid grid-cols-5 gap-4 '>
                  {
                    notificationList?.map((icon, i) => (
                      <div key={i}>
                        <Icon notification={icon?.notificationCount}>
                          <IconProvider className={` text-[20px] cursor-pointer `} color={`#6B7A99`}>
                            {icon.icon}
                          </IconProvider>
                        </Icon>
                      </div>
                    ))
                  }
                  <div className=' ' onClick={() => navigate('/profile')}>
                    <Tooltip placement="bottomRight" title={'Profile'}>
                      <Icon className={" w-[45px] grid h-[45px] rounded-full border  drop-shadow-md cursor-pointer mt-[-3px] border-2 overflow-auto border-primary-color mx-1 relative "} >
                        <IconProvider className={` text-[20px] cursor-pointer `} color={`#6B7A99`}>
                          <img className='border border-1 ' src={ImgProvider(data?.user?.profile?.profile_picture)} alt="loading..." />
                        </IconProvider>
                      </Icon>
                    </Tooltip>
                  </div>
                </div>
                <div >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* sm */}
      <TopLayoutSm />
      {children}
      <BottomLayoutSm />
    </React.Fragment >
  );
}

export default TopHeader;

const ToggleTxt = styled.div`
font-size:13px  !important;
backgroundColor:${(props) => props?.theme?.bg ?? "transparent"};
cursor:pointer ;
`;