import React from "react";
import { Grid, Button } from "@mui/material";

const ControlButtons = ({
  isRunning,
  handleStart,
  handlePause,
  handleStop,
  setModalOpen,
}) => (
  <Grid container spacing={2} sx={{ mb: 3 }}>
    <Grid item xs={3}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleStart}
        disabled={isRunning}
      >
        Start
      </Button>
    </Grid>
    <Grid item xs={3}>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handlePause}
        disabled={!isRunning}
      >
        Pause
      </Button>
    </Grid>
    <Grid item xs={3}>
      <Button
        fullWidth
        variant="contained"
        color="error"
        onClick={handleStop}
      >
        Stop
      </Button>
    </Grid>
    <Grid item xs={3}>
      <Button fullWidth variant="contained" onClick={() => setModalOpen(true)}>
        Log Distr.
      </Button>
    </Grid>
  </Grid>
);

export default ControlButtons;
