import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Cards from './Cards';
import Table from './Table';  

const LoadingScreen = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0'
  }}>
    <div style={{
      width: '250px',
      height: '250px',
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img 
        src="https://avatars.dzeninfra.ru/get-zen_doc/4423511/pub_60b290510fe5492d0efbe1ba_60b290a81e59e70115cd8131/scale_1200" 
        alt="Loading..." 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  </div>
);

const Home = ({ workers, delWorker, updateWorker, view, setView, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
