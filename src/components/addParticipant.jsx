import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddParticipant(props) {
  const handleChange = (name) => {
    props.getName(name);
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="subtitle2">{props.role}</Typography>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          placeholder="Full name"
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}
