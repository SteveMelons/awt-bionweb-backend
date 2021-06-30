import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../img/logo-white.png";
import { logout, useMe } from "../api";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

interface HeaderProps {}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header: React.FC<HeaderProps> = ({}) => {
  const [{ data, loading }] = useMe();

  const history = useHistory();

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/">
            <img src={logo} height="80" />
          </Link>
        </Typography>
        <Button component={Link} to="/favorites" color="inherit">
          Favorites
        </Button>
        {/* not logged in */}
        {!data?.id && !loading && (
          <>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </>
        )}
        {/* logged in */}
        {data?.id && (
          <>
            <Button component={Link} to="/profile" color="inherit">
              Profile
            </Button>
            <Button
              onClick={() => {
                logout();
                history.push("/");
                history.go(0);
              }}
              color="inherit"
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
