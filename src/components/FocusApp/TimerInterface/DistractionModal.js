import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const DistractionModal = ({
  isOpen,
  onClose,
  distractionInput,
  setDistractionInput,
  handleLogDistraction,
}) => (
  <Modal
    open={isOpen}
    onClose={onClose}
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
);

export default DistractionModal;
