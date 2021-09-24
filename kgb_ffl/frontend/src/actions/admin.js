import { RETRIEVE_LEAGUE_USERS, RETRIEVE_PICKS_ADMIN } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";

export const getUsersInLeague = league => dispatch => {
  const config = tokenConfig(getState);
  config["params"] = { league };

  axios
    .get("api/users", config)
    .then(response => {
      dispatch({
        type: RETRIEVE_LEAGUE_USERS,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const getPicksAdmin = (league, username) => (dispatch, getState) => {
  const config = tokenConfig(getState);

  config["params"] = { league, username };

  axios
    .get("api/admin/picks", config)
    .then(response => {
      dispatch({
        type: RETRIEVE_PICKS_ADMIN,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};
