import { FieldError } from "./types/errors";
import * as Yup from "yup";

export const validateName = async (
  username: string
): Promise<FieldError | null> => {
  const schema = Yup.string()
    .min(3, "Minimum of 3 characters")
    .required("Required");

  try {
    await schema.validate(username);
  } catch (error) {
    return { field: "username", msg: error.message };
  }

  return null;
};

export const validateUsername = async (
  username: string
): Promise<FieldError | null> => {
  const schema = Yup.string()
    .min(3, "Minimum of 3 characters")
    .max(12, "Maximum of 12 characters")
    .required("Required");

  try {
    await schema.validate(username);
  } catch (error) {
    return { field: "username", msg: error.message };
  }

  return null;
};

export const validateEmail = async (
  email: string
): Promise<FieldError | null> => {
  const schema = Yup.string()
    .email("Invalid email address")
    .required("Required");

  try {
    await schema.validate(email);
  } catch (error) {
    return { field: "email", msg: error.message };
  }

  return null;
};

export const validatePassword = async (
  password: string
): Promise<FieldError | null> => {
  const schema = Yup.string()
    .min(5, "Minimum of 5 characters")
    .max(30, "Maximum of 30 characters")
    .required("Required");

  try {
    await schema.validate(password);
  } catch (error) {
    return { field: "password", msg: error.message };
  }

  return null;
};
