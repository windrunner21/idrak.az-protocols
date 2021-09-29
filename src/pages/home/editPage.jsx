import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "../../components/navigationBar";
import CopyrightNotSticky from "../../components/copyrightNotSticky";
import Copyright from "../../components/copyright";
import SessionControls from "../../components/sessionControls";
import AudioTracks from "../../components/audioTracks";
import OriginalText from "../../components/originalText";
import EditedText from "../../components/editedText";
import SaveDocument from "../../components/saveDocument";
import { usePromiseTracker } from "react-promise-tracker";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e1f5fe",
    minHeight: "100vh",
  },
}));

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <Grid container justifyContent="center" style={{ marginTop: 100 }}>
        <Grid item>
          <CircularProgress style={{ color: "#03a9f4" }} />
        </Grid>
      </Grid>
    )
  );
};

export default function EditPage() {
  const { promiseInProgress } = usePromiseTracker();
  const classes = useStyles();
  const [sessionId, setSessionId] = useState("none");
  const [sessionRecords, setRecordsBySession] = useState([]);
  const [recordsToExport, setRecordsToExport] = useState([]);

  return (
    <div className={classes.root}>
      <NavigationBar />
      <SessionControls
        getSession={setSessionId}
        getRecordsBySession={setRecordsBySession}
        recordsToExport={recordsToExport}
        getRecordsToExport={setRecordsToExport}
      />

      <LoadingIndicator />
      {!promiseInProgress && (
        <>
          <Grid
            container
            direction="row"
            alignItems="stretch"
            justifyContent="space-between"
          >
            <Grid item>
              <AudioTracks
                sessionID={sessionId}
                sessionRecords={sessionRecords}
              />
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              <OriginalText
                sessionID={sessionId}
                sessionRecords={sessionRecords}
              />
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              <EditedText
                sessionID={sessionId}
                sessionRecords={sessionRecords}
                recordsToExport={recordsToExport}
                getRecordsToExport={setRecordsToExport}
              />
            </Grid>
          </Grid>

          {sessionId !== "none" ? (
            <SaveDocument
              sessionID={sessionId}
              sessionRecords={sessionRecords}
              recordsToExport={recordsToExport}
              getRecordsToExport={setRecordsToExport}
            />
          ) : (
            <div />
          )}
        </>
      )}
      {!promiseInProgress ? <CopyrightNotSticky /> : <Copyright />}
    </div>
  );
}
