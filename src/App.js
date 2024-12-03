import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import { addWorker, deleteWorker, updateWorker } from './redux/workerReducer';
import { Button, Box } from '@mui/material';
function App() {
  const workers = useSelector((state) => state.workers);
  const dispatch = useDispatch();

  const [view, setView] = useState("table");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const delWorker = (id) => {
    dispatch(deleteWorker(id));
  };

  const addWorkerToState = (worker) => {
    dispatch(addWorker(worker));
  };

  const updateWorkerInState = (worker) => {
    dispatch(updateWorker(worker));
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Состояние логина при успешном входе
  };

  return (
    <div className="App">
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Button component={Link} to="/registration" variant="contained" color="secondary">
          Register
        </Button>
        <Button component={Link} to="/login" variant="contained" color="success">
          Login
        </Button>
      </Box>
      <Routes>
        <Route
          path="/"
          element={<Home workers={workers} delWorker={delWorker} updateWorker={updateWorkerInState} view={view} setView={setView} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/registration" element={<Registration addWorker={addWorkerToState} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
