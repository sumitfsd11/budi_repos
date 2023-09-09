import React from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useAuth } from "hooks";
import { RiLockPasswordLine } from 'react-icons/ri';
import { Textfield, Button } from 'Component';
import { Logo } from 'utils/common.utils';
const VerifyOtp = () => {
  const { isLoading } = useAuth();
  const methods = useForm({
    default: {
      otp: ""
    }
  });
  const { control, handleSubmit, formState: { isDirty, isValid }
  } = methods;

  const onSubmit = React.useCallback((data) => {

  }, [])

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
                      <Textfield type={"Email"} error={error} inputRef={field.ref} {...field} name={"email"} icon={<RiLockPasswordLine />} placeholder={"Email ID"} className={"w-full pl-6"} />
                    )}
                  />
                </span>
              </div>
              <div className="form-control mt-6">
                <Button className={`w-full bg-primary-color rounded-full `} type={'submit'} isLoading={isLoading}
                  isDisabled={!isDirty || !isValid}
                >{'VERIFY OTP'}</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VerifyOtp;
