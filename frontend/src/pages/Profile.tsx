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
import { Favorite, Mail, Share, SignalWifi4BarLockSharp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useGetUser, useMe } from "../api";
import { sortAndDeduplicateDiagnostics } from "typescript";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      paddingTop: "100px",
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
      marginBottom: "-135px",
      marginRight: "70%",
      borderRadius: "25px",
      position: "relative",
      width: theme.spacing(18),
      height: theme.spacing(20),
      background: "linear-gradient(60deg, #1e78c8, #07b39b)",
      //border: "3px solid",
      //borderColor: theme.palette.primary.light,
    },
    table: {
      position: "relative",
      marginBottom: "45px",
      marginLeft: "35%",
      width: "100%",
      maxWidth: "20em",
      border: "2px solid linear-gradient()",
      borderRadius: "15px",
      
    },
    grid: {
      marginTop: "0px",
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
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "17px"}}> Favorites </TableCell>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "17px"}} align="center">Contacted</TableCell>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "17px"}} align="center">Shared</TableCell>
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
                    <ListItem>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Username: </span>{" "}
                        {userData.username}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Name: </span>{" "}
                        {userData.name}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Bio: </span>{" "}
                        {userData.bio}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Joined: </span>{" "}
                        {new Date(userData.creationDate).toLocaleDateString()}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Email: </span>{" "}
                        {userData.email}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Mobile: </span>{" "}
                        {userData.mobile}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>University: </span>{" "}
                        {userData.university}
                      </Typography>
                    </ListItem>
                    {/* <ListItem>Preferences: {userData.preferences}</ListItem> */}
                    {/* <ListItem>Skills: {userData.skills}</ListItem> */}
                    <ListItem>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          Study Program:{" "}
                        </span>{" "}
                        {userData.studyProgram}
                      </Typography>
                    </ListItem>
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

