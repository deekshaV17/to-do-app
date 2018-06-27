import TodoActionsTypes from '../actions/TodoActionsTypes';
import { getRandomId } from "../utils/scripts";

const TodoActions = {

  addTask: payload => ({ type: TodoActionsTypes.ADD, payload}),

  createTask: payload => (dispatch) => {
    if(payload.id) {
      dispatch(TodoActions.removeTask(payload.id));
    }
    const task = {
      id: getRandomId(),
      isComplete: false,
      title: payload.title,
      description: payload.description,
    };
    dispatch(TodoActions.addTask(task));
  },

  toggleCompletion: taskId => ({ type: TodoActionsTypes.TOGGLE, payload: taskId}),

  removeTask: taskId => ({ type: TodoActionsTypes.REMOVE, payload: taskId}),
};

export default TodoActions;
