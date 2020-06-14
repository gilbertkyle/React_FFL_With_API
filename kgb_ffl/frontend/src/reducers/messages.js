import { CREATE_MESSAGE, GET_MESSAGES } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    case GET_MESSAGES:
      return action.payload;
    default:
      return state;
  }
}
