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
      <Typography variant="h6" style={{ color: "#191414" }}>
        Original Recorded Audio
      </Typography>
      <Paper
        style={{ padding: 20, marginTop: 10 }}
        elevation={0}
        variant="outlined"
      >
        {props.sessionID === "none" ? (
          <Typography>Choose a session to view audiofiles</Typography>
        ) : (
          <Grid container direction="column" spacing={1}>
            {props.sessionRecords.map((item, index) => (
              <Grid item key={index}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {item["mic"]["name"]}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <ReactAudioPlayer
                      src={"data:audio/wav;base64," + item["audioRecord"]}
                      controls
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </div>
  );
}
