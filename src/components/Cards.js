import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Grid, TextField } from "@mui/material";

const Cards = ({ workers, delWorker, updateWorker }) => {
  const [editingCard, setEditingCard] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedJob, setEditedJob] = useState('');

  const handleEdit = (worker) => {
    setEditingCard(worker.id);
    setEditedName(worker.name);
    setEditedJob(worker.job);
  };

  const handleSave = (id) => {
    updateWorker({ id, name: editedName, job: editedJob });
    setEditingCard(null);
  };

  const handleCancel = () => {
    setEditingCard(null);
    setEditedName('');
    setEditedJob('');
  };

  return (
    <Grid container spacing={2}>
      {workers.map((worker) => (
        <Grid item xs={12} sm={6} md={4} key={worker.id}>
          <Card>
            <CardContent>
              {editingCard === worker.id ? (
                <>
                  <TextField
                    label="Name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Job"
                    value={editedJob}
                    onChange={(e) => setEditedJob(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <Button onClick={() => handleSave(worker.id)} variant="contained" color="primary">
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outlined" color="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h5">{worker.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {worker.job}
                  </Typography>
                  <Button onClick={() => handleEdit(worker)} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => delWorker(worker.id)} variant="outlined" color="secondary">
                    Delete
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
