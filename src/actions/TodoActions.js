import TodoActionsTypes from '../actions/TodoActionsTypes';

const TodoActions = {

  addTask: payload => ({ type: TodoActionsTypes.ADD, payload}),

  updateTask: payload => ({ type: TodoActionsTypes.UPDATE, payload: payload}),

  createTask: payload => (dispatch) => {
    const task = {
      ...payload,
      isComplete: false,
    };
    dispatch(TodoActions.addTask(task));
  },

  toggleCompletion: taskId => ({ type: TodoActionsTypes.TOGGLE, payload: taskId}),

  removeTask: taskId => ({ type: TodoActionsTypes.REMOVE, payload: taskId}),
};

export default TodoActions;
