import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_RECOVERY_SENT,
  EMAIL_RECOVERY_SENT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isCommissioner: false,
  isLoading: false,
  user: null,
  passwordRecoverySent: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        isCommissioner: action.payload.is_commissioner,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isCommissioner: action.payload.user.is_commissioner
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isCommissioner: false
      };
    case PASSWORD_RECOVERY_SENT:
      return {
        ...state,
        passwordRecoverySent: true
      };
    case EMAIL_RECOVERY_SENT:
      return {
        ...state,
        passwordRecoverySent: false
      };
    default:
      return state;
  }
}
