import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk для получения меню
export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
  const response = await axios.get("http://localhost:8080/api/v1/menus");
  return response.data;
});

// Async thunk для удаления меню (передаём ID в URL)
export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (menuId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/menus/delete/${menuId}`);
      return menuId;
    } catch (error) {
      console.error("Ошибка удаления:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Ошибка при удалении");
    }
  }
);

// Async thunk для обновления меню
export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (menu, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/menus/update",
        menu
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk для добавления нового меню
export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (newMenu, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/menus/save",
        newMenu
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка при добавлении меню");
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получение меню
      .addCase(fetchMenus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Удаление меню
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Обновление меню
      .addCase(updateMenu.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
