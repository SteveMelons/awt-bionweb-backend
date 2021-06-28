import { FormikErrors } from "formik";
import { FieldError } from "../types/errors";

export const matchFieldErrors = <FormValues>(
  errRes: FieldError[]
): FormikErrors<FormValues> => {
  let errors: FormikErrors<FormValues> = {};
  errRes.forEach((errResField) => {
    (errors as any)[errResField.field] = errResField.msg;
  });
  return errors;
};
