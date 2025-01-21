import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Modal,
  Paper,
} from "@mui/material";

const TimerInterface = () => {
  const [taskName, setTaskName] = useState("Write Research Paper");
  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [distractions, setDistractions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [distractionInput, setDistractionInput] = useState("");
  const startTimeRef = useRef(null); // Reference for tracking start time
  const intervalRef = useRef(null); // Reference for the interval

  useEffect(() => {
    if (isRunning) {
      // Set the start time reference
      if (!startTimeRef.current) {
        startTimeRef.current = performance.now() - elapsedTime;
      }

      // Start the interval
      intervalRef.current = setInterval(() => {
        setElapsedTime(performance.now() - startTimeRef.current);
      }, 50); // Update every 50ms for better precision
    } else {
      // Clear the interval when the timer stops
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);

  const handlePause = () => {
    setIsRunning(false);
    startTimeRef.current = null; // Reset the start time reference
  };

  const handleStop = () => {
    setIsRunning(false);
    alert("Session stopped. Metrics saved!");
    setElapsedTime(0);
    startTimeRef.current = null; // Reset the start time reference
  };

  const handleLogDistraction = () => {
    setDistractions([...distractions, distractionInput]);
    setDistractionInput("");
    setModalOpen(false);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // Show milliseconds as 2 digits
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {/* Task Name Display */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Task:</Typography>
        <TextField
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          variant="outlined"
        />
      </Box>

      {/* Timer Display */}
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

      {/* Control Buttons */}
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
          <Button
            fullWidth
            variant="contained"
            onClick={() => setModalOpen(true)}
          >
            Log Distr.
          </Button>
        </Grid>
      </Grid>

      {/* Session Summary */}
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

      {/* Back to Home Button */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button variant="contained" color="success" onClick={() => alert("Back to Home!")}>
          Back to Home
        </Button>
      </Box>

      {/* Distraction Logging Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="log-distraction-modal"
        aria-describedby="log-distraction-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="log-distraction-modal">
            Log Distraction
          </Typography>
          <TextField
            fullWidth
            value={distractionInput}
            onChange={(e) => setDistractionInput(e.target.value)}
            label="Distraction Details"
            variant="outlined"
            sx={{ my: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogDistraction}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default TimerInterface;
