import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

function Profile() {
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const email = <p>email goes here</p>;
  const emailInput = <input type="text" placeholder="email" />;

  const handleChangeEmail = () => setIsChangingEmail(!isChangingEmail);

  return (
    <div>
      <button onClick={handleChangeEmail}>Click me!</button>
      {isChangingEmail ? emailInput : email}
    </div>
  );
}

export default Profile;
