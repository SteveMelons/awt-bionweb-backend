import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Favorite, Mail, WhatsApp } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import {
  addFavorite,
  BasicEntity,
  updateUser,
  useGetFilters,
  useGetUserById,
  useMe,
} from "../api";
import Chat from "../components/Chat";
import MultiAutoComplete from "../components/MultiAutoComplete";
import SingleAutoComplete from "../components/SingleAutoComplete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      paddingTop: "1em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    card: {
      alignItems: "center",
      borderRadius: theme.spacing(3),
    },
    gridAvatar: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    avatar: {
      background: "linear-gradient(60deg, #1e78c8, #07b39b)",
      border: "3px solid",
      borderColor: theme.palette.secondary.light,
    },
    gridTopTable: {
      alignItems: "left",
      display: "flex",
      flexDirection: "column",
      justifyContent: "right",
      //to add space
      marginTop: "180px",
      marginBottom: "40px",
    },

    gridTable: {
      alignItems: "left",
      display: "flex",
      flexDirection: "column",
      justifyContent: "right",
    },

    table: {
      width: "100%",
      maxWidth: "40em",
      border: "2px solid linear-gradient()",
      borderRadius: "15px",
    },

    space: {
      marginTop: theme.spacing(0),
    },
    info: {
      marginTop: theme.spacing(0),
      fontSize: 18,
      fontFamily: "sans-serif",
    },
    general: {
      marginTop: "5px",
      display: "flex",
      flexDirection: "row",
      alignItems: "left",
    },

    grid: {
      marginTop: "0px",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
    },
  })
);

