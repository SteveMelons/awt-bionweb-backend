import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import {
  AccountCircle,
  Email,
  Lock,
  LockOutlined,
  TextFields,
  TextFieldsRounded,
} from "@material-ui/icons";
import { register, useMe } from "../api";
import { matchFieldErrors } from "../utils/matchFieldErrors";
import { Link, useHistory } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../utils/validation";
import * as Yup from "yup";

interface RegisterProps {}

interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    marginTop: "2em",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Register: React.FC<RegisterProps> = ({}) => {
  const [{ data, loading }] = useMe();
  const history = useHistory();

  const classes = useStyles();

  const initialFormValues: FormValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
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
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Formik
            initialValues={initialFormValues}
            validationSchema={Yup.object().shape({
              name: validateName(),
              username: validateUsername(),
              email: validateEmail(),
              password: validatePassword(),
              passwordRepeat: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              const { passwordRepeat, ...args } = values;
              const res = await register(args);
              setSubmitting(false);
              if (res.data.errors.length > 0) {
                const errors = matchFieldErrors(res.data.errors);
                setErrors(errors);
              } else {
                history.push("/profile");
                history.go(0);
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
                      name="name"
                      label="Full Name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TextFieldsRounded />
                          </InputAdornment>
                        ),
                        fullWidth: true,
                      }}
                    />
                  </Box>
                  <Box mt="1em" display="flex" flexDirection="column">
                    <Field
                      component={TextField}
                      type="text"
                      name="username"
                      label="Username"
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
                      type="text"
                      name="email"
                      label="Email"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
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
                    <Field
                      component={TextField}
                      type="password"
                      name="passwordRepeat"
                      label="Repeat Password"
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
                  <Link
                    to="/login"
                    style={{
                      color: "inherit",
                      marginTop: "1em",
                      fontSize: "0.9em",
                    }}
                  >
                    Already have an account?
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

export default Register;
