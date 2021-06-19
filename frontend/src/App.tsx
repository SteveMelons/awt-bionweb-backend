import React from "react";
import "./App.css";
import Login from "./components/Login";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>Hello World</code>
        </p>
        <Login />
      </header>
    </div>
  );
};

export default App;
