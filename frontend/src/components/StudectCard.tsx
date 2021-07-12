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
import React, { useState } from "react";
import { User } from "../types/User";

var colors = Array("#00a717", "#1e78c8",  "#9300a7", " #a7003f"," #d76c00", " #009b8b" );
 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 333,
      maxWidth: 444,
      flexGrow: 1,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      //random color picker
      backgroundColor: colors[Math.floor(Math.random()*colors.length)],
      borderRadius: "15px",
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
      width: theme.spacing(12),
      height: theme.spacing(12),
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
            <Typography className={classes.subtitle}>
              <span style={{ fontWeight: 500, color: "white"}}>Study Program: </span>
            </Typography>

            <Typography className={classes.title}>
              <span style={{ fontWeight: 600, color: "white"}}>{user.studyProgram}</span>
            </Typography>

            <Divider style={{ backgroundColor: "white"}}/>

            <Typography className={classes.subtitle}>
              <span style={{ fontWeight: 500, color: "white"}}>Looking for students in: </span>
            </Typography>

            <List>
              {user.preferences?.map((preference) => (
                <ListItem button key={preference}>
                  <ListItemText className={classes.listItemText} style={{ fontWeight: 600, color: "#f1c40f"}}>
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
            <Typography className={classes.subtitle} style={{ color: "white", fontWeight: 500}}>
              <span style={{ color: "white", fontWeight: "bold", display: "inline" }}>
                {user.username}{" "}
              </span >
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
