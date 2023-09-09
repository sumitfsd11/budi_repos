import React from 'react'
import { Button, Textfield, CheckBox } from 'Component'
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from 'utils/validation';
import { useAuth } from 'hooks';
import { Logo } from 'utils/common.utils';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const methods = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { control, handleSubmit, setError,
    formState: { isDirty, isValid }
  } = methods;

  const onSubmit = React.useCallback((data) => {
    login(data);
  }, [login]);

  React.useEffect(() => {
    if (error) {
      setError('email', { type: 'custom', message: error })
    }
  }, [error , setError])
  return (
    <React.Fragment>
      <div className="grid h-[95vh]">
        <div className="m-auto lg:w-[25%] md:w-[40%] w-[85%]">
          <div className="gird">
            <div className="m-auto">
              <Logo />
            </div>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <span>
                  <Controller
                    control={control}
                    name="email"
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <Textfield type={"Email"} error={error} inputRef={field.ref} {...field} name={"email"} icon={<AiOutlineMail />} placeholder={"Email ID"} className={"w-full pl-6"} />
                    )}
                  />
                </span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <span>
                  <Controller
                    control={control}
                    name="password"
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <Textfield {...field} type={"password"} inputRef={field.ref} error={error} name={"password"} icon={<RiLockPasswordLine />} placeholder={"Password"} className={"w-full pl-6"} />
                    )}
                  />
                </span>
                <div className="flex  justify-between">
                  <label className="label">
                    <span className="label-text-alt mt-[-8px] link link-hover" onClick={() => navigate('/forget-password')}>Forgot password?</span>
                  </label>
                  <div className="flex justify-between">
                    <div className="">
                      <span className="text-xs">Remember me </span>
                    </div>
                    <div className="pt-1 pl-1">
                      <Controller
                        control={control}
                        name="remberme"
                        render={({
                          field,
                          fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                          <CheckBox {...field} inputRef={field.ref} name={"remberme"} className={`checkbox-sm`} />
                        )}
                      />
                    </div>

                  </div>
                </div>
              </div>
              <div className="form-control mt-6">
                <Button className={`w-full bg-primary-color rounded-full btn `} type={'submit'} isLoading={isLoading}
                  isDisabled={!isDirty || !isValid}
                >{'LOGIN'}</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </React.Fragment>
  )
}

