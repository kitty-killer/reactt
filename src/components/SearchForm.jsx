import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', mb: 2 }}>
      <TextField
        label="Поиск"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mr: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Поиск
      </Button>
    </Box>
  );
};

export default SearchForm;
