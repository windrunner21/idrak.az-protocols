import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AddParticipant from "./addParticipant";

export default function AddWitness() {
  const [witnessName, setWitnessName] = useState("");
  const [witnesses, setWitnesses] = useState(0);

  const addWitnessTF = () => {
    setWitnesses(witnesses + 1);
    console.log(witnessName);
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Grid container direction="column" alignItems="flex-start">
        {[...Array(witnesses)].map((_, i) => (
          <Grid item style={{ marginTop: 15 }}>
            <AddParticipant
              role={"Witness #" + (i + 1)}
              getName={setWitnessName}
            />
          </Grid>
        ))}
        <Grid item>
          <IconButton
            size="small"
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              marginTop: 30,
              marginBottom: 30,
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
