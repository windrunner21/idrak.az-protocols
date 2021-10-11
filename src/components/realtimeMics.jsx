import React, { useEffect, useState, useRef, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default function RealtimeMics() {
  const [datae, setData] = useState([]);

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

      datae.push({ mic: data["mic"], text: data["text"] });
      setData(datae);
    }
    evtSrc.current.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    evtSrc.current.onerror = (e) => {
      // error log here
      console.log(e);
    };
    // return () => {
    //   evtSrc.current.close();
    // };
  }, [datae, listenEvt]);

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      style={{ marginTop: 15, flexGrow: 1 }}
    >
      {datae.map((item, index) => (
        <Grid item key={index}>
          <Grid container alignItems="flex-end" spacing={2}>
            <Grid item xs={1}>
              <Typography variant="overline">{item.mic} Mic:</Typography>
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              <TextField
                id="outlined-basic"
                multiline
                fullWidth
                disabled
                margin="dense"
                variant="outlined"
                value={item.text}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
