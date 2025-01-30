import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then(() => {
        navigate('/'); 
      })
      .catch(() => {
        // Ошибка уже обработана в слайсе
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Вход в систему
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '300px',
          p: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {error && (
          <Alert severity="error" onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}
        <TextField
          label="Имя пользователя"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Загрузка...' : 'Войти'}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;