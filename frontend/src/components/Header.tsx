import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { logout, useMe } from "../api";

interface HeaderProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <MLink href="/" color="inherit" underline="none">
              Studect
            </MLink>
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
    </div>
  );
};

export default Header;