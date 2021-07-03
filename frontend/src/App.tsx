import React from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Favorite from "./pages/Favorite";
import { Box, ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header></Header>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{ flexGrow: 1 }}
          >
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/favorites" component={Favorite} />
            </Switch>
          </Box>
          <Footer></Footer>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
