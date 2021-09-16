import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function OriginalText(props) {
  return (
    <div style={{ marginTop: 30, marginBottom: 30, marginLeft: 30 }}>
      <Typography variant="h6">Original Transcribed Text</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        {props.sessionRecords === [] ? (
          <Typography>Choose a session to view transcribed text</Typography>
        ) : (
          <Grid container direction="column" spacing={2}>
            {props.sessionRecords.map((item, index) => (
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label={item["mic"]["name"]}
                  multiline
                  fullWidth
                  disabled
                  variant="outlined"
                  value={item["transriptionEdited"]}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </div>
  );
}
