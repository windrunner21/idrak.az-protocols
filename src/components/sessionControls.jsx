import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/InsertDriveFile";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function SessionControls(props) {
  const classes = useStyles();

  const [session, setSession] = useState("");
  const [open, setOpen] = useState(false);
  // rest api variables
  const [sessions, setSessions] = useState([]);

  const handleChange = (event) => {
    // TODO CHECK SESSION ID
    setSession(event.target.value);
    props.getSession(event.target.value);
    axios
      .get(`http://34.65.77.89:8100/voice/proto/v1/records?sessionId=` + 1)
      .then((res) => {
        console.log(res.data);
        props.getRecordsBySession(res.data);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // get all sessions
    axios.get(`http://34.65.77.89:8100/voice/proto/v1/sessions`).then((res) => {
      setSessions(res.data);
    });
  }, []);

  return (
    <div style={{ marginTop: 30, marginLeft: 30 }}>
      <Typography variant="h6">Choose session to overview</Typography>
      <Paper
        style={{
          marginTop: 10,
          marginRight: 30,
          marginBottom: 30,
          padding: 10,
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="select-session-outlined">Session</InputLabel>
              <Select
                labelId="select-session-outlined"
                id="select-session"
                value={session}
                onChange={handleChange}
                label="Sessions"
              >
                <MenuItem value="none">
                  <em>Choose a session</em>
                </MenuItem>
                {sessions.map((item, index) => (
                  <MenuItem key={item["id"]} value={item["name"]}>
                    {item["name"]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleToggle}
              disabled={session === "" || session === "none"}
            >
              Show Full Document
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
