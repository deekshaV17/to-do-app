import TodoActionsTypes from "../actions/TodoActionsTypes";

const TodoActions = {

  addTask: payload => ({ type: TodoActionsTypes.ADD, payload}),

  removeTask: taskId => ({ type: TodoActionsTypes.REMOVE, payload: taskId}),

  updateTask: payload => ({ type: TodoActionsTypes.UPDATE, payload: payload}),

  toggleCompletion: taskId => ({ type: TodoActionsTypes.TOGGLE, payload: taskId}),

  saveTask: payload => dispatch => {

    if (payload.update) {
      dispatch(TodoActions.updateTask(payload));
    }
    else {
      dispatch(TodoActions.createTask(payload));
    }
  },

  createTask: payload => dispatch => {
    const task = {
      ...payload,
      isComplete: false,
    };
    dispatch(TodoActions.addTask(task));
  },
};

export default TodoActions;
