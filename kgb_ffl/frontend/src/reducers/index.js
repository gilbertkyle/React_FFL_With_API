import { combineReducers } from "redux";
import players from "./players";
import errors from "./errors";
import auth from "./auth";
import messages from "./messages";
import leagues from "./leagues";

export default combineReducers({
  players,
  errors,
  auth,
  messages,
  leagues
});
