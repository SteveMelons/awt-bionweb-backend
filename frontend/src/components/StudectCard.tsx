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
  IconButton,
} from "@material-ui/core";
import { Star, StarBorderSharp } from "@material-ui/icons";
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
      fontSize: 16,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 14,
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
      fontSize: 14,
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
  onClickFavorite: (id: string) => void;
}

const StudectCard: React.FC<StudectCardProps> = ({ user, onClickFavorite }) => {
  const classes = useStyles();

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

            <List>
              {user.preferences?.map((preference) => (
                <ListItem button key={preference}>
                  <ListItemText className={classes.listItemText}>
                    {preference}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
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
              src={user.avatar}
              className={classes.avatar}
              alt="Osman Tasdelen"
            />
          </Grid>

          {/* Footer */}
          <Grid item xs={12}>
            <Typography className={classes.subtitle}>
              <span style={{ fontWeight: "bold", display: "inline" }}>
                {user.username}{" "}
              </span>
              - {user.email}
            </Typography>
          </Grid>
          <IconButton
            onClick={() => {
              onClickFavorite(user.id);
            }}
          >
            <StarBorderSharp />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudectCard;
