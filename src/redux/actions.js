export const ADD_WORKER = 'ADD_WORKER';
export const DELETE_WORKER = 'DELETE_WORKER';
export const UPDATE_WORKER = 'UPDATE_WORKER';

export const addWorker = (worker) => ({
  type: ADD_WORKER,
  payload: worker,
});

export const deleteWorker = (id) => ({
  type: DELETE_WORKER,
  payload: id,
});

export const updateWorker = (worker) => ({
  type: UPDATE_WORKER,
  payload: worker,
});
