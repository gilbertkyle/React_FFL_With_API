import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Header from "./layout/Header";
import Players from "./players/Players";
import Alerts from "./layout/Alerts";
import FootballNavbar from "./layout/FootballNavbar";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import CreateLeague from "./leagues/CreateLeague";
import JoinLeague from "./leagues/JoinLeague";
import Home from "./leagues/Home";
import LeagueIndex from "./leagues/LeagueIndex";
import PrivateRoute from "./common/PrivateRoute";
import PickDetail from "./leagues/PickDetail";
import { Jumbotron } from "./layout/Jumbotron";

import { Container } from "react-bootstrap";

import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "../store";

import { loadUser } from "../actions/auth";
import { retrieveLeagues, getCurrentWeek } from "../actions/league";

// alert options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getCurrentWeek());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Header />
            <Jumbotron />
            <Alerts />
            <Container className="main-container">
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/league/create" component={CreateLeague} exact />
                <PrivateRoute path="/" exact component={() => <LeagueIndex />} />
                <PrivateRoute path="/league/join" component={JoinLeague} />
                <PrivateRoute exact path="/:id" component={Home} />
                <PrivateRoute exact path="/:id/picks" component={PickDetail} name="pick-detail" />
              </Switch>
            </Container>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
