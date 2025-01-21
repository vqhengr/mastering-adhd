import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const TaskNameInput = ({ taskName, setTaskName }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6">Task:</Typography>
    <TextField
      fullWidth
      value={taskName}
      onChange={(e) => setTaskName(e.target.value)}
      variant="outlined"
    />
  </Box>
);

export default TaskNameInput;
