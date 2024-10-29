import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { deleteWorker } from './redux/actions';

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
      <nav>
        <Link to="/">Home</Link>
        <Link to="/registration">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home view={view} setView={setView} workers={workers} delWorker={delWorker} updateWorker={updateWorker} />} />
        <Route path="/registration" element={<Registration addWorker={addWorker} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
