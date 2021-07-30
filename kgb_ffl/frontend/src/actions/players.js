import axios from "axios";
import { GET_PLAYERS } from "./types";

// GET_PLAYERS
export const getPlayers = (search) => async (dispatch) => {
  try {
    const response = await axios.get("/api/players", { params: search });
    return response;
  } catch (error) {
    console.log("error");
  }
};
