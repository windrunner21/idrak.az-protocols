import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 24,
  },
}));

export default function LandingNavigationBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#fff" }}
        elevation={0}
      >
        <Toolbar>
          <Button
            href="/idrak.az-protocols/"
            variant="text"
            className={classes.title}
          >
            Home
          </Button>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                to="/idrak.az-protocols/sign-in"
                component={RouterLink}
                style={{ backgroundColor: "#4db6ac", color: "#fff" }}
                variant="contained"
              >
                Authorization
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
