import React from 'react';
import { useFetch } from 'hooks';
import { Modal, TextFieldArea, InputFieldLatest } from 'Component';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Popconfirm, Skeleton } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { documentValidationSchema } from 'utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
export default function Policy() {
    const [state, SetState] = React.useState(false)
    const [reload, setReload] = React.useState(false)
    const methods = useForm({
        resolver: yupResolver(documentValidationSchema),
        mode: "all",
        defaultValues: {
            title: "",
            content: "",
        }
    })
    const { control, handleSubmit, setValue,
        // formState:  { isDirty, isValid } 
    } = methods;

    const onSuccess = React.useCallback((response) => {
        if (response?.message) {
            if (response?.message === "Privacy Policy updated successfully") {
                toast.success(response?.message)
                setReload(true)
            }
        }
    }, [])
    const onFailure = React.useCallback((error) => {
        if (error?.message) {
            toast.success(error?.message)
        }
    }, [])

    const { isLoading, data, callFetch } = useFetch({
        initialUrl: '/documents/privacy_policy',
        skipOnStart: false,
        config: {
            method: 'get'
        },
        onSuccess,
        onFailure
    })

    React.useEffect(() => {
        if (reload) {
            setReload(false)
            callFetch({
                url:'/documents/privacy_policy',
                method:"get"
            })
        }
    }, [reload , callFetch])

    const onSubmit = React.useCallback((data) => {
        const formData = new FormData()
        console.log(data, "")
        formData.append("title", data?.title);
        formData.append("content", data?.content);
        callFetch({
            url: '/documents/privacy_policy',
            method: "post",
            data: formData
        })
    }, [callFetch])

    React.useEffect(() => {
        if (data) {
            setValue("title", data?.document?.title, {
                isTouched: true,
                isValid: true
            })
            setValue("content", data?.document?.content, {
                isTouched: true,
                isValid: true
            })
        }
    }, [setValue, data])

    const confirm = React.useCallback(() => {
        SetState(true)
    }, [])

    const cancel = React.useCallback(() => {

    }, [])

    return (
        <div>
            <Modal onSubmit={handleSubmit(onSubmit)} title={" Terms & conditions  "} state={state} SetState={SetState}>
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
                            name="content"
                            render={({
                                field,
                                fieldState: { invalid, isTouched, isDirty, error },
                            }) => (
                                <TextFieldArea rows={6} {...field} error={error} name={"content"} placeholder="Message" />
                            )}
                        />
                    </div>
                </FormProvider>
            </Modal>
            <div className='grid grid-cols-12 gap-3'>
                <div className='lg:col-span-3 md:col-span-3 col-span-12'>
                    <BoxCantainer>
                        {
                            isLoading ? (<Skeleton active />) : (
                                <React.Fragment>
                                    <div className='flex justify-between'>
                                        <div className=" font-semibold  text-gray-900 whitespace-no-wrap">
                                            <span className=' px-3 mr-2 rounded-[15px] leading-[18px] text-xs italic font-semibold capitalize bg-[#d4d5d6]'>
                                                Updated at
                                            </span>
                                            <CustomeText style={{ fontWeight: "600", fontSize: "13px" }}>{
                                                moment(data?.data?.updated_at).format('MMMM Do YYYY, h:mm:ss a')
                                            }
                                            </CustomeText>
                                        </div>
                                        <div className='mt-1'>
                                            <Popconfirm
                                                title={<p className='mt-1 text-xs'>Update the policy ?</p>}
                                                description="Are you sure to delete this task?"
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                placement="leftTop"

                                                okText="Update"
                                                cancelText="Cancel"
                                            >
                                                <Status theme={{}}>Update</Status>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </BoxCantainer>

                </div>
                <div className='lg:col-span-9 md:col-span-9 col-span-12'>
                    <BoxCantainer>
                        {
                            isLoading ? (<Skeleton active />) : (
                                <React.Fragment>
                                    <div className=''>
                                    </div>
                                    <section>
                                        <article className='font-semibold mb-2 text-gray-900 '>
                                            <CustomeText style={{ fontWeight: "600", fontSize: "19px" }}>
                                                {data?.document?.title}
                                            </CustomeText>
                                        </article>
                                        <article>
                                            <CustomeText>
                                                {data?.document?.content}
                                            </CustomeText>
                                        </article>
                                    </section>
                                </React.Fragment>
                            )
                        }
                    </BoxCantainer>
                </div>
            </div>
        </div >
    )
}

const Status = styled.button`
background: ${props => props?.theme?.bg ?? 'transparent'};
width: 80px;
color:${props => props?.theme?.color ?? '#1aaac3'};
height: 27px;
border: ${props => props?.theme?.color ?? '1px solid #1aaac3'};
border-radius: 4px;
&:hover{
background:#1aaac3 !important;
color:white !important;
}
`;
const BoxCantainer = styled.div`
background: #FFFFFF;
padding-top:5px;
box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
border-radius: 10px;
padding:10px 15px 15px 15px;
`;

const CustomeText = styled.div`
// font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
color: #6E7079;
`;