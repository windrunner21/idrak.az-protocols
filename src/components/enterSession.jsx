import "date-fns";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";

export default function EnterSandman(props) {
  const handleDateChange = (date) => {
    props.getSelectedDate(date);
  };

  const handleSessionNameChange = (sesName) => {
    props.getSessionName(sesName);
  };

  const handleRoomNameChange = (roomName) => {
    props.getRoomName(roomName);
  };

  return (
    <div style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}>
      <Typography variant="h6">Enter session details</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container alignItems="center" spacing={5}>
            <Grid item>
              <TextField
                id="session-name"
                label="Session name"
                variant="outlined"
                onChange={handleSessionNameChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="room-name"
                label="Room name"
                variant="outlined"
                onChange={handleRoomNameChange}
              />
            </Grid>
            <Grid item>
              <KeyboardDatePicker
                disableToolbar
                inputVariant="outlined"
                variant="inline"
                format="dd/MM/yyyy"
                id="date-picker-inline"
                label="Choose date"
                value={props.selectedDate}
                onChange={handleDateChange}
                InputAdornmentProps={{ position: "start" }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              <KeyboardTimePicker
                ampm={false}
                inputVariant="outlined"
                variant="inline"
                label="Choose time"
                InputAdornmentProps={{ position: "start" }}
                value={props.selectedDate}
                orientation="landscape"
                onChange={handleDateChange}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Paper>
    </div>
  );
}
