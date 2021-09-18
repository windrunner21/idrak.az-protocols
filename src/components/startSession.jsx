import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Play from "@material-ui/icons/PlayCircleFilledWhite";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import moment from "moment";
import axios from "axios";
import AddWitness from "./addWitness";

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

export default function StartSession(props) {
  const classes = useStyles();

  const [timeStamp, setTimeStamp] = useState(moment().toISOString(true));
  const [endTimeStamp, setEndTimeStamp] = useState(moment().toISOString(true));
  const [sessionName, setSessionName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(0);

  const handleButtonClick = () => {
    setTimeStamp(moment().toISOString(true));
    setSessionName(props.sessionName);
    setRoomName(props.roomName);

    console.log(sessionName);
    console.log(roomName);
    console.log(props.selectedDate);
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

    axios
      .post(`http://34.65.77.89:8100/voice/proto/v1/sessions`, body)
      .then((res) => {
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
    <div style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}>
      <Typography variant="h6">Start Session</Typography>
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Play />}
          onClick={handleButtonClick}
        >
          Start
        </Button>
      </Paper>
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
          justifyContent="space-around"
          alignItems="center"
          style={{ padding: 100 }}
        >
          <Grid item>
            <Typography variant="h5">
              Add Participating Witness in Court
            </Typography>
            <AddWitness />
          </Grid>
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
    </div>
  );
}
