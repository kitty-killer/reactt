import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import { addWorker, deleteWorker, updateWorker } from './redux/workerReducer';
import { Button, Box, Typography, CircularProgress } from '@mui/material';

function App() {
  const workers = useSelector((state) => state.workers);
  const dispatch = useDispatch();

  const [view, setView] = useState("table");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false); // Для анимации загрузки
  const [loginStatus, setLoginStatus] = useState(null); // Статус входа: true, false, null

  const navigate = useNavigate();

  const delWorker = (id) => {
    dispatch(deleteWorker(id));
  };

  const addWorkerToState = (worker) => {
    dispatch(addWorker(worker));
  };

  const updateWorkerInState = (worker) => {
    dispatch(updateWorker(worker));
  };

  const handleLogin = (success) => {
    setLoading(true); 
    setLoginStatus(success); 
    setTimeout(() => {
      setLoading(false); 
      if (success) {
        setIsLoggedIn(true); 
        navigate('/');
      }
    }, 4000); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
    setView("table");
    navigate('/login'); 
  };

  return (
    <div className="App">
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {isLoggedIn ? (
          <>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Button component={Link} to="/registration" variant="contained" color="secondary">
              Register
            </Button>
            <Button onClick={handleLogout} variant="contained" color="error">
              Logout
            </Button>
          </>
        ) : (
          <Button component={Link} to="/login" variant="contained" color="success">
            Login
          </Button>
        )}
      </Box>

      {/* Анимация статуса входа */}
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh',
            mb: 2,
          }}
        >
          {loginStatus ? (
            <Typography variant="h6" color="success.main">
              Successfully logged in!
            </Typography>
          ) : (
            <Box>
              <Typography variant="h6" color="error" gutterBottom>
                эмм...  у тебя,кажется лапки,повтори..😑
              </Typography>
              <img
                src="https://yt3.googleusercontent.com/eSIZKBl1sKImaTEqCpGY9ylf47AtkNZuOWFGTCMiOuL0O_IjJEEo9hMwLkvhTVwnxax6wFkfiw=s900-c-k-c0x00ffffff-no-rj"
                 //Супер крутая картинка кота,если ввели неправильный пароль или логин
                alt="Error"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  marginTop: '10px',
                }}
              />
            </Box>
          )}
          <CircularProgress sx={{ ml: 2 }} />
        </Box>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              workers={workers}
              delWorker={delWorker}
              updateWorker={updateWorkerInState}
              view={view}
              setView={setView}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/registration"
          element={<Registration addWorker={addWorkerToState} authenticated={isLoggedIn} />}
        />
        <Route
          path="/login"
          element={<Login handleLogin={(status) => handleLogin(status)} />}
        />
      </Routes>
    </div>
  );
}

export default App;
