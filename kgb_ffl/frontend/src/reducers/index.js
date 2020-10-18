import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import messages from "./messages";
import leagues from "./leagues";
import admin from "./admin";

export default combineReducers({
  errors,
  auth,
  messages,
  leagues,
  admin
});
