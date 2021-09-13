import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

export default function SaveDocument() {
  return (
    <Paper
      style={{ marginRight: 30, marginLeft: 30, marginBottom: 60, padding: 20 }}
    >
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Cancel Changes
          </Button>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" startIcon={<SaveIcon />}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
