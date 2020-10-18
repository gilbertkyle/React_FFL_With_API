import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      } else if (!auth.isCommissioner) {
        return <h2>Not authorized</h2>;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
