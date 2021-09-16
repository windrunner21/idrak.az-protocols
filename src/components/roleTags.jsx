import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

export default function RoleTags() {
  const [mics, setMics] = useState([]);

  useEffect(() => {
    // get all mics
    axios.get(`http://34.65.77.89:8100/voice/proto/v1/mics`).then((res) => {
      setMics(res.data);
    });
  }, []);

  return (
    <div style={{ marginRight: 30, marginLeft: 30, marginBottom: 30 }}>
      <Typography variant="h6">Filter and browse by roles</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <Autocomplete
          multiple
          id="mics-get-all"
          disableClearable
          options={mics.map((option) => option["name"])}
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
