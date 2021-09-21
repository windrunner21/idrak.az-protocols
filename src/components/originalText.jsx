import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function OriginalText(props) {
  return (
    <div
      style={{
        margin: 30,
      }}
    >
      <Typography variant="h6" style={{ color: "#191414" }}>
        Original Transcribed Text
      </Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        {props.sessionID === "" || props.sessionID === "none" ? (
          <Typography>Choose a session to view transcribed text</Typography>
        ) : (
          <Grid container direction="column" spacing={2}>
            {props.sessionRecords.map((item, index) => (
              <Grid item key={index}>
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
