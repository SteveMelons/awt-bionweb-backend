import { Box } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Favorite from "./pages/Favorite";
import Imprint from "./pages/Imprint";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Header />
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
          <Route exact path="/imprint" component={Imprint} />
        </Switch>
      </Box>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
