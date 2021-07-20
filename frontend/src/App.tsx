import { Box } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useMe } from "./api";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Favorite from "./pages/Favorite";
import Imprint from "./pages/Imprint";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [{ data, loading }] = useMe();

  const loggedIn = !!data?.id;

  return (
    <BrowserRouter>
      {loggedIn && <NavBar />}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ flexGrow: 1 }}
      >
        {!loading &&
          (loggedIn ? (
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Dashboard loggedIn={loggedIn} />}
              />

              <Route
                exact
                path="/profile"
                component={() => (
                  <Profile loggedIn={loggedIn} userId={data?.id || ""} />
                )}
              />
              <Route
                exact
                path="/favorites"
                component={() => <Favorite loggedIn={loggedIn} />}
              />
              <Route exact path="/imprint" component={() => <Imprint />} />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/register" component={() => <Register />} />
              <Route exact path="/login" component={() => <Login />} />
              <Route exact path="/imprint" component={() => <Imprint />} />
              <Redirect to="/login" />
            </Switch>
          ))}
      </Box>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
