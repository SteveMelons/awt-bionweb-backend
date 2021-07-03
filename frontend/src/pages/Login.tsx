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
import { AccountCircle, Lock, LockOutlined } from "@material-ui/icons";
import { login, useMe } from "../api";
import { matchFieldErrors } from "../utils/matchFieldErrors";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

interface LoginProps {}

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    marginTop: "2em",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Login: React.FC<LoginProps> = ({}) => {
  const initialFormValues: FormValues = { usernameOrEmail: "", password: "" };
  const [{ data, loading }] = useMe();

  const classes = useStyles();

  const history = useHistory();

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
