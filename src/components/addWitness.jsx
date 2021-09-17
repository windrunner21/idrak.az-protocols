import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

export default function AddWitness() {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="overline">Add Witnesses</Typography>
      </Grid>
      <Grid item>
        <IconButton
          size="small"
          style={{ backgroundColor: "#4caf50", color: "#fff" }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
