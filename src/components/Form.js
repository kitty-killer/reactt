import { useState } from "react";
import { TextField, Button, Box, Typography } from '@mui/material';

function Form({ addWorker }) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorker = { id: Date.now(), name, job };
    addWorker(newWorker);
    setName('');
    setJob('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Add Worker
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Job"
          variant="outlined"
          fullWidth
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
}

export default Form;
