import React from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/InsertDriveFile";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function SessionControls() {
  const classes = useStyles();

  const [session, setSession] = React.useState("");

  const handleChange = (event) => {
    setSession(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div style={{ marginTop: 30, marginLeft: 30 }}>
      <Typography variant="h6">Choose session to overview</Typography>
      <Paper
        style={{
          marginTop: 10,
          marginRight: 30,
          marginBottom: 30,
          padding: 10,
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="select-session-outlined">Заседание</InputLabel>
              <Select
                labelId="select-session-outlined"
                id="select-session"
                value={session}
                onChange={handleChange}
                label="Заседание"
              >
                <MenuItem value="">
                  <em>Выбрать заседание</em>
                </MenuItem>
                <MenuItem value={10}>Session A</MenuItem>
                <MenuItem value={20}>Session B</MenuItem>
                <MenuItem value={30}>Session C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleToggle}
            >
              Show Full Document
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
