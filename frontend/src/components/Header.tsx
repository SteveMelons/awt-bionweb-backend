import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../img/logo-white.png";
import { logout, useMe } from "../api";
import { AppBar, Toolbar, Button, Box } from "@material-ui/core";

interface HeaderProps {}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  text: {
    fontSize: "1em",
    margin: "0 1em",
  },
}));

const Header: React.FC<HeaderProps> = ({}) => {
  const [{ data, loading }] = useMe();

  const history = useHistory();

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box className={classes.title}>
          <Link to="/">
            <img src={logo} height="80" />
          </Link>
        </Box>
        {/* not logged in */}
        {!data?.id && !loading && (
          <>
            <Button
              className={classes.text}
              component={Link}
              to="/login"
              color="inherit"
            >
              Login
            </Button>
            <Button
              className={classes.text}
              component={Link}
              to="/register"
              color="inherit"
            >
              Register
            </Button>
          </>
        )}
        {/* logged in */}
        {data?.id && (
          <>
            <Button
              className={classes.text}
              component={Link}
              to="/favorites"
              color="inherit"
            >
              Favorites
            </Button>
            <Button
              className={classes.text}
              component={Link}
              to="/profile"
              color="inherit"
            >
              Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.text}
              onClick={() => {
                logout();
                history.push("/");
                history.go(0);
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
