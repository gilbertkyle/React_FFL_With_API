import axios from "axios";
import { GET_PLAYERS } from "./types";

// GET_PLAYERS
export const getPlayers = (search) => async (dispatch) => {
  console.log(search);
  try {
    const response = await axios.get("/api/players", { params: search });
    dispatch({
      type: GET_PLAYERS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
