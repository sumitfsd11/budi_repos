import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Button, Textfield, CheckBox } from "Component";
import { useNavigate } from "react-router-dom";
export default function OfferAction() {
  const navigate = useNavigate();
  const methods = useForm({
    // resolver:
    mode: "all",
    // defaultValues:{}
  });
  const onSuccess = React.useCallback(() => {}, []);

  const onFailure = React.useCallback(() => {}, []);
  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty, isValid },
  } = methods;

  const { isLoading, callFetch } = useFetch({
    initialUrl: "/login/",
    skipOnStart: true,
    onFailure,
    onSuccess,
  });

  const onSubmit = React.useCallback(() => {}, []);

  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div className="">
        <FormProvider {...methods}>
          <formn onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <div className="">
                {/*  */}
                <Controller
                  control={control}
                  name="name"
                  render={({
                    field,
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <Textfield
                      type={""}
                      error={error}
                      inputRef={field.ref}
                      {...field}
                      name={"name"}
                      className={"w-full pl-6"}
                    />
                  )}
                />
                {/*  */}
              </div>
            </div>
            <div className="form-control">
              <div className=""></div>
            </div>
            <div className="form-control mt-6">
              <Button
                className={`w-full bg-primary-color rounded-full btn `}
                type={"submit"}
                isLoading={isLoading}
                isDisabled={!isDirty || !isValid}
              >
                {"LOGIN"}
              </Button>
            </div>
          </formn>
        </FormProvider>
      </div>
    </React.Fragment>
  );
}
