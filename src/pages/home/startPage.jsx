import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../../components/navigationBar";
import Copyright from "../../components/copyright";
import EnterSandman from "../../components/enterSession";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e2e2e2",
    height: "100vh",
  },
}));

export default function StartPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavigationBar />
      <EnterSandman />
      <Copyright />
    </div>
  );
}
