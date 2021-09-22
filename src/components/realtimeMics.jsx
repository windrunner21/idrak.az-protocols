import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function RealtimeMics() {
  const [realData, setRealData] = useState("");

  useEffect(() => {
    // get all notifications
    const sse = new EventSource(
      "http://34.65.77.89:8100/voice/proto/v1/notification",
      {
        withCredentials: true,
      }
    );

    function getRealtimeData(data) {
      // process the data here,
      // then pass it to state to be rendered
      setRealData(data);
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      // error log here

      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);

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
          defaultValue={realData}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label={"Witness Mic"}
          multiline
          fullWidth
          variant="outlined"
          defaultValue={realData}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label={"Hidden Witness Mic"}
          multiline
          fullWidth
          variant="outlined"
          defaultValue={realData}
        />
      </Grid>
    </Grid>
  );
}
