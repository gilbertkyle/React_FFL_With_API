import {
  LEAGUE_CREATE_FAIL,
  LEAGUE_JOIN_FAIL,
  LEAGUE_CREATE_SUCCESS,
  LEAGUE_JOIN_SUCCESS,
  LEAGUE_RETRIEVE_SUCCESS,
  LEAGUE_RETRIEVE_FAIL,
  LEAGUE_LOADING,
  LEAGUE_LOADED,
  LOAD_WEEK,
  PICK_RETRIEVE_SUCCESS,
  PICK_UPDATE_SUCCESS,
  USER_PICK_RETRIEVE_SUCCESS
} from "../actions/types";

const initialState = {
  leagues: null,
  leagueLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LEAGUE_LOADING:
      return {
        ...state,
        leagueLoading: true
      };
    case LEAGUE_LOADED:
      return {
        ...state,
        leagueLoading: false,
        leagues: action.payload
      };
    case LEAGUE_CREATE_SUCCESS:
      return {
        ...state,
        leagues: action.payload,
        leagueLoading: false
      };
    case LEAGUE_RETRIEVE_SUCCESS:
      return {
        ...state,
        leagues: action.payload,
        leagueLoading: false
      };
    case LOAD_WEEK:
      return {
        ...state,
        week: action.payload.current_week
      };
    case PICK_RETRIEVE_SUCCESS:
      return {
        ...state,
        picks: action.payload
      };
    case USER_PICK_RETRIEVE_SUCCESS:
      return {
        ...state,
        myPicks: action.payload
      };
    case PICK_UPDATE_SUCCESS:
      return {
        ...state
      };
    case LEAGUE_RETRIEVE_FAIL:
    case LEAGUE_CREATE_FAIL:
    case LEAGUE_JOIN_FAIL:
    default:
      return state;
  }
}
