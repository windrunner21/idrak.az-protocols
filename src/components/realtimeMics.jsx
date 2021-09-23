import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function RealtimeMics() {
  const [realDataJudge, setRealDataJudge] = useState([]);
  const [realDataWitness, setRealDataWitness] = useState([]);
  const [realDataHiddenWitness, setRealDataHiddenWitness] = useState([]);

  useEffect(() => {
    // get all notifications
    const sse = new EventSource(
      "http://34.65.77.89:8100/voice/proto/v1/notification",
      {
        withCredentials: false,
      }
    );

    function getRealtimeData(data) {
      // process the data here,
      // then pass it to state to be rendered
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
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      // error log here

      sse.close();
    };
    return () => {
      sse.close();
    };
  }, [realDataHiddenWitness, realDataJudge, realDataWitness]);

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      style={{ marginTop: 15, flexGrow: 1 }}
    >
      <Grid item>
        <TextField
          id="outlined-basic"
          label={"Judge Mic"}
          multiline
          fullWidth
          variant="outlined"
          defaultValue={realDataJudge}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label={"Witness Mic"}
          multiline
          fullWidth
          variant="outlined"
          defaultValue={realDataWitness}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label={"Hidden Witness Mic"}
          multiline
          fullWidth
          variant="outlined"
          defaultValue={realDataHiddenWitness}
        />
      </Grid>
    </Grid>
  );
}
