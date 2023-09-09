import React from 'react';
// import { NavLink } from "react-router-dom";
const Icon = ({
  className,
  children,
  link,
  notification,
  ...props
}) => {

  return (
    <React.Fragment>
      <div className={` w-[40px] grid h-[40px]   mx-1 relative`}>
        {
          notification && (<span className="absolute rounded-full  top-[-2px] bg-primary-color  text-white text-xs font-semibold right-[-15px]  p-[4px] z-[2]">{notification}</span>)
        }
        {/* <NavLink to="" className={(isActive) => isActive ? 'activeclassANme' : ''}> */}
        <div className={className ?? `w-[40px] grid h-[40px] rounded-full bg-[#c5d4ed] cursor-pointer hover:bg-primary-color overflow-auto`}>
          <div className="m-auto">
            {
              children
            }
          </div>
        </div>
        {/* </NavLink> */}
      </div>
    </React.Fragment>
  );
}

export default Icon;
