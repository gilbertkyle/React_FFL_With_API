import React, { Component, Fragment, useEffect } from "react";
import { withAlert, useAlert } from "react-alert";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

const Alert = () => {
  const error = useSelector(state => state.errors);
  const message = useSelector(state => state.messages);

  const alert = useAlert();

  useEffect(() => {
    console.log(error);
    if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
    if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
    if (error.msg.password) alert.error(`Password: ${error.msg.password.join()}`);
    if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
    if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
    if (error.msg.username) alert.error(error.msg.username.join());
  }, [error]);

  useEffect(() => {
    if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    if (message.qbTaken) alert.error(message.qbTaken);
    if (message.rbTaken) alert.error(message.rbTaken);
    if (message.wrTaken) alert.error(message.wrTaken);
    if (message.teTaken) alert.error(message.teTaken);
    if (message.defenseTaken) alert.error(message.defenseTaken);
  }, [message]);
  return <Fragment />;
};

export default Alert;
