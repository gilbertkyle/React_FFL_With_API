import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  // checks whether the user is authenticated
  // if not, it returns them to the home page
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        return <h2>Loading</h2>;
      } else if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
