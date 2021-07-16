import * as Yup from "yup";

export const validateName = () => {
  return Yup.string().min(3, "Minimum of 3 characters").required("Required");
};

export const validateUsername = () => {
  return Yup.string()
    .min(3, "Minimum of 3 characters")
    .max(12, "Maximum of 12 characters")
    .required("Required");
};

export const validateEmail = () => {
  return Yup.string().email("Invalid email address").required("Required");
};

export const validatePassword = () => {
  return Yup.string()
    .min(5, "Minimum of 5 characters")
    .max(30, "Maximum of 30 characters")
    .required("Required");
};
