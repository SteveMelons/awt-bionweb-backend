import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
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
  Theme,
  Typography,
} from "@material-ui/core";
import { Favorite, Mail, WhatsApp } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import id from "date-fns/locale/id/index.js";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { useGetUser, useGetUserById, useMe } from "../api";
import Chat from "../components/Chat";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      paddingTop: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      flexDirection: "column",
    },
    card: {
      width: "75%",
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

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const id = new URLSearchParams(useLocation().search).get("id") as any;

  const [{ data: meData, loading: meLoading }] = useMe();
  const [{ data: userData, loading: userLoading }] = useGetUserById(id);

  const [openState, setOpenState] = useState(true);

  const history = useHistory();

  const classes = useStyles();

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
        <>
          {/* CHAT */}
          {meData.id !== userData.id && (
            <Paper
              elevation={3}
              sx={{
                position: "fixed",
                maxWidth: "20em",
                width: "100%",
                maxHeight: openState ? "30em" : "3em",
                height: "100%",
                backgroundImage: 'url("https://i.redd.it/qwd83nc4xxf41.jpg")',
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
                </Grid>

                <Grid container spacing={0}>
                  <Grid className={classes.general} item xs={12} sm={6} md={4}>
                    <Container component={Paper} className={classes.info}>
                      @{userData.username}
                      <br />
                      <br />
                      {userData.name}
                    </Container>
                  </Grid>

                  <Grid className={classes.general} item xs={12} md={4}>
                    <Container component={Paper} className={classes.info}>
                      <span
                        style={{
                          fontWeight: 600,
                          color: "#1e78c8",
                          fontSize: 18,
                        }}
                      >
                        Bio:{" "}
                      </span>
                      {userData.bio}
                    </Container>
                  </Grid>
                </Grid>

                <Grid container mt="2em" spacing={3}>
                  {/* <Grid className={classes.gridTopTable} item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontStyle: "Times",
                              fontSize: "20px",
                              color: "#1e78c8",
                            }}
                            align="center"
                          >
                            {" "}
                            Favorites{" "}
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontStyle: "Times",
                              fontSize: "20px",
                              color: "#1e78c8",
                            }}
                            align="center"
                          >
                            Contacted
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontStyle: "Times",
                              fontSize: "20px",
                              color: "#1e78c8",
                            }}
                            align="center"
                          >
                            Shared
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            style={{ fontStyle: "Times", fontSize: "18px" }}
                            align="center"
                          >
                            291
                          </TableCell>
                          <TableCell
                            style={{ fontStyle: "Times", fontSize: "18px" }}
                            align="center"
                          >
                            422
                          </TableCell>
                          <TableCell
                            style={{ fontStyle: "Times", fontSize: "18px" }}
                            align="center"
                          >
                            31
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid> */}

                  {/* Details */}

                  <Grid className={classes.gridTable} item xs={12}>
                    <Typography variant="h5">Details</Typography>
                  </Grid>

                  <Grid className={classes.grid} item xs={12} sm={6} md={4}>
                    <TableContainer component={Paper} className={classes.table}>
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
                              {" "}
                              Joined{" "}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">
                              {new Date(
                                userData.creationDate
                              ).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid className={classes.grid} item xs={12} sm={6} md={4}>
                    <TableContainer component={Paper} className={classes.table}>
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
                              {" "}
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
                    <TableContainer component={Paper} className={classes.table}>
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
                              {" "}
                              Mobile{" "}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">
                              {userData.mobile}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid className={classes.grid} item xs={12} sm={6} md={4}>
                    <TableContainer component={Paper} className={classes.table}>
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
                              {" "}
                              University{" "}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">
                              {userData.university}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid className={classes.grid} item xs={12} sm={6} md={4}>
                    <TableContainer component={Paper} className={classes.table}>
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
                              {" "}
                              Study Program{" "}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">
                              {userData.studyProgram}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* Right column */}
                  <Grid className={classes.grid} item xs={12}>
                    {userData.skills && userData.skills.length !== 0 && (
                      <>
                        <Typography variant="h5">Skills</Typography>

                        <List>
                          {userData.skills.map((skill) => (
                            <ListItem key={skill}>{skill}</ListItem>
                          ))}
                        </List>
                      </>
                    )}

                    {userData.skills && userData.skills.length !== 0 && (
                      <>
                        <Typography variant="h5">Preferences</Typography>

                        <List>
                          {userData.preferences?.map((preference) => (
                            <ListItem key={preference}>{preference}</ListItem>
                          ))}
                        </List>
                      </>
                    )}
                  </Grid>

                  {/* Footer */}
                  <Grid className={classes.grid} item xs={12}>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <Favorite />
                      </IconButton>

                      <IconButton
                        aria-label="contact"
                        href={`mailto: ${userData.email}`}
                      >
                        <Mail />
                      </IconButton>

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
    </>
  );
};

export default Profile;
