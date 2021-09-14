import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import { sampleTagsData } from "../data/sampleData";

export default function RoleTags() {
  return (
    <div style={{ marginRight: 30, marginLeft: 30, marginBottom: 30 }}>
      <Typography variant="h6">Filter and browse by roles</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <Autocomplete
          multiple
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
      </Paper>
    </div>
  );
}
