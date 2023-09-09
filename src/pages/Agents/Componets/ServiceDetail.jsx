import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';
import { useFetch } from 'hooks';
import { enLangauge } from 'Contents/en-langauge';
import {  ImgProvider, redirectOut, phoneFormat, numberFormatter } from 'utils/common.utils';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, HashNavigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function ServiceDetail() {
    const { id } = useParams()
    const onSuccess = React.useCallback((response) => {
    }, [])
    const onFailure = React.useCallback((error) => {
    }, [])
    const { isLoading, data } = useFetch({
        initialUrl: `/offers/${id}`,
        skipOnStart: false,
        onSuccess,
        onFailure
    });

    return (
        <div>
            <div className=' grid lg:grid-cols-12 md gap-3'>
                <div className='lg:col-span-4 md:col-span-12 col-span-12'>
                    <BoxCantainer>
                        {
                            isLoading ? (
                                <Skeleton acitive />
                            ) : (
                                <div className=" h-auto grid grid-cols-2 gap-2 content-between pt-2">
                                    <div className="">
                                        <div className="float-left">
                                            <div className="flex  ">
                                                <div className="pt-1">
                                                    <Img src={ImgProvider(data?.offer?.created_by?.profile_picture)} alt="loading.." />
                                                </div>
                                                <div>
                                                    <div className="pl-3 mt-2">
                                                        <Title style={{ fontSize: "12px" }}>{data?.offer?.created_by?.name}</Title>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="float-right mt-1">
                                            <Status>{enLangauge.AGENT_DETAIL_ACTIVE}</Status>
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
                                                        {data?.user ? phoneFormat(9621144328, "+11") : '--'}
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
                                                        {data?.user?.email ?? '--'}
                                                    </Title>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </BoxCantainer>
                </div>
                <div className=' lg:col-span-8 md:col-span-12 col-span-12'>
                    <BoxCantainer>
                        {isLoading ? (
                            <Skeleton active shape={'circle'} />
                        ) :
                            data?.offer?.offer_images?.length >= 1 && (
                                <Swiper
                                    spaceBetween={30}
                                    hashNavigation={{
                                        watchState: true,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Pagination, Navigation, HashNavigation]}
                                    className="mySwiper"
                                >
                                    {
                                        data?.offer?.offer_images.map((data, index) => (
                                            <SwiperSlide key={index} data-hash={`slide1 ${index}`}><img className='w-full h-auto' src={data} alt="loading..." /></SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            )
                        }
                        <div className=' grid lg:grid-cols-12 gap-3'>
                            <div className='lg:col-span-3 md:col-span-3 col-span-12'>
                                <div className='flex justify-between'>
                                    <div className=''>
                                        <span>
                                            <Title theme={{ color: "#9295A3", fontSize: "12px", fontWeight: "600" }}>
                                                Category
                                            </Title>
                                        </span>
                                        <span>
                                            <Title theme={{ color: "black", fontSize: "12px", fontWeight: "600" }}>
                                                {data?.offer?.category?.name}
                                            </Title>
                                        </span>
                                    </div>

                                    <div className=''>
                                        <span>
                                            <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                                                Created At
                                            </Title>
                                        </span>
                                        <span>
                                            <Title theme={{ color: "black", fontSize: "12px" }}>
                                                {data?.offer?.created_at}
                                            </Title>
                                        </span>
                                    </div>


                                </div>
                                <div className=''>
                                    <span>
                                        <Title theme={{ color: "#6fcf97", fontSize: "18px" }} style={{ fontWeight: "600" }}>
                                            Price
                                        </Title>
                                    </span>
                                    <span>
                                        <Title style={{ fontWeight: "600" }} theme={{ color: "black", fontSize: "15px" }} >
                                            {numberFormatter(data?.offer?.price, true)}
                                        </Title>
                                    </span>
                                </div>
                            </div>

                            <div className='lg:col-span-9 md:col-span-9 col-span-12'>

                                <div className=''>
                                    <span>
                                        <Title theme={{ color: "black", fontSize: "22px", }} style={{ fontWeight: "600" }}>
                                            {data?.offer?.title}
                                        </Title>
                                    </span>
                                    <span>
                                        <Title theme={{ color: "black", fontSize: "15px" }}>
                                            {data?.offer?.body}
                                        </Title>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </BoxCantainer>
                </div>
            </div>
        </div>
    )
}


const BoxCantainer = styled.div`
background: #FFFFFF;
box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
border-radius: 10px;
padding:15px 15px 15px 15px;
`;

const Title = styled.div`
// font-family: 'Open Sans';
font-style: normal;
margin-bottom:0.5px;
font-weight: 400;
font-size: ${porps => porps?.theme?.fontSize ?? '14px'};
color: ${props => props?.theme?.color ?? '#9295A3'};

`;

const Img = styled.img`
width: 45px;
height: 45px;
border-radius:3px;
`;

const Status = styled.button`
width: 56px;
background: ${props => props?.theme?.bg ?? '#6FCF97'};
color:#fff;
border-radius: 8px;
padding:2px 5px;
`;