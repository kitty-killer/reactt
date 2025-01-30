import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const InlineEdit = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleSave = () => {
    onSave(newValue);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <TextField 
            value={newValue} 
            onChange={(e) => setNewValue(e.target.value)} 
            variant="standard" 
            size="small"
          />
          <IconButton onClick={handleSave} color="primary">
            <SaveIcon />
          </IconButton>
        </>
      ) : (
        <>
          <span>{value}</span>
          <IconButton onClick={() => setEditing(true)} color="primary">
            <EditIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default InlineEdit;
