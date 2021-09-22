import React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AddParticipant from "./addParticipant";
import CloseIcon from "@material-ui/icons/Close";

export default function AddWitness(props) {
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...props.witnesses];
    list[index]["fullName"] = value;
    props.getWitnesses(list);
  };

  const addWitnessTF = () => {
    props.getWitnesses([...props.witnesses, { fullName: "", type: "WITNESS" }]);
  };

  const removeWitnessTF = (index) => {
    const list = [...props.witnesses];
    list.splice(index, 1);
    props.getWitnesses(list);
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ height: 475 }}
      >
        {props.witnesses.map((_, i) => (
          <Grid item style={{ marginTop: 15 }}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item>
                <AddParticipant
                  role={"Witness #" + (i + 1)}
                  handleInputChange={handleInputChange}
                  type={true}
                  index={i}
                />
              </Grid>
              <Grid item style={{ paddingTop: 30 }}>
                <IconButton
                  size="small"
                  style={{
                    backgroundColor: "#9e9e9e",
                    color: "#fff",
                    marginRight: 30,
                  }}
                  onClick={() => removeWitnessTF(i)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
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
