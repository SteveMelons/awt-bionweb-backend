import React from "react";
import { Container, Row, Col } from 'reactstrap';
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
import { Favorite, FormatBoldTwoTone, Mail, Share, SignalWifi4BarLockSharp } from "@material-ui/icons";
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
      position: "absolute",
      width: theme.spacing(22),
      height: theme.spacing(23),
      
      transform: "translateY(-25px)",
      background: "linear-gradient(60deg, #1e78c8, #07b39b)",  
      //border: "3px solid",
      //borderColor: theme.palette.primary.light,
      
    },
    gridTopTable:{
      alignItems: "left",
      display: "flex",
      flexDirection: "column",
      justifyContent: "right",
      //to add space 
      marginTop: "180px",
      marginBottom: "40px"
    },
    toptable: {
      position: "relative",
      border: "2px solid",
      borderColor: " #f1c40f"
      
    },

    gridTable:{
      alignItems: "left",
      display: "flex",
      flexDirection: "column",
      justifyContent: "right",
  
    },

    table: {
      position: "relative",
      //marginLeft: "35%",
      width: "100%",
      maxWidth: "40em",
      border: "2px solid linear-gradient()",
      borderRadius: "15px",
      
    },
  
    space:{

      marginTop: theme.spacing(0),

    },
    info:{
      position: "relative",
      marginTop: theme.spacing(0),
      fontSize: 18,
      fontFamily: "sans-serif",
     
      transform: "translateY(120px)",
      //marginLeft: "35%",
      
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
                {/* Header image */}
                <Grid className={classes.gridAvatar} item xs={12}  >
                  <Avatar
                    src={userData.avatar}
                    className={classes.avatar}
                    alt="Osman Tasdelen"
                  />
                </Grid>

                
                <Grid container spacing={0}>

                <Grid className={classes.general} item xs={12} sm={6} md={4}>
                  <Container component={Paper} className={classes.info} >
                        <span style={{ fontWeight: 600, color: "#1e78c8", fontSize:18}}> Username: </span> {userData.username} 
                        
                  </Container>
                </Grid>

                <Grid className={classes.general} item xs={12} sm={6} md={4}>
                  <Container component={Paper} className={classes.info} >
                        
                        <span style={{ fontWeight: 600, color: "#1e78c8", fontSize:18 }}> Name: </span>{userData.name} Erbil, Furkan
                  </Container>
                </Grid>

                <Grid className={classes.general} item xs={12}  md={4}>
                  <Container component={Paper} className={classes.info} >           
                       <span style={{ fontWeight: 600, color: "#1e78c8", fontSize:18}}> Bio: </span>{userData.bio} Sports, Movies, Programming 
                  </Container>
                </Grid>
                </Grid>


                <Grid container spacing={3}>
                
          
                <Grid className={classes.gridTopTable} item xs={12}>
                  <TableContainer component={Paper} className={classes.toptable}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "20px", color: "#1e78c8"}}align="center"> Favorites </TableCell>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "20px", color: "#1e78c8"}} align="center">Contacted</TableCell>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "20px", color: "#1e78c8"}} align="center">Shared</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow >
                          <TableCell style={{ fontStyle: "Times", fontSize: "18px"}}align="center">291</TableCell>
                          <TableCell style={{ fontStyle: "Times", fontSize: "18px"}}align="center">422</TableCell>
                          <TableCell style={{ fontStyle: "Times", fontSize: "18px"}}align="center">31</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>


                {/* Details */}
                
                <Grid className={classes.gridTable} item xs={12}>
                  <Typography variant="h5">Details</Typography>
                </Grid>
              
                <Grid className={classes.grid} item xs= {12} sm={6} md = {4}>
               
               
                    <TableContainer component={Paper} className={classes.table}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "15px" }} align = "center"> Joined </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">{new Date(userData.creationDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                      </TableBody>
                      </Table>
                      </TableContainer>

              </Grid>

              <Grid className={classes.grid} item xs= {12} sm={6} md = {4}>
                     <TableContainer component={Paper} className={classes.table}>
                     <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "15px" }} align = "center"> E-Mail </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">{userData.email}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    </TableContainer>
          
                </Grid>
                
                <Grid className={classes.grid} item xs= {12} sm={6} md = {4}>
                    <TableContainer component={Paper} className={classes.table}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "15px" }} align = "center"> Mobile </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">{userData.mobile}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    </TableContainer>
                  </Grid>

                  <Grid className={classes.grid} item xs= {12} sm={6} md = {4}>
                    <TableContainer component={Paper} className={classes.table}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "15px" }} align = "center"> University </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">{userData.university}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    </TableContainer>
                  </Grid>

                  <Grid className={classes.grid} item xs= {12} sm={6} md = {4}>
                    <TableContainer component={Paper} className={classes.table}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{fontWeight:"bold", fontStyle: "Times", fontSize: "15px" }} align = "center"> Study Program </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">{userData.studyProgram}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    </TableContainer>
                  </Grid>
 

                {/* Right column */}
                <Grid className={classes.grid} item xs={12}>
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

