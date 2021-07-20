import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  AccountCircle,
  Email,
  Lock,
  LockOutlined,
  TextFieldsRounded,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../api";
import { matchFieldErrors } from "../utils/matchFieldErrors";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../utils/validation";

interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const Register: React.FC = () => {
  const history = useHistory();

  const theme = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClickShowPassword = () => {
    setPasswordVisible((prev) => !prev);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const initialFormValues: FormValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
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
          {({ isSubmitting, handleChange, handleBlur, values, errors }) => (
            <Form style={{ width: "100%", maxWidth: "30em" }}>
              <Box mx="1em" display="flex" flexDirection="column">
                <Box mt="1em" display="flex" flexDirection="column">
                  <TextField
                    type="text"
                    name="name"
                    autoComplete="name"
                    label="Full Name"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name ? true : false}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TextFieldsRounded />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Box>
                <Box mt="1em" display="flex" flexDirection="column">
                  <TextField
                    type="text"
                    name="username"
                    autoComplete="off"
                    label="Username"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    error={errors.username ? true : false}
                    helperText={errors.username}
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
                    type="text"
                    name="email"
                    autoComplete="email"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email ? true : false}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
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
                    autoComplete="new-password"
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
                  <TextField
                    type={passwordVisible ? "text" : "password"}
                    name="passwordRepeat"
                    autoComplete="new-password"
                    label="Repeat Password"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordRepeat}
                    error={errors.passwordRepeat ? true : false}
                    helperText={errors.passwordRepeat}
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
      </Grid>
    </Grid>
  );
};

export default Register;
