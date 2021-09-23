import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";

export default function SaveDocument(props) {
  const handleCancel = () => {
    axios
      .get(
        `http://34.65.77.89:8100/voice/proto/v1/records?sessionId=` +
          props.sessionID
      )
      .then((res) => {
        res.data.forEach((element) => {
          props.recordsToExport.push({
            editedText: element["transriptionEdited"],
          });
          props.getRecordsToExport(props.recordsToExport);
        });
      });
  };

  const handleSave = () => {
    for (let index = 0; index < props.recordsToExport.length; index++) {
      const updateText = {
        transriptionEdited: props.recordsToExport[index]["editedText"],
      };

      axios
        .put(
          `http://34.65.77.89:8100/voice/proto/v1/records/` + (index + 1),
          updateText
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    }
  };

  return (
    <Paper
      style={{ marginRight: 30, marginLeft: 30, marginBottom: 60, padding: 20 }}
    >
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button
            style={{ backgroundColor: "#e53935", color: "#fff" }}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleCancel}
          >
            Cancel Changes
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{ backgroundColor: "#03a9f4", color: "#fff" }}
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
