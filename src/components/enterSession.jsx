import "date-fns";
import React, { useRef, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Play from "@material-ui/icons/PlayCircleFilledWhite";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import moment from "moment";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  circle: {
    display: "flex",
    width: "500px",
    height: "500px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: "#e2e2e2",
  },
  timer: {
    margin: "auto",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EnterSandman() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date().now);
  const [timeStamp, setTimeStamp] = useState(moment().toISOString(true));
  const [endTimeStamp, setEndTimeStamp] = useState(moment().toISOString(true));
  const [sessionName, setSessionName] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(0);

  const valueRef = useRef("");

  const handleButtonClick = () => {
    setTimeStamp(moment().toISOString(true));
    setSessionName(valueRef.current.value);

    console.log(sessionName);
    console.log(selectedDate);
    console.log(timeStamp);

    setOpen(true);
  };

  // post request to add session
  const handleSubmit = () => {
    setEndTimeStamp(moment().toISOString(true));

    const body = {
      name: sessionName,
      startDate: timeStamp,
      endDate: endTimeStamp,
      room: null,
    };

    axios.post(`34.65.77.89:8100/voice/proto/v1/sessions`, body).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let interval = null;

    if (open) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [open]);

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
                inputRef={valueRef}
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
              <Button
                variant="contained"
                color="primary"
                startIcon={<Play />}
                onClick={handleButtonClick}
              >
                Start
              </Button>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Session in progress
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSubmit}>
                Finish
              </Button>
            </Toolbar>
          </AppBar>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ padding: 100 }}
          >
            <Grid item>
              <div className={classes.circle}>
                <Grid
                  container
                  direction="row"
                  className={classes.timer}
                  justifyContent="center"
                >
                  <Grid item>
                    <Typography variant="h2">
                      {("0" + Math.floor(time / 3600000)).slice(-2)}:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h2">
                      {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h2">
                      {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Dialog>
      </Paper>
    </div>
  );
}
