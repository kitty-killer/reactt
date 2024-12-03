import { createSlice } from '@reduxjs/toolkit';
const initialState = [
  { id: 1, name: "Ben Blocker", job: "Teacher" },
  { id: 2, name: "Dave Defender", job: "Student" },
  { id: 3, name: "Sam Sweeper", job: "Teacher" },
  { id: 4, name: "Matt Midfielder", job: "Student" },
  { id: 5, name: "William Winger", job: "Student" },
  { id: 6, name: "Fillipe Forward", job: "Rector" },
];

const workerSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    addWorker: (state, action) => {
      state.push(action.payload);
    },
    deleteWorker: (state, action) => {
      return state.filter(worker => worker.id !== action.payload);
    },
    updateWorker: (state, action) => {
      const index = state.findIndex(worker => worker.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addWorker, deleteWorker, updateWorker } = workerSlice.actions;
export default workerSlice.reducer;
