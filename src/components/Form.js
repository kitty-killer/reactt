import { useState } from "react";
import './Form.css';

function Form({ addWorker }) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleSubmit = (e) => {
  e.preventDefault();
    const newWorker = { id: Date.now(), name, job };
    addWorker(newWorker);
    setName('');
    setJob('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-worker-form">
      <h2>Add Worker</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Job:</label>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
