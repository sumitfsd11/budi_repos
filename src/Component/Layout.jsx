import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AfterLoginHeader , ImgBanner } from 'Component';
import { useAuth } from 'hooks';
import styled from 'styled-components';
import { Outlet } from "react-router-dom";
import { ConfigProvider } from 'antd';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useOnlineStatus } from "hooks"
import noInternt from 'Assets/no-internet.png'
// swiper css 
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const Layout = () => {
  const { session } = useAuth()
  const { isOnline } = useOnlineStatus()
  // const session =true ;
  return (
    <React.Fragment>
      <ConfigProvider theme={{
        token: ''
      }}>
        <Container>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }} />
          {isOnline ?
            session ? (<AfterLoginHeader />) : (<Outlet />)
            : (<ImgBanner><Img src={noInternt} className="lg:w-[35%] mt-6 " alt='loading...' /></ImgBanner>)
          }
        </Container>
      </ConfigProvider>
    </React.Fragment>
  );
}

export default Layout;

const Container = styled.div`
background-color:#f6fbfe !important;
`

const Img = styled.img`
margin:auto;
`;