import './App.css';
import WorkerAPI from "./api/service";
import Table from "./Table";
import { useState } from "react";


const initialWorkers = WorkerAPI.all();
console.log(initialWorkers);

function App() {
  const [workers, setWorkers] = useState(initialWorkers);
  const delWork = (id) => {
    if (WorkerAPI.delete(id)) {
      setWorkers(workers.filter((worker) => worker.id !== id));
    }
  };
  return (
    <div className="App">
      <Table workers={workers} delWorker={delWork} />
    </div>
  );
}

export default App;
