import React from 'react'
import { useFetch } from 'hooks'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment/moment';
import { Skeleton, Tooltip, Popconfirm } from 'antd';
import { Modal, TextFieldArea } from 'Component';
import { InputFieldLatest } from 'Component';
import { BsFillChatTextFill } from "react-icons/bs"
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IconProvider, ImgProvider, TxtCopy } from 'utils/common.utils';
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { ticketReplayValidationSchema } from 'utils/validation';

export default function TicketDetail() {
    const navigate = useNavigate()
    const [state, SetState] = React.useState(false);
    const [reload, setReload] = React.useState(false)
    const { id } = useParams()

    const methods = useForm({
        resolver: yupResolver(ticketReplayValidationSchema),
        mode: "all",
        defaultValues: {
            title: "",
            message: ""
        }
    });
    const { control, handleSubmit,
        // formState: { isDirty, isValid }
    } = methods;

    // const onSuccess = React.useCallback((response) => {
    //     if (response?.message) {
    //         toast.success(response?.message)
    //         navigate('/support')
    //     }
    // }, [navigate])
    // const onFailure = React.useCallback((error) => {
    //     if (error?.message) {
    //         toast.error(error?.message)
    //     }
    // }, [])

    const onSuccess = React.useCallback((response) => {
        if (response?.message === "Successfully replied to support ticket") {
            toast.success(response?.message)
            setReload(true)
        }
    }, [])
    const onFailure = React.useCallback((error) => {
        if (error?.message) {
            toast.error(error?.message)
        }
    }, [])

    const { isLoading, data, callFetch } = useFetch({
        initialUrl: `/support/support_ticket/${id}`,
        skipOnStart: false,
        config: {
            method: 'get'
        },
        onSuccess,
        onFailure,
    });
    // const {  data: dataProfile, callFetch: callFetchSec } = useFetch({
    //     initialUrl: `/user/${data?.support?.user_id}`,
    //     skipOnStart: true,
    //     config: {
    //         method: "get"
    //     },
    //     onSuccess,
    //     onFailure
    // });

    // const userid = React.useMemo(() => {
    //     return data?.support?.user_id ?? null
    // }, [data])
    // React.useEffect(() => {
    //     if (userid) {
    //         callFetchSec({
    //             url: `/user/${userid}`,
    //             method: 'get'
    //         })
    //     }
    // }, [userid])

    const onSubmit = React.useCallback((data) => {
        const formData = new FormData()
        formData.append("message", data?.message)
        formData.append("support_id", id)
        callFetch({
            url: '/support/reply',
            method: 'post',
            data: formData
        })
    }, [callFetch, id]);


    const redirectIT = React.useCallback((e) => {
        if (e) {
            navigate(e)
        }
    }, [navigate])

    const confirmCloseTicket = React.useCallback(() => {
        const data = new FormData();
        data.append("resolved", true);
        callFetch({
            url: `/support/support_ticket/${id}`,
            method: 'put',
            data: data
        })
    }, [callFetch , id])

    const cancel = React.useCallback(() => {
        toast.error("Cancled !")
    }, [])

    const deleteReply = React.useCallback((id) => {
        callFetch({
            url: `/support/support_ticket/${id}`,
            method: 'delete',
        })
    }, [callFetch])

    // for reload 
    React.useEffect(() => {
        if (reload) {
            setReload(false)
            callFetch({
                url:`support/support_ticket/${id}`,
                method:"get"
            })
        }
    }, [reload , callFetch ,id])

    const TabOneRightComponent = React.memo(({props}) => {
        return (
            <React.Fragment>
                <div className="">
                    <Tooltip placement="leftTop" color="black" title={
                        <React.Fragment>
                            <div>
                                <button onClick={()=>deleteReply(props?.id)}>  Delete </button>
                            </div>
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

    return (
        <div>
            <div className='grid grid-cols-12 gap-3'>
                <Modal onSubmit={handleSubmit(onSubmit)} title={" Replay  "} state={state} SetState={SetState}>
                    <FormProvider {...methods}>
                        <div className="grid w-full">

                            <div className='grid grid-cols-12 gap-3'>
                                <div className='col-span-12'>
                                    <Controller
                                        control={control}
                                        name="title"
                                        render={({
                                            field,
                                            fieldState: { invalid, isTouched, isDirty, error },
                                        }) => (
                                            <InputFieldLatest error={error} inputRef={field.ref} {...field} name={"title"} placeholder={"Title "} />
                                        )}
                                    />
                                </div>
                            </div>
                            <Controller
                                control={control}
                                name="message"
                                render={({
                                    field,
                                    fieldState: { invalid, isTouched, isDirty, error },
                                }) => (
                                    <TextFieldArea {...field} error={error} name={"message"} placeholder="Message" />
                                )}
                            />
                        </div>
                    </FormProvider>
                </Modal>
                <div className='lg:col-span-4 md:grid-cols-12 col-span-12'>
                    <BoxCantainer>
                        {
                            isLoading ? (<Skeleton className='m-1' active />) : (
                                <React.Fragment>
                                    <div className=" border-b mb-3 border-[#eae9e9] pb-2 h-auto grid grid-cols-2 gap-2 content-between pt-2">
                                        <div className="">
                                            <div className="float-left cursor-pointer" onClick={() => redirectIT(`/user/${data?.support?.user?.id}`)}>
                                                <div className="flex  ">
                                                    <div className="pt-1">
                                                        <Img src={ImgProvider(data?.support?.user?.profile_picture)} alt="loading.." />
                                                    </div>
                                                    <div>
                                                        <div className="pl-3">
                                                            <Title theme={{ fontSize: "12px" }}>{data?.support?.user?.name}</Title>
                                                            <div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="float-right mt-1">
                                            </div>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className='flex  justify-between pb-2'>
                                        <div className='mb-1'>
                                            <span className=' px-3 mr-2 rounded-[15px] leading-[18px] text-xs italic font-semibold capitalize bg-[#d4d5d6]'>
                                                Created at
                                            </span>
                                            <span className=" font-semibold text-gray-900 whitespace-no-wrap"><CustomeText style={{ fontWeight: "600" }}>{
                                                data?.support?.created_at
                                            }</CustomeText></span>
                                        </div>
                                        {
                                            data?.resolved && (
                                                <div className='mb-1'>
                                                    <span className=' px-3 mr-2 rounded-[15px] leading-[18px] text-xs italic font-semibold capitalize bg-[#d4d5d6]'>
                                                        Closed at
                                                    </span>
                                                    <span className=" font-semibold text-gray-900 whitespace-no-wrap"><CustomeText style={{ fontWeight: "600" }}>{
                                                        moment(data?.created_at).format('MMMM Do YYYY, h:mm:ss a')
                                                    }</CustomeText></span>
                                                </div>
                                            )
                                        }
                                        <div className=''>
                                            {
                                                data?.resolved ? (
                                                    <Status theme={{ border: "1px solid #f72323", bg: '#d8acac', color: "#f72323" }}>Closed</Status>
                                                ) : (
                                                    <Popconfirm
                                                        title={<p className='mt-1 text-xs'>Are you sure to Closed ?</p>}
                                                        description="Are you sure to Closed ?"
                                                        onConfirm={confirmCloseTicket}
                                                        onCancel={cancel}
                                                        placement="leftTop"
                                                        okText="Close"
                                                        cancelText="Cancel"
                                                    >
                                                        <Status theme={{}}>Active</Status>
                                                    </Popconfirm>
                                                )
                                            }


                                        </div>
                                    </div>

                                    <span className="text-gray-900 whitespace-no-wrap "><CustomeText>
                                        <div className=''>
                                            <span className=' px-3 mr-2 rounded-[15px] leading-[18px] text-sm italic capitalize bg-[#d4d5d6]'>
                                                topic
                                            </span>
                                            <span className=' text-[#000] font-semibold italic '>
                                                {
                                                    data?.support?.topic
                                                }
                                            </span>
                                        </div>
                                        <div className='mt-3 mb-2'>
                                            <span className='  px-3 mr-2 rounded-[15px] leading-[18px] text-sm italic capitalize bg-[#d4d5d6]'>
                                                subject
                                            </span>
                                            <span className='italic font-semibold'>
                                                {
                                                    data?.support?.subject
                                                }
                                            </span>
                                        </div>
                                        {data?.support?.message}

                                    </CustomeText>
                                        <div className=' flex justify-between'>
                                            <div>
                                            </div>
                                            <div>
                                                <Status theme={{ bg: "white" }} onClick={() => SetState(true)} >
                                                    <div className='flex justify-between px-2 '>
                                                        <div className=''>
                                                            <IconProvider className={""}>
                                                                <BsFillChatTextFill />
                                                            </IconProvider>
                                                        </div>
                                                        <div className='text-sm mt-[-4px]'>
                                                            Replay
                                                        </div>
                                                    </div>
                                                </Status>
                                            </div>
                                        </div>
                                    </span>
                                </React.Fragment>
                            )
                        }
                    </BoxCantainer>
                </div>
                <div className='lg:col-span-8 md:col-span-12 col-span-12'>
                    <BoxCantainer>
                        {
                            data?.support?.replies.length >= 1 && (
                                <div>
                                    <Status style={{ border: "1px solid transparent" }} theme={{ bg: "white", border: "1px solid transparent" }} onClick={() => SetState(true)} >
                                        <div className='flex justify-between px-2 '>
                                            <div className=''>
                                                <IconProvider className={" text-xl "}>
                                                    <BsFillChatTextFill />
                                                </IconProvider>
                                            </div>
                                            <div className='text-sm  pl-1 mt-[-1px] font-semibold '>
                                                Replies
                                            </div>
                                        </div>
                                    </Status>
                                </div>
                            )
                        }
                        {
                            isLoading ? (<Skeleton className='m-1' active />) : (
                                data?.support?.replies?.map((replayies, index) => (
                                    <div className='border-b mb-3 border-[#eae9e9] pb-2'>
                                        <div className='flex mb-0 justify-between '>
                                            <div className=''>
                                                <span className=" font-semibold text-gray-900 whitespace-no-wrap"><CustomeText style={{ fontWeight: "600" }}>
                                                    {
                                                        replayies?.created_at
                                                    }
                                                </CustomeText></span>
                                            </div>
                                            <div className=''>
                                                <TabOneRightComponent props={replayies}/>
                                            </div>
                                        </div>

                                        <span className="  text-gray-900 whitespace-no-wrap">
                                            <CustomeText>
                                                <div className=' flex justify-between'>
                                                    <div>
                                                        <div className="flex justify-between cursor-pointer  mb-2" onClick={() => redirectIT(`/user/${replayies?.support_id}`)}>
                                                            <div className="pt-1">
                                                                <Img src={replayies?.replied_by?.profile_picture} alt="loading.." />
                                                            </div>
                                                            <div>
                                                                <div className="pl-3 mt-2">
                                                                    <Title theme={{ fontSize: "12px" }}>{replayies?.replied_by?.name}</Title>
                                                                    <div>
                                                                        <span>
                                                                            <Title theme={{ color: "#9295A3", fontSize: "12px" }}>
                                                                                {replayies?.user?.email}
                                                                            </Title>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>

                                                    </div>
                                                </div>

                                                <div className='mb-3'>
                                                    <span onClick={() => TxtCopy(`${index}-ticket`)} className=' cursor-pointer  px-3 mr-2 rounded-[15px] leading-[18px] text-sm italic capitalize bg-[#d4d5d6]'>
                                                        Support ID
                                                    </span>
                                                    <span id={`${index}-ticket`} className=' text-[#000] font-semibold italic '>
                                                        {
                                                            replayies?.support_id
                                                        }
                                                    </span>
                                                </div>
                                                <div className=''>
                                                    <span className='  px-3 mr-2 rounded-[15px] leading-[18px] text-sm italic capitalize bg-[#d4d5d6]'>
                                                        topic
                                                    </span>
                                                    <span className=' text-[#000] font-semibold italic '>
                                                        {
                                                            data?.support?.topic
                                                        }
                                                    </span>
                                                </div>
                                                <div className='mt-3 mb-2'>
                                                    <span className='  px-3 mr-2 rounded-[15px] leading-[18px] text-sm italic capitalize bg-[#d4d5d6]'>
                                                        subject
                                                    </span>
                                                    <span className='italic font-semibold'>
                                                        {
                                                            data?.support?.subject
                                                        }
                                                    </span>
                                                </div>
                                                {replayies?.message}

                                            </CustomeText>
                                        </span>
                                    </div>
                                ))
                            )
                        }
                    </BoxCantainer>
                </div>
            </div>
        </div >
    )
}


const BoxCantainer = styled.div`
background: #FFFFFF;
box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
border-radius: 10px;
padding:15px 15px 15px 15px;
&& @media only screen and (max-width:760px){
  overflow-x:scroll; 
 }
`;
const Status = styled.button`
background: ${props => props?.theme?.bg ?? 'rgba(22, 192, 152, 0.38)'};
width: 80px;
color:${props => props?.theme?.color ?? '#00B087'};
height: 27px;
border: ${props => props?.theme?.border ?? '1px solid #00B087'};
border-radius: 4px;
`;
const CustomeText = styled.div`
// font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
color: #6E7079;
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

