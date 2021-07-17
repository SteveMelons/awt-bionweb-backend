import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
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
  color: number;
}

const StudectCard: React.FC<StudectCardProps> = ({ user, color }) => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const maxItems = 3;

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
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item container xs={9}>
            {user.university?.name && (
              <>
                <Typography
                  sx={{ fontWeight: 400, color: "white" }}
                  className={classes.subtitle}
                >
                  {user.university?.name}
                </Typography>
                <Divider style={{ backgroundColor: "white" }} />
              </>
            )}

            <Typography
              sx={{ fontWeight: 400, color: "white" }}
              className={classes.subtitle}
            >
              {user.studyprogram?.name}
            </Typography>
          </Grid>

          <Grid
            className={classes.gridAvatar}
            item
            xs={3}
            justifyContent="center"
            alignItems="start"
          >
            <Avatar
              src={user.avatar}
              alt={user.username}
              sx={{ width: 60, height: 60 }}
            />
          </Grid>

          <Grid item xs={6}>
            {user.preferences?.length !== 0 && (
              <Typography
                sx={{
                  mt: "0.5em",
                  fontSize: "0.8em",
                  fontWeight: 400,
                  color: "white",
                }}
                className={classes.subtitle}
              >
                Preferences:
              </Typography>
            )}

            <List>
              {user.preferences
                ?.map((preference) => (
                  <ListItem key={preference.id + "pref"} sx={{ padding: "0" }}>
                    <ListItemText
                      className={classes.listItemText}
                      style={{
                        fontWeight: 500,
                        color: "white",
                      }}
                    >
                      {preference.name}
                    </ListItemText>
                  </ListItem>
                ))
                .slice(0, maxItems)}
            </List>
          </Grid>

          <Grid item xs={6}>
            {user.preferences?.length !== 0 && (
              <Typography
                sx={{
                  mt: "0.5em",
                  fontSize: "0.8em",
                  fontWeight: 400,
                  color: "white",
                }}
                className={classes.subtitle}
              >
                Skills:
              </Typography>
            )}

            <List>
              {user.skills
                ?.map((skill) => (
                  <ListItem key={skill.id} sx={{ padding: "0" }}>
                    <ListItemText
                      className={classes.listItemText}
                      style={{
                        fontWeight: 500,
                        color: "white",
                      }}
                    >
                      {skill.name}
                    </ListItemText>
                  </ListItem>
                ))
                .slice(0, maxItems)}
            </List>
          </Grid>

          {/* Footer */}
          <Grid item xs={12}>
            <Typography
              className={classes.subtitle}
              style={{ color: "white", fontWeight: 400 }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                  display: "inline",
                }}
              >
                @{user.username}
              </span>{" "}
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
