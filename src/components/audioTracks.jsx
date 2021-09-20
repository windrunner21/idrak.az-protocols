import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ReactAudioPlayer from "react-audio-player";

export default function AudioTracks(props) {
  return (
    <div
      style={{
        margin: 30,
      }}
    >
      <Typography variant="h6">Original Recorded Audio</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        {props.sessionID === "none" ? (
          <Typography>Choose a session to view audiofiles</Typography>
        ) : (
          <Grid container direction="column" spacing={2}>
            {props.sessionRecords.map((item, index) => (
              <Grid item>
                <ReactAudioPlayer
                  style={{ marginLeft: 10 }}
                  src={"data:audio/wav;base64," + item["audioRecord"]}
                  controls
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </div>
  );
}
