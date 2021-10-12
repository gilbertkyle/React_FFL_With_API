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
  RETRIEVE_LEAGUE_USERS,
  LOAD_INVITATIONS,
  DELETE_INVITATION,
  ACCEPT_INVITATION,
} from "./types";
import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const deleteInvitation = id => async (dispatch, getState) => {
  try {
    const response = await axios.delete(`/api/invitations/${id}`, tokenConfig(getState));
    dispatch({
      type: DELETE_INVITATION,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const acceptInvitation = id => async (dispatch, getState) => {
  try {
    const response = axios.post(`/api/invitations/${id}`, tokenConfig(getState));
    dispatch({
      type: ACCEPT_INVITATION,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const loadInvitations = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/invitations", tokenConfig(getState));
    dispatch({
      type: LOAD_INVITATIONS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const retrieveCommishLeagues = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/league/admin", tokenConfig(getState));
    dispatch({
      type: LEAGUE_COMMISH_RETRIEVE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const updatePick = (id, picks) => async (dispatch, getState) => {
  const body = JSON.stringify(picks);

  try {
    const response = await axios.put(`/api/picks/${id}/`, body, tokenConfig(getState));
    dispatch({
      type: PICK_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const retrievePicks = (leagueId, current_week) => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  config["params"] = { leagueId, current_week };

  try {
    const response = await axios.get("/api/picks", config);
    dispatch({
      type: PICK_RETRIEVE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const retrieveMyPicks = (leagueId, username) => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  config["params"] = { leagueId, username };

  try {
    const response = await axios.get("/api/picks", config);
    dispatch({
      type: USER_PICK_RETRIEVE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.message));
  }
};

export const retrieveLeagues = () => async (dispatch, getState) => {
  dispatch({ type: LEAGUE_LOADING });

  try {
    const response = await axios.get("/api/leagues", tokenConfig(getState));
    dispatch({
      type: LEAGUE_RETRIEVE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const registerLeague =
  ({ name, password, user_id }) =>
  async (dispatch, getState) => {
    // Request Body
    const body = JSON.stringify({ name, password, user_id });

    try {
      const response = await axios.post("/api/leagues/", body, tokenConfig(getState));
      dispatch({
        type: LEAGUE_CREATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
    }
  };

export const joinLeague = (name, password) => async (dispatch, getState) => {
  const body = JSON.stringify({ name, password });

  try {
    const response = await axios.put(`/api/leagues/${name}/`, body, tokenConfig(getState));
    dispatch({
      type: LEAGUE_JOIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const getCurrentWeek = () => async dispatch => {
  try {
    const response = await axios.get("/api/current_week");
    dispatch({
      type: LOAD_WEEK,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const getCurrentYear = () => async dispatch => {
  try {
    const response = await axios.get("/api/current_year");
    dispatch({
      type: LOAD_YEAR,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};
