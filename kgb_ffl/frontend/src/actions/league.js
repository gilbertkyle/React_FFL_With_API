import axios from "axios";
import {
  LEAGUE_CREATE_SUCCESS,
  LEAGUE_JOIN_SUCCESS,
  LEAGUE_CREATE_FAIL,
  LEAGUE_JOIN_FAIL,
  LEAGUE_RETRIEVE_FAIL,
  LEAGUE_RETRIEVE_SUCCESS,
  LEAGUE_LOADING,
  LOAD_WEEK,
  LOAD_YEAR,
  PICK_RETRIEVE_SUCCESS,
  PICK_UPDATE_SUCCESS,
  USER_PICK_RETRIEVE_SUCCESS,
  LEAGUE_COMMISH_RETRIEVE_SUCCESS,
  RETRIEVE_LEAGUE_USERS
} from "./types";
import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const retrieveCommishLeagues = () => (dispatch, getState) => {
  axios
    .get("/api/league/admin", tokenConfig(getState))
    .then(response => {
      dispatch({
        type: LEAGUE_COMMISH_RETRIEVE_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const updatePick = (pickId, picks) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify(picks);

  console.log(body);

  axios
    .put(`/api/picks/${pickId}`, body, config)
    .then(res => {
      dispatch({
        type: PICK_UPDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const retrievePicks = (leagueId, current_week) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const params = { leagueId, current_week };

  axios
    .get("/api/picks", { params }, config)
    .then(res => {
      dispatch({
        type: PICK_RETRIEVE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const retrieveMyPicks = (leagueId, username) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const params = { leagueId, username };

  axios
    .get("/api/picks", { params }, config)
    .then(res => {
      dispatch({
        type: USER_PICK_RETRIEVE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const retrieveLeagues = username => dispatch => {
  dispatch({ type: LEAGUE_LOADING });

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const params = {
    username
  };

  axios
    .get("/api/league/retrieve", { params }, config)
    .then(res => {
      dispatch({
        type: LEAGUE_RETRIEVE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const registerLeague = ({ name, password, user_id }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ name, password, user_id });

  axios
    .post("/api/league/register", body, config)
    .then(res => {
      dispatch({
        type: LEAGUE_CREATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const joinLeague = (name, password, user_id) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, password, user_id });

  axios
    .put("/api/league/join", body, config)
    .then(res => {
      dispatch({
        type: LEAGUE_JOIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getCurrentWeek = () => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .get("/api/current_week")
    .then(res => {
      dispatch({
        type: LOAD_WEEK,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getCurrentYear = () => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .get("/api/current_year")
    .then(response => {
      dispatch({
        type: LOAD_YEAR,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};
