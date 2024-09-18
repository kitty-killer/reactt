import './App.css';
import WorkerAPI from "./api/service";
import Table from "./Table";
import { useState } from "react";
import Form from "./Form";


const initialWorkers = WorkerAPI.all();
console.log(initialWorkers);

function App() {
  const [workers, setWorkers] = useState(initialWorkers);
  const delWork = (id) => {
    if (WorkerAPI.delete(id)) {
      setWorkers(workers.filter((worker) => worker.id !== id));
    }
  };

  const addWorker = (worker) => {
    WorkerAPI.add(worker);
    setWorkers([...workers, worker]);
  };

  
  return (
    <div className="App">
      <Form addWorker={addWorker} />
      <Table workers={workers} delWorker={delWork} />
    </div>
  );
}

export default App;
