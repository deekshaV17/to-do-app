import { getTaskIndex } from "../utils/scripts";

const initialState = {
  tasks: [],
};


const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "UPDATE": {
      const taskIndex = getTaskIndex(state.tasks, action.payload.id);
      const newList = [...state.tasks];
      newList[taskIndex] = { ...action.payload };
      return {
        ...state,
        tasks: newList,
      };
    }
    case "TOGGLE": {
      const taskIndex = getTaskIndex(state.tasks, action.payload);
      const newList = [...state.tasks];
      newList[taskIndex].isComplete = !newList[taskIndex].isComplete;
      return {
        ...state,
        tasks: newList,
      };
    }
    case "REMOVE": {
      const taskIndex = getTaskIndex(state.tasks, action.payload);
      const newList = [...state.tasks];
      newList.splice(taskIndex, 1);
      return {
        ...state,
        tasks: newList,
      };
    }
    default:
      return state;
  }
};

export default TodoReducer;
