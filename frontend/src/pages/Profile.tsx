import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardContent,
  Grid,
  Avatar,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  List,
  ListItem,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { Favorite, Mail, Share } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useGetUser, useMe } from "../api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(10),
      paddingTop: "100px",
      // backgroundColor: theme.palette.secondary.light,
      display: "flex",
      alignItems: "center",
      justifyCntent: "center",
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
      marginTop: "-50px",
      position: "absolute",
      width: theme.spacing(16),
      height: theme.spacing(16),
      border: "3px solid",
      borderColor: theme.palette.secondary.light,
    },
    table: {
      marginTop: "50px",
      width: "100%",
      maxWidth: "20em",
    },
    grid: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const [{ data: meData, loading: meLoading }] = useMe();
  const [{ data: userData, loading: userLoading }] = useGetUser();

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
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={3}>
                {/* Header image */}
                <Grid className={classes.gridAvatar} item xs={12}>
                  <Avatar
                    src={userData.avatar}
                    className={classes.avatar}
                    alt="Osman Tasdelen"
                  />
                </Grid>

                {/* Header actions */}
                <Grid className={classes.grid} item xs={12}>
                  <TableContainer component={Paper} className={classes.table}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Favorited</TableCell>
                          <TableCell align="center">Contacted</TableCell>
                          <TableCell align="center">Shared</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">291</TableCell>
                          <TableCell align="center">422</TableCell>
                          <TableCell align="center">31</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                {/* Left column */}
                <Grid className={classes.grid} item xs={6}>
                  <Typography variant="h5">Details</Typography>

                  <List>
                    <ListItem>Username: {userData.username}</ListItem>
                    <ListItem>Bio: {userData.bio}</ListItem>
                    <ListItem>
                      Joined:{" "}
                      {new Date(userData.creationDate).toLocaleDateString()}
                    </ListItem>
                    <ListItem>Email: {userData.email}</ListItem>
                    <ListItem>Mobile: {userData.mobile}</ListItem>
                    {/* <ListItem>Preferences: {userData.preferences}</ListItem> */}
                    {/* <ListItem>Skills: {userData.skills}</ListItem> */}
                    <ListItem>Study Program: {userData.studyProgram}</ListItem>
                  </List>
                </Grid>

                {/* Right column */}
                <Grid className={classes.grid} item xs={6}>
                  <Typography variant="h5">Skills</Typography>

                  <List>
                    {userData.skills?.map((skill) => (
                      <ListItem key={skill}>{skill}</ListItem>
                    ))}
                  </List>

                  <Typography variant="h5">Preferences</Typography>

                  <List>
                    {userData.preferences?.map((preference) => (
                      <ListItem key={preference}>{preference}</ListItem>
                    ))}
                  </List>
                </Grid>

                {/* Footer */}
                <Grid className={classes.grid} item xs={12}>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <Favorite />
                    </IconButton>

                    <IconButton aria-label="contact">
                      <Mail />
                    </IconButton>

                    <IconButton aria-label="share">
                      <Share />
                    </IconButton>
                  </CardActions>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
