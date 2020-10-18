import {
  RETRIEVE_LEAGUE_USERS,
  LEAGUE_COMMISH_RETRIEVE_SUCCESS,
  RETRIEVE_PICKS_ADMIN
} from "../actions/types";

const initialState = {
  users: [],
  commishLeagues: [],
  picks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_LEAGUE_USERS:
      return {
        ...state,
        users: action.payload
      };
    case LEAGUE_COMMISH_RETRIEVE_SUCCESS:
      return {
        ...state,
        commishLeagues: action.payload
      };
    case RETRIEVE_PICKS_ADMIN:
      return {
        ...state,
        picks: action.payload
      };
    default:
      return state;
  }
}
