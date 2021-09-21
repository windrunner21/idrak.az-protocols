import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item>
            <TextField
              variant="outlined"
              placeholder="Full name"
              onChange={handleChange}
            />
          </Grid>
          {props.canDelete ? (
            <Grid item>
              <IconButton
                size="small"
                style={{
                  backgroundColor: "#9e9e9e",
                  color: "#fff",
                  marginTop: 30,
                  marginBottom: 30,
                  marginRight: 30,
                }}
                onClick={props.removeWitnessTF}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid>
          ) : (
            <div />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