interface FormValues {
  avatar: string;
  mobile: string;
  university: BasicEntity;
  studyprogram: BasicEntity;
  preferences: BasicEntity[];
  skills: BasicEntity[];
  languages: BasicEntity[];
  courses: BasicEntity[];
  bio: string;
}

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const id = new URLSearchParams(useLocation().search).get("id") as any;

  const [{ data: meData, loading: meLoading }] = useMe();
  const [{ data: userData, loading: userLoading }] = useGetUserById(id);
  const [{ data: filtersData }] = useGetFilters();

  const [editState, setEditState] = useState(false);

  const [openState, setOpenState] = useState(true);

  const history = useHistory();

  const classes = useStyles();

  const self = () => {
    if (meData?.id && userData?.id) {
      return meData.id === userData.id;
    }
    return false;
  };

  return (
    <>
      {meLoading ? (
        <h1>Loading...</h1>
      ) : !meData?.id ? (
        (() => {
          history.push("/");
          history.go(0);
        })()
      ) : userLoading ? (
        <h1>Loading</h1>
      ) : !userData ? (
        <h1>Error</h1>
      ) : (
        <Formik
          initialValues={
            {
              avatar: userData.avatar || "",
              mobile: userData.mobile || "",
              university: userData.university || { id: "", name: "" },
              studyprogram: userData.studyprogram || { id: "", name: "" },
              preferences: userData.preferences || [],
              skills: userData.skills || [],
              languages: userData.languages || [],
              courses: userData.courses || [],
              bio: userData.bio || "",
            } as FormValues
          }
          validationSchema={Yup.object().shape({
            avatar: Yup.string(),
            mobile: Yup.string(),
            bio: Yup.string(),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            await updateUser({ ...values });

            history.go(0);

            // if (res.data.errors.length > 0) {
            //   const errors = matchFieldErrors(res.data.errors);
            //   setErrors(errors);
            // }

            setSubmitting(false);
          }}
        >
          {({
            isSubmitting,
            setValues,
            handleChange,
            handleBlur,
            values,
            errors,
            submitForm,
          }) => (
            <>
              {/* CHAT */}
              {!self() && (
                <Paper
                  elevation={3}
                  sx={{
                    position: "fixed",
                    zIndex: "2000",
                    maxWidth: "25em",
                    width: "100%",
                    maxHeight: openState ? "30em" : "3em",
                    height: "100%",
                    backgroundImage:
                      'url("https://i.redd.it/qwd83nc4xxf41.jpg")',
                    backgroundSize: "contain",
                    bottom: "0",
                    right: "0",
                    overflow: "hidden",
                    borderRadius: "5px",
                  }}
                >
                  <Chat
                    profileId={userData.id}
                    open={openState}
                    setOpen={setOpenState}
                  />
                </Paper>
              )}
              {self() && !editState && (
                <Button
                  sx={{ marginTop: "2em" }}
                  onClick={() => {
                    if (filtersData) setEditState(true);
                  }}
                >
                  Edit Profile
                </Button>
              )}
              <div className={classes.root}>
                <Card className={classes.card}>
                  <CardContent>
                    {/* Header image */}
                    <Grid className={classes.gridAvatar} mb="2em" item xs={12}>
                      <Avatar
                        src={userData.avatar}
                        alt={userData.username}
                        className={classes.avatar}
                        sx={{ width: 120, height: 120 }}
                      />
                      {editState && (
                        <Box mt="1em" display="flex" flexDirection="column">
                          <TextField
                            type="text"
                            name="avatar"
                            autoComplete="off"
                            label="Avatar URL"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.avatar}
                            error={errors.avatar ? true : false}
                            helperText={errors.avatar}
                          />
                        </Box>
                      )}
                    </Grid>

                    <Grid container spacing={0}>
                      <Grid className={classes.general} item xs={12} md={6}>
                        <Container className={classes.info}>
                          <Typography sx={{ marginBottom: "1em" }}>
                            @{userData.username}
                          </Typography>
                          <Typography sx={{ marginBottom: "1em" }}>
                            {userData.name}
                          </Typography>
                        </Container>
                      </Grid>

                      <Grid className={classes.general} item xs={12} md={6}>
                        <Container className={classes.info}>
                          {editState ? (
                            <Box mt="1em" display="flex" flexDirection="column">
                              <TextField
                                type="text"
                                name="bio"
                                autoComplete="off"
                                label="Bio"
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.bio}
                                error={errors.bio ? true : false}
                                helperText={errors.bio}
                              />
                            </Box>
                          ) : (
                            values.bio
                          )}
                        </Container>
                      </Grid>
                    </Grid>

                    <Grid container mt="2em" spacing={3}>
                      {/* Details */}
                      <Grid className={classes.gridTable} item xs={12}>
                        <Typography variant="h5">Details</Typography>
                      </Grid>

                      <Grid className={classes.grid} item xs={12} sm={6} md={4}>
                        <TableContainer
                          component={Paper}
                          className={classes.table}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  style={{
                                    fontWeight: "bold",
                                    fontStyle: "Times",
                                    fontSize: "15px",
                                  }}
                                  align="center"
                                >
                                  Joined{" "}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="center">
                                  {new Date(
                                    userData.createdAt
                                  ).toLocaleDateString()}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>

                      <Grid className={classes.grid} item xs={12} sm={6} md={4}>
                        <TableContainer
                          component={Paper}
                          className={classes.table}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  style={{
                                    fontWeight: "bold",
                                    fontStyle: "Times",
                                    fontSize: "15px",
                                  }}
                                  align="center"
                                >
                                  E-Mail{" "}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="center">
                                  {userData.email}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>

                      <Grid className={classes.grid} item xs={12} sm={6} md={4}>
                        <TableContainer
                          component={Paper}
                          className={classes.table}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  style={{
                                    fontWeight: "bold",
                                    fontStyle: "Times",
                                    fontSize: "15px",
                                  }}
                                  align="center"
                                >
                                  Mobile
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="center">
                                  {editState ? (
                                    <Box
                                      mt="1em"
                                      display="flex"
                                      flexDirection="column"
                                    >
                                      <TextField
                                        type="text"
                                        name="mobile"
                                        autoComplete="off"
                                        label="Mobile"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.mobile}
                                        error={errors.mobile ? true : false}
                                        helperText={errors.mobile}
                                      />
                                    </Box>
                                  ) : (
                                    values.mobile
                                  )}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>

                      <Grid className={classes.grid} item xs={12} sm={6} md={4}>
                        <TableContainer
                          component={Paper}
                          className={classes.table}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  style={{
                                    fontWeight: "bold",
                                    fontStyle: "Times",
                                    fontSize: "15px",
                                  }}
                                  align="center"
                                >
                                  University
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="center">
                                  {editState ? (
                                    <Box
                                      mt="1em"
                                      display="flex"
                                      flexDirection="column"
                                    >
                                      <SingleAutoComplete
                                        label="University"
                                        getOptions={async () => {
                                          return filtersData!.university;
                                        }}
                                        onChange={(newVal) => {
                                          setValues((prev) => {
                                            const newState = Object.assign(
                                              {},
                                              prev
                                            );
                                            newState.university = newVal;
                                            return newState;
                                          });
                                        }}
                                        preSelected={values.university}
                                      />
                                    </Box>
                                  ) : (
                                    values.university?.name
                                  )}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>

                      <Grid className={classes.grid} item xs={12} sm={6} md={4}>
                        <TableContainer
                          component={Paper}
                          className={classes.table}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  style={{
                                    fontWeight: "bold",
                                    fontStyle: "Times",
                                    fontSize: "15px",
                                  }}
                                  align="center"
                                >
                                  Study Program
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="center">
                                  {editState ? (
                                    <Box
                                      mt="1em"
                                      display="flex"
                                      flexDirection="column"
                                    >
                                      <SingleAutoComplete
                                        label="Study Program"
                                        getOptions={async () => {
                                          return filtersData!.studyprogram;
                                        }}
                                        onChange={(newVal) => {
                                          setValues((prev) => {
                                            const newState = Object.assign(
                                              {},
                                              prev
                                            );
                                            newState.studyprogram = newVal;
                                            return newState;
                                          });
                                        }}
                                        preSelected={values.studyprogram}
                                      />
                                    </Box>
                                  ) : (
                                    values.studyprogram?.name
                                  )}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                    <Grid container mt="2em" spacing={3}>
                      {/* Bottom Row */}
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{ padding: "0 1em" }}
                      >
                        <Typography variant="h5">Courses</Typography>

                        <List>
                          <Box mt="1em" display="flex" flexDirection="column">
                            {editState ? (
                              <Box>
                                <MultiAutoComplete
                                  label="Courses"
                                  getOptions={async () => {
                                    return filtersData!.courses;
                                  }}
                                  onChange={(newVal) => {
                                    setValues((prev) => {
                                      const newState = Object.assign({}, prev);
                                      newState.courses = newVal;
                                      return newState;
                                    });
                                  }}
                                  preSelected={values.courses}
                                />
                              </Box>
                            ) : (
                              userData &&
                              userData.courses?.map((course) => (
                                <ListItem key={course.id}>
                                  {course.name}
                                </ListItem>
                              ))
                            )}
                          </Box>
                        </List>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{ padding: "0 1em" }}
                      >
                        <Typography variant="h5">Languages</Typography>

                        <List>
                          <Box mt="1em" display="flex" flexDirection="column">
                            {editState ? (
                              <Box>
                                <MultiAutoComplete
                                  label="Languages"
                                  getOptions={async () => {
                                    return filtersData!.languages;
                                  }}
                                  onChange={(newVal) => {
                                    setValues((prev) => {
                                      const newState = Object.assign({}, prev);
                                      newState.languages = newVal;
                                      return newState;
                                    });
                                  }}
                                  preSelected={values.languages}
                                />
                              </Box>
                            ) : (
                              userData &&
                              userData.languages?.map((language) => (
                                <ListItem key={language.id}>
                                  {language.name}
                                </ListItem>
                              ))
                            )}
                          </Box>
                        </List>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{ padding: "0 1em" }}
                      >
                        <Typography variant="h5">Skills</Typography>

                        <List>
                          <Box mt="1em" display="flex" flexDirection="column">
                            {editState ? (
                              <Box>
                                <MultiAutoComplete
                                  label="Skills"
                                  getOptions={async () => {
                                    return filtersData!.preferences;
                                  }}
                                  onChange={(newVal) => {
                                    setValues((prev) => {
                                      const newState = Object.assign({}, prev);
                                      newState.skills = newVal;
                                      return newState;
                                    });
                                  }}
                                  preSelected={values.skills}
                                />
                              </Box>
                            ) : (
                              userData &&
                              userData.skills?.map((skill) => (
                                <ListItem key={skill.id}>{skill.name}</ListItem>
                              ))
                            )}
                          </Box>
                        </List>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{ padding: "0 1em" }}
                      >
                        <Typography variant="h5">Preferences</Typography>

                        <List>
                          <Box mt="1em" display="flex" flexDirection="column">
                            {editState ? (
                              <MultiAutoComplete
                                label="Preferences"
                                getOptions={async () => {
                                  return filtersData!.preferences;
                                }}
                                onChange={(newVal) => {
                                  setValues((prev) => {
                                    const newState = Object.assign({}, prev);
                                    newState.preferences = newVal;
                                    return newState;
                                  });
                                }}
                                preSelected={values.preferences}
                              />
                            ) : (
                              userData &&
                              userData.preferences?.map((preference) => (
                                <ListItem key={preference.id}>
                                  {preference.name}
                                </ListItem>
                              ))
                            )}
                          </Box>
                        </List>
                      </Grid>

                      {editState && (
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                        >
                          <Button
                            variant="contained"
                            onClick={submitForm}
                            color="secondary"
                            disabled={isSubmitting}
                          >
                            Submit
                          </Button>
                        </Box>
                      )}

                      {/* Footer */}
                      <Grid className={classes.grid} item xs={12}>
                        <CardActions disableSpacing>
                          {id && (
                            <>
                              <IconButton
                                aria-label="add to favorites"
                                onClick={() => {
                                  addFavorite({ favoriteId: id });
                                }}
                              >
                                <Favorite />
                              </IconButton>

                              <IconButton
                                aria-label="contact"
                                href={`mailto: ${userData.email}`}
                              >
                                <Mail />
                              </IconButton>
                            </>
                          )}

                          <IconButton
                            aria-label="share"
                            href={
                              "https://wa.me/?text=" +
                              encodeURI(
                                `Check out ${userData.username} on Studect ${window.location.href}`
                              )
                            }
                          >
                            <WhatsApp />
                          </IconButton>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </Formik>
      )}
    </>
  );
};

export default Profile;
