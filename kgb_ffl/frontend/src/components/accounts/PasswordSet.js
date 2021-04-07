import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { changePassword } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const PasswordSet = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { token, username } = queryString.parse(location.search);
  const { passwordChangeSuccess } = useSelector(state => state.auth);

  if (passwordChangeSuccess) history.push("/");

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      alert("passwords dont match");
      return;
    }
    dispatch(changePassword(password, token));
  };
  return (
    <Container>
      <h3>Set Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-object">
          <TextField
            variant="outlined"
            label="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-object">
          <TextField
            variant="outlined"
            label="confirm password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
        <div className="form-object">
          <Button type="submit" color="primary" variant="contained">
            Set new password
          </Button>
        </div>
      </form>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 1rem;
  .form-object {
    margin: 1rem 0rem;
  }
`;

export default PasswordSet;
