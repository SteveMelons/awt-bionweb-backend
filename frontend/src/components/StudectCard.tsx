import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React from "react";
import { User } from "../types/User";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 333,
      maxWidth: 444,
      flexGrow: 1,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 11,
      textAlign: "left",
    },
    pos: {
      marginBottom: 12,
    },
    paper: {
      padding: 2,
      justifyItems: "center",
      justifySelf: "center",
      align: "center",
      textAlign: "center",
    },
    gridAvatar: {
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    listItemText: {
      fontSize: 10,
      padding: 0,
      margin: 0,
    },
    starIcon: {
      display: "inline",
      color: "yellow",
      stroke: "black",
      strokeWidth: 1,
    },
  })
);

interface StudectCardProps {
  user: User;
}

const StudectCard: React.FC<StudectCardProps> = ({ user }) => {
  const classes = useStyles();
  const avatar_url = "https://www.cl.cam.ac.uk/~ga384/profile.jpg";

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={6}>
            <Typography className={classes.subtitle}>Study Program:</Typography>

            <Typography className={classes.title}>
              {user.studyProgram}
            </Typography>

            <Divider />

            <Typography className={classes.subtitle}>
              Looking for students in:
            </Typography>

            <div>
              <List>
                {user.preferences?.map((preference) => (
                  <ListItem button>
                    <ListItemText
                      className={classes.listItemText}
                      primary={
                        <Typography className={classes.listItemText}>
                          {preference}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
          {/* Right Column Avatar */}
          <Grid
            className={classes.gridAvatar}
            item
            xs={6}
            container
            justify="center"
          >
            <Avatar
              src={avatar_url}
              className={classes.avatar}
              alt="Osman Tasdelen"
            />
          </Grid>

          {/* Footer */}
          <Grid item xs={12}>
            <Typography className={classes.subtitle}>
              <Box style={{ fontWeight: "bold", display: "inline" }}>
                {user.username}
              </Box>
              - {user.email}
              <Star className={classes.starIcon} />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudectCard;
