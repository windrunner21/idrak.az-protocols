import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "../../components/navigationBar";
import Copyright from "../../components/copyright";
import SessionControls from "../../components/sessionControls";
import AudioTracks from "../../components/audioTracks";
import RoleTags from "../../components/roleTags";
import OriginalText from "../../components/originalText";
import EditedText from "../../components/editedText";
import SaveDocument from "../../components/saveDocument";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e2e2e2",
  },
}));

export default function EditPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavigationBar />
      <SessionControls />
      <RoleTags />
      <AudioTracks />
      <Grid container alignItems="flex-start" spacing={5}>
        <Grid item xs={6} mg={6} lg={6}>
          <OriginalText />
        </Grid>
        <Grid item xs={6} mg={6} lg={6}>
          <EditedText />
        </Grid>
      </Grid>
      <SaveDocument />
      <Copyright />
    </div>
  );
}
