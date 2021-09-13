import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function OriginalText() {
  return (
    <div style={{ marginTop: 30, marginBottom: 30, marginLeft: 30 }}>
      <Typography variant="h6">Original Transcribed Text</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Judge"
              multiline
              fullWidth
              disabled
              variant="outlined"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Prosecutor"
              multiline
              fullWidth
              disabled
              variant="outlined"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Lawyer"
              multiline
              fullWidth
              disabled
              variant="outlined"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
