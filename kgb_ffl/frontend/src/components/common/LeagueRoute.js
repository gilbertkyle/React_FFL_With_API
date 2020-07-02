import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    <Route 
    {...rest}
    render={props => {
        if () {
            return <Redirect to="/" />
        } else {
            return <Component {...props} />
        }
    }}
    />
}

export default LeagueRoute;
