import React from "react";
import { Paper, Typography } from "@mui/material";

const SessionSummary = ({ elapsedTime, distractions, taskName }) => {
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6">Session Summary:</Typography>
      <Typography>
        <strong>Total Duration:</strong> {formatTime(elapsedTime)}
      </Typography>
      <Typography>
        <strong>Distractions Logged:</strong> {distractions.length}
      </Typography>
      <Typography>
        <strong>Task Name:</strong> {taskName}
      </Typography>
    </Paper>
  );
};

export default SessionSummary;
