import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, InputAdornment, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { AccountCircle, Lock } from "@material-ui/icons";
import { login } from "../api";
import { matchFieldErrors } from "../utils/matchFieldErrors";

interface LoginProps {}

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({}) => {
  const initialFormValues: FormValues = { usernameOrEmail: "", password: "" };

  return (
    <>
      <Formik
        initialValues={initialFormValues}
        validate={(values) => {
          const errors: Partial<FormValues> = {};
          // errors.usernameOrEmail = "somef sdcjandjsvg";
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const res = await login(values);
          setSubmitting(false);
          if (res.data.errors) {
            const errors = matchFieldErrors(res.data.errors);
            setErrors(errors);
          } else {
            console.log(res.data.id);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: "100%", maxWidth: "30em" }}>
            <Box mx="1em" display="flex" flexDirection="column">
              <Box mt="1em" display="flex" flexDirection="column">
                <Field
                  component={TextField}
                  type="text"
                  name="usernameOrEmail"
                  label="Username or Email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    fullWidth: true,
                  }}
                />
              </Box>
              <Box mt="1em" display="flex" flexDirection="column">
                <Field
                  component={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box mt="1em" display="flex" flexDirection="column">
                {isSubmitting && <LinearProgress color="secondary" />}
              </Box>
              <Box mt="1em" display="flex" flexDirection="column">
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
