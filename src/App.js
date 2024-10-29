import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WorkerAPI from "./api/service";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";

const initialWorkers = WorkerAPI.all();

function App() {
  useEffect(() => {
    console.log("App component rendered");
  }, []);

  const [workers, setWorkers] = useState(initialWorkers);
  const [view, setView] = useState("table");

  const delWorker = (id) => {
    if (WorkerAPI.delete(id)) {
      setWorkers(workers.filter((worker) => worker.id !== id));
    }
  };

  const addWorker = (worker) => {
    WorkerAPI.add(worker);
    setWorkers([...workers, worker]);
  };

  const updateWorker = (id, name, job) => {
    WorkerAPI.update({ id, name, job });
    setWorkers(workers.map(w => w.id === id ? { id, name, job } : w));
  };

  return (
    <Router>
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
    </Router>
  );
}

export default App;
