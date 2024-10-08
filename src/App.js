import React, { useState } from "react";
import WorkerAPI from "./api/service";
import Table from "./Table";
import Cards from "./Cards";
import Form from "./Form";
import { Button } from "@mui/material";

const initialWorkers = WorkerAPI.all();

function App() {
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
    <div className="App">
      <Form addWorker={addWorker} />
      <Button onClick={() => setView(view === "table" ? "cards" : "table")}>
        Switch to {view === "table" ? "Cards" : "Table"} View
      </Button>
      {view === "table" ? (
        <Table workers={workers} delWorker={delWorker} updateWorker={updateWorker} />
      ) : (
        <Cards workers={workers} delWorker={delWorker} updateWorker={updateWorker} />
      )}
    </div>
  );
}

export default App;
