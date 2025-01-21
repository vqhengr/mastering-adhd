import React, { useState, useEffect, useRef } from "react";
import { Container, Box } from "@mui/material";
import TaskNameInput from "./TaskNameInput";
import TimerDisplay from "./TimerDisplay";
import ControlButtons from "./ControlButtons";
import SessionSummary from "./SessionSummary";
import DistractionModal from "./DistractionModal";

const TimerInterface = () => {
  const [taskName, setTaskName] = useState("Write Research Paper");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [distractions, setDistractions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [distractionInput, setDistractionInput] = useState("");
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      if (!startTimeRef.current) {
        startTimeRef.current = performance.now() - elapsedTime;
      }
      intervalRef.current = setInterval(() => {
        setElapsedTime(performance.now() - startTimeRef.current);
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setElapsedTime(0);
    startTimeRef.current = null;
  };
  const handleLogDistraction = () => {
    setDistractions([...distractions, distractionInput]);
    setDistractionInput("");
    setModalOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <TaskNameInput taskName={taskName} setTaskName={setTaskName} />
      <TimerDisplay elapsedTime={elapsedTime} />
      <ControlButtons
        isRunning={isRunning}
        handleStart={handleStart}
        handlePause={handlePause}
        handleStop={handleStop}
        setModalOpen={setModalOpen}
      />
      <SessionSummary
        elapsedTime={elapsedTime}
        distractions={distractions}
        taskName={taskName}
      />
      <DistractionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        distractionInput={distractionInput}
        setDistractionInput={setDistractionInput}
        handleLogDistraction={handleLogDistraction}
      />
    </Container>
  );
};

export default TimerInterface;
