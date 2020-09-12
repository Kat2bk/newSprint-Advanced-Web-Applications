import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/privateRoute";
import BubblePage from "./components/BubblePage";

function App() {
  const logout = () => {
    window.localStorage.removeItem('token');
  }

  return (
    <Router>
      <div className="App">
      <Link to="/login" onClick={logout}>Log out</Link>
        <Switch>
        <PrivateRoute exact path="/colors" component={BubblePage} />
        <Route exact path="/login" component={Login} />
        <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
