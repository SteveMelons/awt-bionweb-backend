import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  AccountCircle,
  Lock,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { login, useMe } from "../api";
import { matchFieldErrors } from "../utils/matchFieldErrors";

interface LoginProps {}

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({}) => {
  const initialFormValues: FormValues = { usernameOrEmail: "", password: "" };
  const [{ data, loading }] = useMe();

  const theme = useTheme();
  const history = useHistory();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClickShowPassword = () => {
    setPasswordVisible((prev) => !prev);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : data?.id ? (
        (() => {
          history.push("/");
          history.go(0);
        })()
      ) : (
        <>
          <Avatar
            sx={{
              margin: theme.spacing(1),
              marginTop: "2em",
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Formik
            initialValues={initialFormValues}
            validationSchema={Yup.object().shape({
              usernameOrEmail: Yup.string().required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              const res = await login(values);
              setSubmitting(false);
              if (res.data.errors) {
                const errors = matchFieldErrors(res.data.errors);
                setErrors(errors);
              } else {
                history.push("/");
                history.go(0);
              }
            }}
          >
            {({ isSubmitting, handleChange, handleBlur, values, errors }) => (
              <Form style={{ width: "100%", maxWidth: "30em" }}>
                <Box mx="1em" display="flex" flexDirection="column">
                  <Box mt="1em" display="flex" flexDirection="column">
                    <TextField
                      name="usernameOrEmail"
                      label="Username or Email"
                      type="text"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.usernameOrEmail}
                      error={errors.usernameOrEmail ? true : false}
                      helperText={errors.usernameOrEmail}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Box>
                  <Box mt="1em" display="flex" flexDirection="column">
                    <TextField
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      label="Password"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password ? true : false}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {passwordVisible ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
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
                  <Link
                    to="/register"
                    style={{
                      color: "inherit",
                      marginTop: "1em",
                      fontSize: "0.9em",
                    }}
                  >
                    Don't have an account yet?
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default Login;
