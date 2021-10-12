import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../../actions/messages";
import { updatePick } from "../../actions/ffl";
import { Redirect, useRouteMatch } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formField: {
    margin: "1rem",
    width: "300px",
  },
  formButton: {
    margin: "1rem",
  },
}));

const PickForm = ({ admin = false }) => {
  // State for the user to submit
  const [qb, setQb] = useState({});
  const [rb, setRb] = useState({});
  const [wr, setWr] = useState({});
  const [te, setTe] = useState({});
  const [defense, setDefense] = useState({});

  // Data for the autocomplete feature
  const [qbs, setQbs] = useState([]);
  const [rbs, setRbs] = useState([]);
  const [wrs, setWrs] = useState([]);
  const [tes, setTes] = useState([]);
  const [defenses, setDefenses] = useState([]);

  // getting your picks from state
  const myPicks = useSelector(state => state.ffl.myPicks);
  const { week, pickSubmitted } = useSelector(state => state.ffl);

  const classes = useStyles();

  const match = useRouteMatch();

  // Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const getPlayers = async () => {
      const response = await axios.get("api/players");
      const players = response.data;
      if (isMounted) {
        let qbs = players.filter(player => player.position == "QB");
        let rbs = players.filter(player => player.position == "RB");
        let wrs = players.filter(player => player.position == "WR");
        let tes = players.filter(player => player.position == "TE");
        let defenses = players.filter(player => player.position == "Def");

        setQbs(qbs);
        setRbs(rbs);
        setWrs(wrs);
        setTes(tes);
        setDefenses(defenses);
      }
    };
    getPlayers();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOptionLabel = option => {
    if (!option) return "";
    return `${option.name} - ${option.team.toUpperCase()}`;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const picks = {
      qb,
      rb,
      wr,
      te,
      defense,
    };

    // check for repeat picks in this league
    if (!admin) {
      for (var i = 0; i < myPicks.length; i++) {
        if (myPicks[i].qb_id == qb.id) {
          createMessage({ qbTaken: `You have already picked ${qb.name} this season` });
          return;
        }
        if (myPicks[i].rb_id == rb.id) {
          createMessage({ rbTaken: `You have already picked ${rb.name} this season` });
          return;
        }
        if (myPicks[i].wr_id == wr.id) {
          createMessage({ wrTaken: `You have already picked ${wr.name} this season` });
          return;
        }
        if (myPicks[i].te_id == te.id) {
          createMessage({ teTaken: `You have already picked ${te.name} this season` });
          return;
        }
        if (myPicks[i].defense_id == defense.id) {
          createMessage({
            defenseTaken: `You have already picked ${defense.name} this season`,
          });
          return;
        }
      }
    }

    const pickId = myPicks.filter(pick => pick.week == week)[0].id;
    dispatch(updatePick(pickId, picks));
  };

  if (pickSubmitted) return <Redirect to={`/${match.params.id}`} />;

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        className={classes.formField}
        onChange={(e, value) => setQb(value)}
        options={qbs}
        getOptionLabel={handleOptionLabel}
        renderInput={params => <TextField {...params} label="Quarterback" variant="outlined" name="qb" />}
      />
      <Autocomplete
        id="combo-box-rb"
        className={classes.formField}
        onChange={(e, value) => setRb(value)}
        options={rbs}
        getOptionLabel={handleOptionLabel}
        renderInput={params => <TextField {...params} label="Running Back" variant="outlined" />}
      />
      <Autocomplete
        id="combo-box-wr"
        className={classes.formField}
        onChange={(e, value) => setWr(value)}
        options={wrs}
        getOptionLabel={handleOptionLabel}
        renderInput={params => <TextField {...params} label="Wide Receiver" variant="outlined" />}
      />
      <Autocomplete
        id="combo-box-te"
        className={classes.formField}
        onChange={(e, value) => setTe(value)}
        options={tes}
        getOptionLabel={handleOptionLabel}
        renderInput={params => <TextField {...params} label="Tight End" variant="outlined" />}
      />
      <Autocomplete
        id="combo-box-defense"
        className={classes.formField}
        onChange={(e, value) => setDefense(value)}
        options={defenses}
        getOptionLabel={option => option.name}
        renderInput={params => <TextField {...params} label="Defense" variant="outlined" />}
      />
      <Button className={classes.formButton} type="submit" variant="contained">
        Submit Picks
      </Button>
    </form>
  );
};

export default PickForm;
