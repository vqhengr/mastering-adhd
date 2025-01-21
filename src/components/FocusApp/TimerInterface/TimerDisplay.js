import React from "react";
import { Box, Typography } from "@mui/material";

const TimerDisplay = ({ elapsedTime }) => {
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Typography variant="h3">{formatTime(elapsedTime)}</Typography>
    </Box>
  );
};

export default TimerDisplay;
