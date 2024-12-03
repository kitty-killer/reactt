import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import { Button, Box, Typography, CircularProgress } from '@mui/material';

function App() {
  const [workers, setWorkers] = useState([]);
  const [view, setView] = useState("table");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);

  const navigate = useNavigate();

  // Загрузка сотрудников с сервера
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get('http://localhost:8080/api/workers')
        .then((response) => setWorkers(response.data))
        .catch((error) => console.error('Error fetching workers:', error));
    }
  }, [isLoggedIn]);

  const handleLogin = (username, password) => {
    setLoading(true);
    axios
      .post('http://localhost:8080/api/auth/login', { username, password })
      .then(() => {
        setLoginStatus(true);
        setTimeout(() => {
          setLoading(false);
          setIsLoggedIn(true);
          navigate('/');
        }, 7000);
      })
      .catch(() => {
        setLoginStatus(false);
        setLoading(false);
      });
  };

  const addWorkerToState = (worker) => {
    axios
      .post('http://localhost:8080/api/workers', worker)
      .then((response) => setWorkers((prev) => [...prev, response.data]))
      .catch((error) => console.error('Error adding worker:', error));
  };

  const delWorker = (id) => {
    axios
      .delete(`http://localhost:8080/api/workers/${id}`)
      .then(() => setWorkers((prev) => prev.filter((worker) => worker.id !== id)))
      .catch((error) => console.error('Error deleting worker:', error));
  };

  const updateWorkerInState = (worker) => {
    axios
      .put(`http://localhost:8080/api/workers/${worker.id}`, worker)
      .then((response) =>
        setWorkers((prev) =>
          prev.map((w) => (w.id === response.data.id ? response.data : w))
        )
      )
      .catch((error) => console.error('Error updating worker:', error));
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
          {loginStatus === true ? (
            <Typography variant="h6" color="success.main">
              Successfully logged in!
            </Typography>
          ) : loginStatus === false ? (
            <Box>
              <Typography variant="h6" color="error">
                эмм...  у тебя,кажется лапки,повтори..😑
              </Typography>
              <img
                src="https://yt3.googleusercontent.com/eSIZKBl1sKImaTEqCpGY9ylf47AtkNZuOWFGTCMiOuL0O_IjJEEo9hMwLkvhTVwnxax6wFkfiw=s900-c-k-c0x00ffffff-no-rj"
                alt="Error"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  marginTop: '10px',
                }}
              />
            </Box>
          ) : null}
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
          element={<Login handleLogin={(username, password) => handleLogin(username, password)} />}
        />
      </Routes>
    </div>
  );
}

export default App;
