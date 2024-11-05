// src/components/Table.js
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const WorkerTable = ({ workers, delWorker, updateWorker }) => {
  const handleUpdate = (worker) => {
    const updatedWorker = { ...worker, job: "Updated Job" }; // Пример обновления
    updateWorker(updatedWorker);
  };

  return (
    <TableContainer component={Paper}>
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
              <TableCell>{worker.name}</TableCell>
              <TableCell>{worker.job}</TableCell>
              <TableCell>
                <Button onClick={() => handleUpdate(worker)} variant="contained" color="primary">
                  Update
                </Button>
                <Button onClick={() => delWorker(worker.id)} variant="contained" color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkerTable;
