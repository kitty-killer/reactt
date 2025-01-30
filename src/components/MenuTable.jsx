import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import InlineEdit from './InlineEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const MenuTable = ({ menus, handleEdit, handleDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название позиции</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menus.map((menu) => (
            <TableRow key={menu.id}>
              <TableCell>{menu.id}</TableCell>
              <TableCell>
                <InlineEdit 
                  value={menu.positionName} 
                  onSave={(newName) => handleEdit(menu.id, newName)} 
                />
              </TableCell>
              <TableCell>
                <IconButton 
                  color="secondary" 
                  onClick={() => {
                    console.log(`Deleting menu with ID: ${menu.id}`); // Для отладки
                    handleDelete(menu.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MenuTable;
