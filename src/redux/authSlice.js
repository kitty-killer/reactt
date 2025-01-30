import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Загружаем состояние из localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Сохраняем состояние в localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

// Async thunk для авторизации
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/users', {
      auth: {
        username: credentials.username,
        password: credentials.password,
      },
    });
    return response.data; // Возвращаем данные пользователя
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Async thunk для выхода
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  return null; // Выход — это просто очистка данных на фронтенде
});

const authSlice = createSlice({
  name: 'auth',
  initialState: loadState() || {
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка loginUser
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Сохраняем данные пользователя
        saveState(state); // Сохраняем состояние в localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Обработка logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        saveState(state); // Сохраняем состояние в localStorage
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;