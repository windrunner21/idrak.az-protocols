import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AddParticipant from "./addParticipant";
// import useWindowDimensions from "../data/windowDimensions";

export default function AddWitness() {
  const [witnessName, setWitnessName] = useState("");
  const [witnesses, setWitnesses] = useState(0);
  // const { windowHeight } = useWindowDimensions();

  const addWitnessTF = () => {
    setWitnesses(witnesses + 1);
    console.log(witnessName);
  };

  const removeWitnessTF = () => {
    setWitnesses(witnesses - 1);
    console.log(witnessName);
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ height: 725 }}
      >
        {[...Array(witnesses)].map((_, i) => (
          <Grid item style={{ marginTop: 15 }}>
            <AddParticipant
              role={"Witness #" + (i + 1)}
              getName={setWitnessName}
              canDelete={true}
              removeWitnessTF={removeWitnessTF}
            />
          </Grid>
        ))}
        <Grid item>
          <IconButton
            size="small"
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              marginTop: 15,
              marginBottom: 15,
            }}
            onClick={addWitnessTF}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
