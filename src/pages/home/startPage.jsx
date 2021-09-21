import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "../../components/navigationBar";
import Copyright from "../../components/copyright";
import EnterSandman from "../../components/enterSession";
import EnterParticipants from "../../components/enterParticipants";
import StartSession from "../../components/startSession";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e0f7fa",
    minHeight: "100vh",
  },
}));

export default function StartPage() {
  const classes = useStyles();

  // enter session details
  const [selectedDate, setSelectedDate] = useState(new Date().now);
  const [sessionName, setSessionName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [judgeName, setJudgeName] = useState("");
  const [prosecutorName, setProsecutorName] = useState("");
  const [lawyerName, setLawyerName] = useState("");
  const [defendantName, setDefendantName] = useState("");
  const [plaintiffName, setPlaintiffName] = useState("");

  return (
    <div className={classes.root}>
      <NavigationBar />
      <Grid container alignItems="flex-start">
        <Grid item>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <EnterSandman
                getSessionName={setSessionName}
                getRoomName={setRoomName}
                getSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            </Grid>
            <Grid item>
              <EnterParticipants
                getJudge={setJudgeName}
                getProsecutor={setProsecutorName}
                getLawyer={setLawyerName}
                getDefendant={setDefendantName}
                getPlaintiff={setPlaintiffName}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <StartSession
            sessionName={sessionName}
            roomName={roomName}
            selectedDate={selectedDate}
            judgeName={judgeName}
            prosecutorName={prosecutorName}
            lawyerName={lawyerName}
            defendantName={defendantName}
            plaintiffName={plaintiffName}
          />
        </Grid>
      </Grid>
      <Copyright />
    </div>
  );
}
