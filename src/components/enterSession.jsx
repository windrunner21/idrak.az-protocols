import "date-fns";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import Play from "@material-ui/icons/PlayCircleFilledWhite";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";

export default function EnterSandman() {
  const [selectedDate, setSelectedDate] = React.useState(new Date().now);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ margin: 30 }}>
      <Typography variant="h6">Enter session details</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container alignItems="center" spacing={5}>
            <Grid item>
              <TextField
                id="session-name"
                label="Session name"
                variant="outlined"
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
                value={selectedDate}
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
                value={selectedDate}
                orientation="landscape"
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" startIcon={<Play />}>
                Start
              </Button>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Paper>
    </div>
  );
}
