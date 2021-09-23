import React, { useEffect, useState, useRef, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default function RealtimeMics() {
  const [realDataJudge, setRealDataJudge] = useState([]);
  const [realDataWitness, setRealDataWitness] = useState([]);
  const [realDataHiddenWitness, setRealDataHiddenWitness] = useState([]);

  const evtSrc = useRef(null);
  const listenEvt = useCallback(() => {
    if (!evtSrc.current) {
      evtSrc.current = new EventSource(
        "http://34.65.77.89:8100/voice/proto/v1/notification"
      );
    }
  }, []);

  useEffect(() => {
    // get all notifications
    listenEvt();

    function getRealtimeData(data) {
      // process the data here,
      // then pass it to state to be rendered
      console.log(data);
      if (data["mic"] === "Judge") {
        realDataJudge.push(data["text"]);
        setRealDataJudge(realDataJudge);
      }

      if (data["mic"] === "Witness") {
        realDataWitness.push(data["text"]);
        setRealDataWitness(realDataWitness);
      }

      if (data["mic"] === "Hidden Witness") {
        realDataHiddenWitness.push(data["text"]);
        setRealDataHiddenWitness(realDataHiddenWitness);
      }
    }
    evtSrc.current.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    evtSrc.current.onerror = (e) => {
      // error log here
      console.log(e.type);
      evtSrc.current.close();
    };

    return () => {
      evtSrc.current.close();
    };
  }, [listenEvt, realDataHiddenWitness, realDataJudge, realDataWitness]);

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      style={{ marginTop: 15, flexGrow: 1 }}
    >
      <Grid item>
        <Typography variant="subtitle2">Judge Mic</Typography>
        <TextField
          id="outlined-basic"
          multiline
          fullWidth
          disabled
          variant="outlined"
          value={realDataJudge}
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">Witness Mic</Typography>
        <TextField
          id="outlined-basic"
          multiline
          fullWidth
          disabled
          variant="outlined"
          value={realDataWitness}
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">Hidden Witness Mic</Typography>
        <TextField
          id="outlined-basic"
          multiline
          fullWidth
          disabled
          variant="outlined"
          value={realDataHiddenWitness}
        />
      </Grid>
    </Grid>
  );
}
