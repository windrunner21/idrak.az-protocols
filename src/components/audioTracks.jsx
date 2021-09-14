import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ReactAudioPlayer from "react-audio-player";

export default function AudioTracks() {
  return (
    <div style={{ marginLeft: 30, marginRight: 30 }}>
      <Typography variant="h6">Recorded audio</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <ReactAudioPlayer src="my_audio_file.ogg" autoPlay controls />
      </Paper>
    </div>
  );
}
