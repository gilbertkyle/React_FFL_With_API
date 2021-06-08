import React from "react";
import ReactDOM from "react-dom";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import CreateLeague from "./ffl/CreateLeague";
import JoinLeague from "./ffl/JoinLeague";
import Home from "./ffl/Home";
import LeagueIndex from "./ffl/LeagueIndex";
import PrivateRoute from "./common/PrivateRoute";
import LeagueRoute from "./common/LeagueRoute";
import AdminRoute from "./common/AdminRoute";
import PickDetail from "./ffl/PickDetail";
import PlayerSearch from "./ffl/PlayerSearch";
import PlayerDetail from "./ffl/PlayerDetail";
import { Jumbotron } from "./layout/Jumbotron";
import { Footer } from "./layout/Footer";
import Navbar from "./layout/Navbar";
import PasswordSet from "./accounts/PasswordSet";

//import { Container } from "react-bootstrap";
import { Container } from "@material-ui/core";

import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import { ThemeProvider } from "@material-ui/core/styles";
import AlertTemplate from "react-alert-template-basic";
import store from "../store";

import { loadUser } from "../actions/auth";
import { retrieveLeagues, getCurrentWeek, getCurrentYear } from "../actions/ffl";
import AdminIndex from "./ffl/AdminIndex";
import AdminHome from "./ffl/AdminHome";
import AdminProfile from "./ffl/AdminProfile";

import theme from "../theme/theme";
import PasswordRecovery from "./accounts/PasswordRecovery";
import PasswordSent from "./accounts/PasswordSent";

const NoMatch = () => {
  return <h1>No Match!</h1>;
};

// alert options
const alertOptions = {
  timeout: 3000,
  position: "top center",
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
        <ThemeProvider theme={theme}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Router>
              <Navbar />
              <Jumbotron />
              <Alerts />
              <Container className="main-container">
                <Switch>
                  <AdminRoute exact path="/admin" component={AdminIndex} />
                  <AdminRoute exact path="/admin/:id" component={AdminHome} />
                  <AdminRoute exact path="/admin/:id/:username" component={AdminProfile} />
                  <Route exact path="/account/password_recovery" component={PasswordRecovery} />
                  <Route exact path="/account/password_sent" component={PasswordSent} />
                  <Route exact path="/account/password_set" component={PasswordSet} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route
                    exact
                    path="/search"
                    component={(props) => (
                      <PlayerSearch {...props} key={window.location.pathname} />
                    )}
                  />
                  <Route exact path="/search/:playerid" component={PlayerDetail} />
                  <PrivateRoute exact path="/" component={() => <LeagueIndex />} />
                  <PrivateRoute exact path="/league/create" component={CreateLeague} />
                  <PrivateRoute exact path="/league/join" component={JoinLeague} />
                  <Route
                    component={({ match }) => (
                      <div>
                        <LeagueRoute exact path="/:id" component={Home} />
                        <PrivateRoute
                          exact
                          path="/:id/picks"
                          component={PickDetail}
                          name="pick-detail"
                        />
                      </div>
                    )}
                  />
                  <Route component={NoMatch} />
                </Switch>
              </Container>
              <Footer />
            </Router>
          </AlertProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
