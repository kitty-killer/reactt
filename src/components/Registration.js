import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Form from "./Form";
const Registration = ({ addWorker, authenticated }) => {
  
  if (!authenticated) {
    return <Typography variant="h6" color="error">You need to log in to access this page</Typography>;
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3
      }}
    >
      <Paper 
        sx={{
          padding: 3,
          width: '100%',
          maxWidth: '400px',
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <Form addWorker={addWorker} />
      </Paper>
    </Box>
  );
};

export default Registration;
