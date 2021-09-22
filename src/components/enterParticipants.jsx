import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddParticipant from "./addParticipant";

export default function EnterParticipants(props) {
  return (
    <div style={{ marginLeft: 30, marginRight: 30, marginBottom: 30 }}>
      <Typography variant="h6">Enter session participants</Typography>
      <Paper
        style={{ padding: 20, marginTop: 10 }}
        elevation={0}
        variant="outlined"
      >
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
            <AddParticipant
              role={"Judge"}
              getName={props.getJudge}
              type={false}
            />
          </Grid>
          <Grid item>
            <AddParticipant
              role={"Prosecutor"}
              getName={props.getProsecutor}
              type={false}
            />
          </Grid>
          <Grid item>
            <AddParticipant
              role={"Lawyer"}
              getName={props.getLawyer}
              type={false}
            />
          </Grid>
          <Grid item>
            <AddParticipant
              role={"Defendant"}
              getName={props.getDefendant}
              type={false}
            />
          </Grid>
          <Grid item>
            <AddParticipant
              role={"Hidden Witness"}
              getName={props.getPlaintiff}
              type={false}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
