import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(4, "Too Short")
    .max(16, "Too Long!")
    .required("Required"),
  role: Yup.string().required("Required"),
});
