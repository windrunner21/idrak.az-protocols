import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ReactAudioPlayer from "react-audio-player";

export default function AudioTracks(props) {
  return (
    <div style={{ marginLeft: 30, marginRight: 30 }}>
      <Typography variant="h6">Recorded audio</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        {props.sessionID === "none" ? (
          <Typography>Choose a session to view audiofiles</Typography>
        ) : (
          props.sessionRecords.map((item, index) => (
            <ReactAudioPlayer
              style={{ marginLeft: 10 }}
              src={"data:audio/wav;base64," + item["audioRecord"]}
              controls
            />
          ))
        )}
      </Paper>
    </div>
  );
}
