import React from 'react';
// testing 
import styled from "styled-components";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Sidebar = ({ SetMenu, props,
  children
}) => {
  const [toggle, SetToggle] = React.useState(false);
  const navigate = useNavigate();
  const path = useLocation();

  const redirectIT = React.useCallback((e) => {
    try{
    if (e?.link) {
      navigate(e?.link);
      // SetMenu(false)
    }
  }catch(error){

  }
  }, [ navigate ])

  const location = React.useMemo(() => {
    return path?.pathname;
  }, [path?.pathname])

  return (
    <React.Fragment>
      <SidebarContainer>
        <div className='  w-full my-[10px] '>
          <div onClick={() => redirectIT(props)} className={` activeClass flex justify-between transition-opacity hover:bg-primary-color bg-white px-2  py-3 rounded-md ${location === props?.link && 'text-white bg-primary-color activeClass'}`}>
            <div className=''>
              <IconContext.Provider value={{ color: location === props?.link ? 'white' : props?.IconColor, className: " m-auto text-[23px]  font-semibold " }}>
                {props?.icon}
              </IconContext.Provider>
            </div>
            <div className={` hover:text-white font-semibold ${location === props?.link ? 'text-white' : 'text-[#1B263C]'}`}>
              {props?.title}
            </div>
            <div className=' '>
              {
                props?.tag ? (<NewTag>{props?.tag}</NewTag>) :
                  props?.notification && (<NotificationNum style={{ color: location === props?.link ? 'white' : 'black' }}>{props?.notification}</NotificationNum>)
              }
            </div>
            <div className=''>
              {
                props?.child?.length > 0 && (<ToggleBtn onClick={() => SetToggle(!toggle)}>
                  <IconContext.Provider value={{ color: "#C3CAD9", className: "mt-1 m-auto h-full text-[15px] font-semibold " }}>
                    <div>
                      {
                        toggle ? (<BsChevronDown />) : (<BsChevronUp />)
                      }
                    </div>
                  </IconContext.Provider>
                </ToggleBtn>)
              }
            </div>
          </div>
          <div className={` overflow-hidden transition-all duration-700 ${toggle ? 'h-auto' : 'h-[0px]'}`}>{children}</div>
        </div>
      </SidebarContainer>
    </React.Fragment>
  );
}

export default Sidebar;

const ToggleBtn = styled.div`
width:25px;
height:25px;
border-radius:50%;
display:grid;
color:#C3CAD9 !important;
cursor:pointer;
background:transparent;
font-weight:bold;
&:hover:{
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
}

`;

const NotificationNum = styled.div`
width:25px;
text-align:center;
height:25px;
border-radius:50%;
display:grid;
cursor:pointer;
font-size:13px;
padding-top:1px;
background: rgba( 228,226,226, 0.26 ); 
backdrop-filter: blur(9px);

`;
const NewTag = styled.div`
background:#219653;
text-align:center;
border-radius:5px;
display:grid;
padding-left:6px;
padding-bottom:2px;
margin-top:1px;
padding-right:6px;
cursor:pointer;
color:white;
box-shadow: 0px 10px 30px rgba(255, 102, 51, 0.15);
border-radius:15px;
font-weight:medium;
font-size:12px !important;
`;
const SidebarContainer = styled.div`
cursor:pointer;
div {
  &:hover{
    color:whiite !important;
  }import { ImgProvider } from 'utils/common.utils';

}
`;

export const ChildSubMenu = ({ SetMenu, props }) => {
  const navigate = useNavigate();
  const path = useLocation();
  const redirectIT = React.useCallback((e) => {
    if (e?.link) {
      navigate(e?.link);
      SetMenu(false);
    }
  }, [SetMenu, navigate])


  const location = React.useMemo(() => {
    return path?.pathname;
  }, [path?.pathname])

  return (
    <React.Fragment>
      <div className='  w-full my-[10px] '>
        <div onClick={() => redirectIT(props)} className={` activeClass flex justify-between transition-opacity hover:bg-primary-color bg-white px-2  py-3 rounded-md ${location === props?.link && 'text-white bg-primary-color activeClass'}`}>
          <div className=''>
            <IconContext.Provider value={{ color: location === props?.link ? 'white' : props?.IconColor, className: " m-auto text-[23px]  font-semibold " }}>
              {props?.icon}
            </IconContext.Provider>
          </div>
          <div className={` hover:text-white font-semibold ${location === props?.link ? 'text-white' : 'text-[#1B263C]'}`}>
            {props?.title}
          </div>
          <div className=' '>
            {
              props?.tag ? (<NewTag>{props?.tag}</NewTag>) :
                props?.notification && (<NotificationNum style={{ color: location === props?.link ? 'white' : 'black' }}>{props?.notification}</NotificationNum>)
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}


export const ChildSubAgent = React.memo(({ SetMenu, props }) => {

  const navigate = useNavigate();
const path = useLocation();
  const redirectIT = React.useCallback((e) => {
    if (e) {
      navigate(e);
      SetMenu(false);
    }
  }, [SetMenu, navigate])

  const location = React.useMemo(() => {
  return path?.pathname ;
  } , [ path?.pathname])

  const LiveMode = React.memo((props) => (
    <React.Fragment>
      <div className="my-[10px]">
        <div className={`flex items-stretch my-2 `} >
          <span className={` w-[15px] h-[15px] rounded-full grid bg-pink`}>
            <span className={` w-[9px] h-[9px] rounded-full m-auto bg-white  `}></span>
          </span>
          <span className="text-xs">
            &nbsp;
            wait
          </span>
        </div>
      </div>
    </React.Fragment>
  ))
  return (
    <React.Fragment>
      <div onClick={() => redirectIT(props?.link)} className={`my-[10px] agent grid grid-cols-3 gap-2 place-items-center  transition-opacity hover:bg-primary-color ${location === props?.link && 'text-white bg-primary-color activeClass'} bg-white px-0  py-1 rounded-md`}>
        <ImgIcon src={props?.img} alt="loading..." />
        <div className={`w-full  font-semibold inline text-sm break-normal ${location === props?.link ? 'text-white' : ' text-[#6B7A99]'} `} style={{ fontSize: "14px" }}>
          {props?.name}
        </div>
        <div className=' w-full'>
          <LiveMode />
        </div>
      </div>
    </React.Fragment>
  )
});

const ImgIcon = styled.img`
width:42px;
height:42px;
border-radius:3px;
`;