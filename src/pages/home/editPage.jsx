import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "../../components/navigationBar";
import CopyrightNotSticky from "../../components/copyrightNotSticky";
import SessionControls from "../../components/sessionControls";
import AudioTracks from "../../components/audioTracks";
import RoleTags from "../../components/roleTags";
import OriginalText from "../../components/originalText";
import EditedText from "../../components/editedText";
import SaveDocument from "../../components/saveDocument";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e1f5fe",
    minHeight: "100vh",
  },
}));

export default function EditPage() {
  const classes = useStyles();
  const [sessionId, setSessionId] = useState("none");
  const [sessionRecords, setRecordsBySession] = useState([]);

  return (
    <div className={classes.root}>
      <NavigationBar />
      <SessionControls
        getSession={setSessionId}
        getRecordsBySession={setRecordsBySession}
      />

      <RoleTags />

      <Grid
        container
        direction="row"
        alignItems="stretch"
        justifyContent="space-between"
      >
        <Grid item>
          <AudioTracks sessionID={sessionId} sessionRecords={sessionRecords} />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <OriginalText sessionID={sessionId} sessionRecords={sessionRecords} />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <EditedText sessionID={sessionId} sessionRecords={sessionRecords} />
        </Grid>
      </Grid>

      {sessionId !== "none" ? <SaveDocument /> : <div />}
      <CopyrightNotSticky />
    </div>
  );
}
