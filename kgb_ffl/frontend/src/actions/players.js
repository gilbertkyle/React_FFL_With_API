import axios from 'axios';
import { GET_PLAYERS } from './types';

// GET_PLAYERS
export const getPlayers = () => dispatch => {
    axios.get("/api/players/")
    .then(res => {
        dispatch({
            type: GET_PLAYERS,
            payload: res.data
        });
    })
    .catch(err => console.log(err));
};