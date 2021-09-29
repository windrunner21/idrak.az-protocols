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
import SaveIcon from "@material-ui/icons/InsertDriveFile";
import TextField from "@material-ui/core/TextField";
import { trackPromise } from "react-promise-tracker";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import PDFDocument from "./pdfDocument";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function SessionControls(props) {
  const classes = useStyles();

  const [session, setSession] = useState("");
  const [sessionID, setSessionID] = useState(-1);
  const [open, setOpen] = useState(false);
  // rest api variables
  const [sessions, setSessions] = useState([]);
  const [mics, setMics] = useState([]);
  const [fullDocument, setDocument] = useState("");

  const handleChange = (event) => {
    const { myValue } = event.currentTarget.dataset;
    setSession(event.target.value);
    props.getSession(myValue);
    setSessionID(myValue);

    props.getRecordsBySession([]);
    trackPromise(
      axios
        .get(
          `http://34.65.77.89:8100/voice/proto/v1/records?sessionId=` + myValue
        )
        .then((res) => {
          props.getRecordsBySession(res.data);

          res.data.forEach((element) => {
            props.recordsToExport.push({
              editedText: element["transriptionEdited"],
              id: element["id"],
            });
            props.getRecordsToExport(props.recordsToExport);
          });
        })
    );

    axios
      .get(
        `http://34.65.77.89:8100/voice/proto/v1/participants?sessionId=` +
          myValue
      )
      .then((res) => {
        setMics(res.data);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
    axios
      .get(
        `http://34.65.77.89:8100/voice/proto/v1/fullrecord?sessionId=` +
          sessionID
      )
      .then((res) => {
        setDocument(res.data);
      });
  };

  useEffect(() => {
    // get all sessions

    axios.get(`http://34.65.77.89:8100/voice/proto/v1/sessions`).then((res) => {
      setSessions(res.data);
    });
  }, []);

  return (
    <div style={{ marginTop: 30, marginLeft: 30 }}>
      <Typography variant="h6" style={{ color: "#191414" }}>
        Choose Protocols by Court Session
      </Typography>
      <Paper
        style={{
          marginTop: 10,
          marginRight: 30,
          padding: 20,
        }}
        elevation={0}
        variant="outlined"
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={5}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="select-session-outlined">
                    Browse sessions
                  </InputLabel>
                  <Select
                    labelId="select-session-outlined"
                    id="select-session"
                    value={session}
                    onChange={handleChange}
                    label="Sessions"
                  >
                    {sessions.map((item) => (
                      <MenuItem
                        data-my-value={item["id"]}
                        key={item["id"]}
                        value={item["name"]}
                      >
                        {item["name"]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Autocomplete
                  multiple
                  id="participants-get-all"
                  disableClearable
                  options={mics.map((option) => option["name"])}
                  style={{ paddingBottom: 10 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter participants"
                      margin="normal"
                      variant="outlined"
                      InputProps={{ ...params.InputProps, type: "search" }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              style={{
                backgroundColor:
                  session === "" || session === "none" ? "#d6d6d6" : "#03a9f4",
                color: "#fff",
              }}
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleToggle}
              disabled={session === "" || session === "none"}
            >
              Export Full Document
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <PDFDocument document={fullDocument} />
      </Backdrop>
    </div>
  );
}
