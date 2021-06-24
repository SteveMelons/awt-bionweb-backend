import React from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Favorite from "./components/Favorite";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/favorites" component={Favorite} />
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
};

export default App;
