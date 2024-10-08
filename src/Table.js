import React, { useState } from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

const Table = ({ workers, delWorker, updateWorker }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedJob, setEditedJob] = useState('');
  const [originalData, setOriginalData] = useState({});

  const handleEdit = (worker) => {
    setEditingRow(worker.id);
    setEditedName(worker.name);
    setEditedJob(worker.job);
    setOriginalData({ name: worker.name, job: worker.job });
  };

  const handleSave = (id) => {
    updateWorker(id, editedName, editedJob);
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditedName(originalData.name);
    setEditedJob(originalData.job);
    setEditingRow(null);
  };

  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Job</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker, index) => (
            <TableRow
              key={worker.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#fff",
              }}
            >
              <TableCell>
                {editingRow === worker.id ? (
                  <TextField
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  worker.name
                )}
              </TableCell>
              <TableCell>
                {editingRow === worker.id ? (
                  <TextField
                    value={editedJob}
                    onChange={(e) => setEditedJob(e.target.value)}
                  />
                ) : (
                  worker.job
                )}
              </TableCell>
              <TableCell>
                {editingRow === worker.id ? (
                  <>
                    <Button onClick={() => handleSave(worker.id)} variant="contained" color="primary">
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outlined" color="secondary">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(worker)} variant="contained" color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => delWorker(worker.id)} variant="outlined" color="secondary">
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
