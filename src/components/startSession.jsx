import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import RealtimeMics from "./realtimeMics";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  circle: {
    marginTop: 50,
    display: "flex",
    width: "450px",
    height: "450px",
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
  const [sessionName, setSessionName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [pause, setPause] = useState(false);

  const handleButtonClick = () => {
    setTimeStamp(moment().toISOString(true));
    setSessionName(props.sessionName);
    setRoomName(props.roomName);
    setOpen(true);
  };

  // post request to add session
  const handleSubmit = () => {
    // push participants if exist

    // pushing participants - judge
    if (props.judgeName !== "") {
      participants.push({
        participant: {
          id: 1,
          version: 0,
          name: props.judgeName,
          type: "JUDGE",
          session: {
            id: 1,
            version: 0,
            name: sessionName,
            startDate: timeStamp,
            endDate: moment().toISOString(true),
            room: roomName,
          },
        },
      });
    }

    // pushing participants - prosecutor
    if (props.prosecutorName !== "") {
      participants.push({
        participant: {
          id: 2,
          version: 0,
          name: props.prosecutorName,
          type: "PROSECUTOR",
          session: {
            id: 1,
            version: 0,
            name: sessionName,
            startDate: timeStamp,
            endDate: moment().toISOString(true),
            room: roomName,
          },
        },
      });
    }

    // pushing participants - lawyer
    if (props.lawyerName !== "") {
      participants.push({
        participant: {
          id: 3,
          version: 0,
          name: props.lawyerName,
          type: "ADVOCATE",
          session: {
            id: 1,
            version: 0,
            name: sessionName,
            startDate: timeStamp,
            endDate: moment().toISOString(true),
            room: roomName,
          },
        },
      });
    }

    // pushing participants - defendant
    if (props.defendantName !== "") {
      participants.push({
        participant: {
          id: 4,
          version: 0,
          name: props.defendantName,
          type: "DEFENDANT",
          session: {
            id: 1,
            version: 0,
            name: sessionName,
            startDate: timeStamp,
            endDate: moment().toISOString(true),
            room: roomName,
          },
        },
      });
    }

    // pushing participants - hidden witness
    if (props.hiddenWitness !== "") {
      participants.push({
        participant: {
          id: 6,
          version: 0,
          name: props.hiddenWitness,
          type: "HIDDEN_WITNESS",
          session: {
            id: 1,
            version: 0,
            name: sessionName,
            startDate: timeStamp,
            endDate: moment().toISOString(true),
            room: roomName,
          },
        },
      });
    }

    setParticipants(participants);

    const createSession = {
      name: sessionName,
      startDate: timeStamp,
      endDate: moment().toISOString(true),
    };

    axios
      .post(`http://34.65.77.89:8100/voice/proto/v1/sessions`, createSession)
      .then((res) => {
        console.log(res);

        // fixed participants
        participants.forEach((person) => {
          axios
            .post(`http://34.65.77.89:8100/voice/proto/v1/participants`, {
              type: person.participant.type,
              name: person.participant.name,
              session: {
                id: res.data["id"],
              },
            })
            .then((res) => {
              console.log(res);
            });
        });

        // vary witnesses
        witnesses.forEach((person) => {
          axios
            .post(`http://34.65.77.89:8100/voice/proto/v1/participants`, {
              type: person.type,
              name: person.fullName,
              session: {
                id: res.data["id"],
              },
            })
            .then((res) => {
              console.log(res);
            });
        });
      });

    setOpen(false);
    setTime(0);
    setParticipants([]);
    setWitnesses([]);
  };

  const handleClose = () => {
    setOpen(false);
    setTime(0);
    setPause(false);
    setParticipants([]);
    setWitnesses([]);
  };

  useEffect(() => {
    let interval = null;

    if (open && !pause) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [open, pause]);

  return (
    <div style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}>
      <Typography variant="h6">Start Session</Typography>
      <Button
        variant="contained"
        style={{ backgroundColor: "#4caf50", color: "#fff", marginTop: 10 }}
        startIcon={<Play />}
        onClick={handleButtonClick}
      >
        Start
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{
            position: "relative",
            backgroundColor: pause ? "#f44336" : "#4caf50",
          }}
        >
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
              Court session is {pause ? "paused" : "in progress"}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                setPause(!pause);
              }}
            >
              {pause ? "Continue" : "Pause"} session
            </Button>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Finish session
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container direction="column">
          <Grid item>
            <Grid
              container
              justifyContent="space-between"
              alignItems="flex-start"
              style={{ padding: 100 }}
            >
              <Grid item>
                <Grid item>
                  <Typography variant="h6">
                    Add Participating Witness
                  </Typography>
                  <AddWitness
                    witnesses={witnesses}
                    getWitnesses={setWitnesses}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="h6">Court Session Duration</Typography>
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
          </Grid>
          <Grid item style={{ margin: 30 }}>
            <Typography variant="h6">Listen to Real Time Mic Input</Typography>
            <RealtimeMics />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
