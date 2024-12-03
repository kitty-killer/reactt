import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import Cards from './Cards';
import Table from './Table';  

const Home = ({ workers, delWorker, updateWorker, view, setView, isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <div>
        <Typography variant="h4" color="error">
          Access Denied! Please log in to view this page.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <h1>Home</h1>
      <Box sx={{ mb: 2 }}>
        <Button onClick={() => setView("table")} variant="contained" color="primary">
          View Table
        </Button>
        <Button onClick={() => setView("cards")} variant="contained" color="secondary">
          View Cards
        </Button>
      </Box>

      {view === "table" ? (
        <Table workers={workers} delWorker={delWorker} updateWorker={updateWorker} />
      ) : (
        <Cards workers={workers} delWorker={delWorker} updateWorker={updateWorker} />
      )}
    </div>
  );
};

export default Home;
