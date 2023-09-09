import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Username  is required ").email("Email is invalid"),
  password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password must not exceed 40 characters")
});

const emailValidationSchema = yup.object().shape({
email:yup.string().email().required("")
})

const ticketReplayValidationSchema = yup.object({
  title:yup.string("Please provide valide value").required("Please provide valide value"),
  message:yup.string("Please provide valide value").required("Please provide valide value")
})

const documentValidationSchema = yup.object({
  title:yup.string('string type value').required('it is required '),
  content:yup.string('string type value').required('it is required ')
})

const changePasswordValidationSchema = yup.object({
  password: yup.string()
    .required("Current Password is required")
    .min(6, "Current Password must be at least 6 characters")
    .max(40, "Current Password must not exceed 40 characters"),
    confirmPassword: yup.string().oneOf(
    [yup.ref("password"), null],
    "New Password and Confirm password must match"
  ),
})
export {
  loginValidationSchema,
  emailValidationSchema,
  ticketReplayValidationSchema,
  documentValidationSchema,
  changePasswordValidationSchema

};





