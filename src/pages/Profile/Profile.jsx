import React from 'react'
import styled from 'styled-components';
import { useFetch, useAuth } from 'hooks';
import { toast } from 'react-hot-toast';
import {Popconfirm} from "antd"
import { Button, Modal, InputFieldLatest } from 'Component';
import { FormProvider, Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Skeleton } from 'antd';
import { changePasswordValidationSchema } from 'utils/validation';
import { enLangauge } from 'Contents/en-langauge';
export default function Profile() {
    const { userValue, logout } = useAuth()
    let [imgUrl, SetImgUrl] = React.useState(null);
    const [reload, SetReload] = React.useState(false)
    const [haveToshare, SetShare] = React.useState(false);

    const methods = useForm({
        resolver: yupResolver(changePasswordValidationSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const { control, handleSubmit,
        //  formState: {  isDirty, isValid   }
     } = methods

    const onSuccess = React.useCallback((response) => {
        if (response?.message) {
            toast.success(response?.message)
            SetReload(true)
        }
    }, [])

    const onFailure = React.useCallback((error) => {
        toast.error(error?.message)
    }, [])

    const { isLoading, data, callFetch } = useFetch({
        initialUrl: `/user/${userValue?.id}`,
        skipOnStart: false,
        config: {
            method: 'get'
        }
        ,
        onSuccess,
        onFailure
    })
    const onProfileUpload = React.useCallback((e) => {
        const formData = new FormData();
        if (e.target.files[0]) {
            formData.append("profile_picture", e.target.files[0]);
            SetImgUrl(e.target.files[0]);
            callFetch({
                url: `/user/update_profile/${userValue?.id}`,
                method: "post",
                data: formData,
            })
        }
    }, [callFetch , userValue]);

    const onSubmit = React.useCallback((data) => {
        const formData = new FormData()
        formData.append("password", data?.password)
        formData.append("password_confirmation", data?.confirmPassword)
        callFetch({
            url: `/user/update_password/${userValue?.id}`,
            method: "post",
            data: formData,
        })
    }, [callFetch, userValue])

    const changePasswordModal = React.useCallback(() => {
        SetShare(true)
    }, [])

    React.useEffect(() => {
        if (reload) {
            callFetch({
                url: `/user/${userValue?.id}`,
                method: 'get'
            })
            SetReload(false)
        }
    }, [callFetch, reload , userValue?.id])

    return (
        <div>
            <Modal onSubmit={handleSubmit(onSubmit)} title={enLangauge?.PROFILE_CHANEG_PASSWORD} state={haveToshare} SetState={SetShare}>
                <div className="grid w-full">
                    <FormProvider {...methods}>
                        <form  >
                            <div className='my-3'>
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({
                                        field,
                                        fieldState: { invalid, isTouch, isDirty, error }
                                    }) => (
                                        <InputFieldLatest error={error}  {...field} name={"password"} placeholder={enLangauge?.PROFILE_FIELD_PASSWORD} />
                                    )} />
                            </div>
                            <div className='my-3'>
                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    render={({
                                        field,
                                        fieldState: { invalid, isTouch, isDirty, error }
                                    }) => (
                                        <InputFieldLatest error={error}  {...field} name={"confirmPassword"} placeholder={enLangauge?.PROFILE_FIELD_PASSWORD_CONFIRM} />
                                    )} />
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </Modal >
            <BoxCantainer>
                {
                    isLoading ? (<Skeleton active />) : (
                        <div className='flex lg:justify-between md:justify-between justify-between '>
                            <div className='grid'>
                                <div className='m-auto'>
                                    <section>
                                        <CustomeLabel theme={{ fontSize: "17px", fontWeight: "500" }}>{data?.user?.name}</CustomeLabel>
                                        <CustomeLabel theme={{ fontSize: "14px", fontWeight: "500" }}>{enLangauge?.PROFILE_USER_EMAIL} : {data?.user?.email}</CustomeLabel>
                                        <CustomeLabel theme={{ fontSize: "14px", fontWeight: "500" }}>{enLangauge?.PROFILE_USER_ROLE} : {data?.user?.role}</CustomeLabel>
                                        <CustomeLabel theme={{ fontSize: "14px", fontWeight: "500"  }} style={{ cursor:"pointer"}} >
                                            <Popconfirm
                                                title="Are you sure want ot logout  ?"
                                                description="Are you sure want ot logout ?"
                                                onConfirm={logout}
                                                placement={"right"}
                                                onCancel={()=>console.log("")}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                {enLangauge.PROFILE_USER_LOGOUT}
                                            </Popconfirm>
                                        </CustomeLabel>
                                    </section>
                                    <div className='mt-[30px]'>
                                        <Button isLoading={isLoading} onClick={changePasswordModal} className=' hover:bg-primary-color hover:text-white py-1 mx-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 border border-primary-color  shadow rounded-full'
                                            type={'button'}
                                        >{'CHANGES PASSWORD'}</Button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ProfileImage>
                                    <Image src={imgUrl ? URL.createObjectURL(imgUrl) : data?.user?.profile?.profile_picture} />
                                    <FileInput type="file" onChange={onProfileUpload} />
                                </ProfileImage>
                                <ImageUplaodText onChange={onProfileUpload} >
                                    <CustomeLabel theme={{ fontSize: "15px", fontFamily: "normal" }}>Upload Image</CustomeLabel>
                                </ImageUplaodText>
                                {data?.profile?.profile_picture}
                            </div>
                        </div>
                    )
                }
            </BoxCantainer>
        </div>
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

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 5px;
`;

const ProfileImage = styled.label`
  width: 150px;
  height: auto;
  cursor:pointer ;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInput = styled.input`
  display: none;
`;

const ImageUplaodText = styled.div`
  font-family: "Raleway";
  display:block;
  text-align:center;
  width:100%;
  font-style: normal;
  text-decoration:uderline;
  color:#0052cc ;
  font-weight: 600;
  cursor:none; 
  font-size: 16px;
  line-height: 30px;
`;

const CustomeLabel = styled.div`
// font-family: ${props => props?.theme?.fontFamily ?? 'Open Sans'};
// font-style: ${props => props?.theme?.fontStyle ?? 'normal'};
font-weight: ${props => props?.theme?.fontWeight ?? '700'};
font-size: ${props => props?.theme.fontSize ?? '13px'};
color: ${props => props?.theme?.color ?? '#4D5E80'};
`;