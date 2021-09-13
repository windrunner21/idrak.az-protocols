import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { sampleTagsData } from "../data/sampleData";

export default function RoleTags() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div style={{ marginRight: 30 }}>
      <Typography variant="h6">Browse roles</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={sampleTagsData.map((option) => option.tag)}
          style={{ paddingBottom: 10 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search roles"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Chip
              avatar={<Avatar>J</Avatar>}
              label="Judge"
              color="primary"
              onClick={handleClick}
            />
          </Grid>
          <Grid item>
            <Chip
              avatar={<Avatar>L</Avatar>}
              label="Lawyer"
              color="secondary"
              onClick={handleClick}
            />
          </Grid>
          <Grid item>
            <Chip
              avatar={<Avatar>P</Avatar>}
              label="Prosecutor"
              onClick={handleClick}
            />
          </Grid>
          <Grid item>
            <Chip
              avatar={<Avatar>W</Avatar>}
              label="Witness"
              onClick={handleClick}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
