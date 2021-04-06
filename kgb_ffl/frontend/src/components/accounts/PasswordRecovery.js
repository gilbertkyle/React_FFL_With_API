import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/auth";
import { Redirect, useHistory } from "react-router-dom";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();

  // check if email has been sent
  const { passwordRecoverySent } = useSelector(state => state.auth);

  if (passwordRecoverySent) {
    history.push({
      pathname: "/account/password_sent",
      state: {
        email: email
      }
    });
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      dispatch(resetPassword(email));
    }
  };

  return (
    <Container>
      <h3>Forgot your password?</h3>
      <p>Input your email address and we'll send you a link to reset it.</p>
      <form onSubmit={handleSubmit}>
        <div className="email-field">
          <TextField
            label="email address"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div>
          <Button type="submit" color="primary" variant="contained">
            {loading ? <CircularProgress color="secondary" /> : "Send Email"}
          </Button>
        </div>
      </form>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  & > * {
    margin: 1rem;
  }
  button {
    margin-top: 1rem;
  }
`;

export default PasswordRecovery;
