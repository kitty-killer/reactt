import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus, deleteMenu, updateMenu, addMenu } from "../redux/menuSlice";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import MenuTable from "../components/MenuTable";
import SearchForm from "../components/SearchForm";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Menu = () => {
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menu.items);
  const menuStatus = useSelector((state) => state.menu.status);
  const error = useSelector((state) => state.menu.error);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleDelete = async (menuId) => {
    try {
      await dispatch(deleteMenu(menuId)).unwrap();
      
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };
  

  const handleEdit = async (menuId, newName) => {
    try {
      await dispatch(updateMenu({ id: menuId, positionName: newName })).unwrap();
      dispatch(fetchMenus());
    } catch (error) {
      console.error("Ошибка при редактировании:", error);
    }
  };

  const handleAddMenu = async () => {
    if (!newMenuName.trim()) {
      alert("Название не может быть пустым!");
      return;
    }
    try {
      const newMenu = { positionName: newMenuName };
      await dispatch(addMenu(newMenu)).unwrap();
      dispatch(fetchMenus());
      setNewMenuName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Ошибка при добавлении:", error);
    }
  };

  const sortedMenus = [...menus].sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));
  const filteredMenus = sortedMenus.filter((menu) =>
    menu.positionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#fff3e0" }}>
      <Header />
      <Container sx={{ flex: 1, py: 4 }}>
        <Typography variant="h3" gutterBottom>Меню Кофейни</Typography>

        <SearchForm onSearch={setSearchQuery} />

        <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>Сортировка:</Typography>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} sx={{ mr: 2 }}>
            <MenuItem value="asc">По возрастанию ID</MenuItem>
            <MenuItem value="desc">По убыванию ID</MenuItem>
          </Select>
          <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
            Добавить запись
          </Button>
        </Box>

        {menuStatus === "loading" && <CircularProgress />}
        {error && <Typography color="error">Ошибка: {error}</Typography>}
        {menuStatus === "succeeded" && (
          <MenuTable menus={filteredMenus} handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </Container>
      <Footer />

      {/* Модальное окно для добавления записи */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2, width: "90%", maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>Добавить новую запись</Typography>
          <TextField fullWidth label="Название позиции" value={newMenuName} onChange={(e) => setNewMenuName(e.target.value)} sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" color="secondary" onClick={() => setIsModalOpen(false)} sx={{ mr: 2 }}>Отмена</Button>
            <Button variant="contained" color="primary" onClick={handleAddMenu}>Добавить</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Menu;
