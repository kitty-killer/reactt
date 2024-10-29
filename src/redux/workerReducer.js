import { ADD_WORKER, DELETE_WORKER, UPDATE_WORKER } from './actions';

const initialState = [
  { id: 1, name: "Ben Blocker", job: "Teacher" },
  { id: 2, name: "Dave Defender", job: "Student" },
  { id: 3, name: "Sam Sweeper", job: "Teacher" },
  { id: 4, name: "Matt Midfielder", job: "Student" },
  { id: 5, name: "William Winger", job: "Student" },
  { id: 6, name: "Fillipe Forward", job: "Rector" },
];

export const workerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORKER:
      return [...state, action.payload];
    case DELETE_WORKER:
      return state.filter(worker => worker.id !== action.payload);
    case UPDATE_WORKER:
      return state.map(worker =>
        worker.id === action.payload.id ? action.payload : worker
      );
    default:
      return state;
  }
};
