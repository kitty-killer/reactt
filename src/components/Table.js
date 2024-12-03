import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField } from '@mui/material';

const TableComponent = ({ workers, delWorker, updateWorker }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedJob, setEditedJob] = useState('');

  const handleEdit = (worker) => {
    setEditingRow(worker.id);
    setEditedName(worker.name);
    setEditedJob(worker.job);
  };

  const handleSave = (id) => {
    updateWorker({ id, name: editedName, job: editedJob });
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedName('');
    setEditedJob('');
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Job</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker) => (
            <TableRow key={worker.id}>
              <TableCell>
                {editingRow === worker.id ? (
                  <TextField
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    fullWidth
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
                    fullWidth
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
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
