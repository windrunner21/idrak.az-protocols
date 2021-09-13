import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import ReactAudioPlayer from "react-audio-player";
import { sampleData } from "../data/sampleData";

export default function AudioTracks() {
  const options = sampleData.map((option) => {
    const firstLetter = option.tag[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <div style={{ marginLeft: 30 }}>
      <Typography variant="h6">Listen to testimony and verdicts</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <Autocomplete
          id="grouped-samples"
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.transcribedText}
          style={{ flexGrow: 1, paddingBottom: 20 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search transcribed logs"
              variant="outlined"
            />
          )}
        />
        <Grid container spacing={5}>
          <Grid item xs={2} mg={2} lg={2}>
            <Chip avatar={<Avatar>J</Avatar>} label="Judge" color="primary" />
          </Grid>
          <Grid item>
            <ReactAudioPlayer src="my_audio_file.ogg" autoPlay controls />
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={2} mg={2} lg={2}>
            <Chip avatar={<Avatar>P</Avatar>} label="Prosecutor" />
          </Grid>
          <Grid item>
            <ReactAudioPlayer src="my_audio_file.ogg" autoPlay controls />
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={2} mg={2} lg={2}>
            <Chip
              avatar={<Avatar>L</Avatar>}
              label="Lawyer"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <ReactAudioPlayer src="my_audio_file.ogg" autoPlay controls />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
