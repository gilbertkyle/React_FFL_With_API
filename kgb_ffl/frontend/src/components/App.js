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
import LeagueRoute from "./common/LeagueRoute";
import AdminRoute from "./common/AdminRoute";
import PickDetail from "./leagues/PickDetail";
import PlayerSearch from "./leagues/PlayerSearch";
import PlayerDetail from "./leagues/PlayerDetail";
import { Jumbotron } from "./layout/Jumbotron";

import { Container } from "react-bootstrap";

import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "../store";

import { loadUser } from "../actions/auth";
import { retrieveLeagues, getCurrentWeek, getCurrentYear } from "../actions/league";
import AdminIndex from "./leagues/AdminIndex";
import AdminHome from "./leagues/AdminHome";
import AdminProfile from "./leagues/AdminProfile";

// alert options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getCurrentWeek());
    store.dispatch(getCurrentYear());
  }

  componentDidUpdate() {
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
                <AdminRoute exact path="/admin" component={AdminIndex} />
                <AdminRoute exact path="/admin/:id" component={AdminHome} />
                <AdminRoute exact path="/admin/:id/:username" component={AdminProfile} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/search" component={PlayerSearch} />
                <Route exact path="/search/:playerid" component={PlayerDetail} />
                <PrivateRoute exact path="/league/create" component={CreateLeague} />
                <PrivateRoute exact path="/" component={() => <LeagueIndex />} />
                <PrivateRoute exact path="/league/join" component={JoinLeague} />
                <LeagueRoute exact path="/:id" component={Home} />
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
