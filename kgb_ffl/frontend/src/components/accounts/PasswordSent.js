import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EMAIL_RECOVERY_SENT } from "../../actions/auth";

const PasswordSent = props => {
  const { email } = props.location.state;
  const dispatch = useDispatch();
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email });
  useEffect(() => {
    axios.post("api/password_reset/reset_password", body, config);
    dispatch({ type: "EMAIL_RECOVERY_SENT" });
  }, []);

  return (
    <div>
      <h3>Email sent</h3>
      <p>An email has been sent to {email} to reset your password. </p>
    </div>
  );
};

export default PasswordSent;
