import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, IconButton, Menu, MenuItem, Avatar, Modal, Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { logoutUser } from '../../redux/authSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0); 

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
    handleMenuClose();
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleClickerClick = () => {
    setClickCount(clickCount + 1); 
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="./favicon.png" alt="Verwee Coffee" />
        <h1>Verwee Coffee</h1>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/menu">Меню</a></li>
          <li><a href="/about">О нас</a></li>
          <li><a href="/contact">Контакты</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {user ? (
          <>
            <IconButton color="inherit" aria-label="notifications">
              <NotificationsIcon />
            </IconButton>
            <IconButton onClick={handleMenuOpen} color="inherit" aria-label="user-menu">
              <Avatar alt={user.username} src="https://i.pinimg.com/736x/82/ce/81/82ce81fecd6bda8a36407abaa5bc194e.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>

            
            <Modal
              open={isProfileModalOpen}
              onClose={handleCloseProfileModal}
              aria-labelledby="profile-modal-title"
              aria-describedby="profile-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <Typography id="profile-modal-title" variant="h6" component="h2" gutterBottom>
                  Информация о пользователе
                </Typography>
                <Typography id="profile-modal-description" sx={{ mt: 2 }}>
                <Avatar alt={user.username} src="https://i.pinimg.com/736x/82/ce/81/82ce81fecd6bda8a36407abaa5bc194e.jpg" />
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Роль: {user.roles || 'Пользователь'}
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleCloseProfileModal} variant="contained" color="primary">
                    Закрыть
                  </Button>
                </Box>
              </Box>
            </Modal>
          </>
        ) : (
          <>
            <Button className="login-button" href="/login">
              Вход
            </Button>
            <Button className="register-button" href="/register">
              Регистрация
            </Button>
          </>
        )}

        {/* Кнопка кликера и отображение счетчика */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
          <Button variant="contained" color="primary" onClick={handleClickerClick}>
            Кликнуть
          </Button>
          <Typography variant="body1">
            Кликов: {clickCount}
          </Typography>
        </Box>
      </div>
    </header>
  );
};

export default Header;