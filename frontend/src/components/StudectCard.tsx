import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/User";

var colors = [
  "radial-gradient(ellipse at top, #e66465, transparent), radial-gradient(ellipse at bottom, #9300a7, transparent)",
  "radial-gradient( at center, #3498db, #9b59b6 )",
  "radial-gradient(ellipse at top, #009b8b, transparent), radial-gradient(ellipse at bottom, #a7003f, transparent)",
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
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
      // backgroundColor: "white",
      display: "flex",
      alignItems: "center",
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
  color: number;
}

const StudectCard: React.FC<StudectCardProps> = ({
  user,
  onClickFavorite,
  color,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card
      onClick={() => history.push("/profile?id=" + user.id)}
      className={classes.root}
      sx={{
        background: colors[color],
        cursor: "pointer",
        ":hover": {
          // boxShadow:
          //   "5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, -7px -5px 15px 5px #8CFF85, 12px -5px 15px 5px #80C7FF, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -10px -7px 27px 1px #8E5CFF, 5px 5px 15px 5px rgba(0,0,0,0)",
          boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
        },
      }}
    >
      <CardContent>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={6}>
            <Typography className={classes.subtitle}>
              <span style={{ fontWeight: 500, color: "white" }}>
                Study Program:
              </span>
            </Typography>

            <Typography className={classes.title}>
              <span style={{ fontWeight: 600, color: "white" }}>
                {user.studyprogram?.name}
              </span>
            </Typography>

            <Divider style={{ backgroundColor: "white" }} />

            <Typography className={classes.subtitle}>
              <span style={{ fontWeight: 500, color: "white" }}>
                Looking for students in:
              </span>
            </Typography>

            <List>
              {user.preferences?.map((preference) => (
                <ListItem button key={preference.id}>
                  <ListItemText
                    className={classes.listItemText}
                    style={{ fontWeight: 600, color: "#f1c40f" }}
                  >
                    {preference.name}
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
            justifyContent="center"
          >
            <Avatar
              src={user.avatar}
              alt={user.username}
              sx={{ width: 120, height: 120 }}
            />
          </Grid>

          {/* Footer */}
          <Grid item xs={12}>
            <Typography
              className={classes.subtitle}
              style={{ color: "white", fontWeight: 500 }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                  display: "inline",
                }}
              >
                {user.username}
              </span>
              - {user.name} - {user.email}
            </Typography>
            {/* <Box display="flex" justifyContent="flex-end">
              <IconButton
                onClick={() => {
                  onClickFavorite(user.id);
                }}
              >
                <Favorite style={{ color: "white" }} />
              </IconButton>
            </Box> */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudectCard;
