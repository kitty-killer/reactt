// src/App.js
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { addWorker, deleteWorker, updateWorker } from './workerReducer';
import { Button, Box } from "@mui/material";

function App() {
  const workers = useSelector((state) => state.workers);
  const [view, setView] = useState("table");
  const dispatch = useDispatch();

  const delWorker = (id) => {
    dispatch(deleteWorker(id));
  };

  const addWorker = (worker) => {
    dispatch(addWorker(worker));
  };

  const updateWorker = (worker) => {
    dispatch(updateWorker(worker));
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
        <Route path="/" element={<Home view={view} setView={setView} workers={workers} delWorker={delWorker} updateWorker={updateWorker} addWorker={addWorker} />} />
        <Route path="/registration" element={<Registration addWorker={addWorker} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
