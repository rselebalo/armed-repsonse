import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import PropTypes from "prop-types";
import auth0Client from "./components/Auth/Auth";
import history from "./components/history";
import "./App.scss";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Callback = React.lazy(() => import("./components/Auth/Callback"));
const Login = React.lazy(() => import("./views/Login"));

class App extends Component {
  async componentDidMount() {
    try {
      if (!auth0Client.getIdToken()) {
        history.push("/");
      }
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      history.push("/");
    }
  }
  render() {
    return (
      <Router history={history}>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={props => <DefaultLayout {...props} />}
            />
            <Route
              exact
              path="/callback"
              name="Callback Page"
              render={props => <Callback {...props} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
