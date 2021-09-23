import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import WarningIcon from "@material-ui/icons/Warning";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import axios from "axios";

export default function EditedText(props) {
  const [participants, setParticipants] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("none");

  // handle edited texts
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...props.recordsToExport];
    list[index]["editedText"] = value;
    props.getRecordsToExport(list);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedValue("none");
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  // get all participants
  useEffect(() => {
    axios
      .get(`http://34.65.77.89:8100/voice/proto/v1/participants?sessionId=` + 1)
      .then((res) => {
        setParticipants(res.data);
      });
  }, []);

  return (
    <div
      style={{
        margin: 30,
      }}
    >
      <Typography variant="h6" style={{ color: "#191414" }}>
        Edit Transcribed Text
      </Typography>
      <Paper
        style={{ padding: 20, marginTop: 10 }}
        elevation={0}
        variant="outlined"
      >
        {props.sessionID === "" || props.sessionID === "none" ? (
          <Typography>Choose a session to edit transcribed text</Typography>
        ) : (
          <Grid container direction="column" spacing={2}>
            {props.sessionRecords.map((item, index) => (
              <Grid item key={index}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item style={{ flexGrow: 1 }}>
                    {item["participant"] !== null ? (
                      <TextField
                        id="outlined-basic"
                        label={item["participant"]["name"]}
                        multiline
                        fullWidth
                        variant="outlined"
                        defaultValue={item["transriptionEdited"]}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    ) : (
                      <TextField
                        id="outlined-basic"
                        label={
                          selectedValue === "none"
                            ? item["mic"]["name"]
                            : selectedValue
                        }
                        multiline
                        fullWidth
                        variant="outlined"
                        defaultValue={item["transriptionEdited"]}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    )}
                  </Grid>
                  {item["participant"] !== null || selectedValue !== "none" ? (
                    <div />
                  ) : (
                    <Grid item>
                      <IconButton size="small" onClick={handleClickOpen}>
                        <WarningIcon
                          fontSize="small"
                          style={{ color: "#ffc107" }}
                        />
                      </IconButton>
                      <SimpleDialog
                        participants={participants}
                        selectedValue={selectedValue}
                        open={open}
                        onClose={handleClose}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </div>
  );
}

function SimpleDialog(props) {
  const handleClose = () => {
    props.onClose(props.selectedValue);
  };

  const handleListItemClick = (value) => {
    props.onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">
        Please, set witness name
      </DialogTitle>
      <List>
        {props.participants.map((person) => (
          <ListItem
            button
            onClick={() => handleListItemClick(person["name"])}
            key={person["name"]}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={person["name"]} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
