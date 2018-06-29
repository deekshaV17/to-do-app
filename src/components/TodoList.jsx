import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Checkbox, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Heading from "./Heading";
import EmptyList from "./EmptyList";

import TodoActions from "../actions/TodoActions";

import "../styles/TodoList.scss";
import RemoveTaskModal from "./RemoveTaskModal";

const propTypes = {
  todoList: PropTypes.array,
  editTask: PropTypes.func,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

const defaultProps = {
  todoList: [],
  location: {},
  dispatch: () => {},
  editTask: () => {},
};

@connect(store => ({todoList: store.TodoReducer.tasks}))
class TodoList extends Component {
  state = {
    openModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ openModal: !prevState.openModal }));
  };

  removeTask = (taskId) => {
    this.props.dispatch(TodoActions.removeTask(taskId));
    this.toggleModal();
  };

  getTaskList = () => this.props.todoList.map(task => {
    return (
      <div className="taskContainer" key={task.id}>
        <div className="taskDescriptionContainer">
          <Checkbox
            defaultChecked={task.isComplete}
            onChange={() => this.props.dispatch(TodoActions.toggleCompletion(task.id))}
          />
          <div className="taskDescription">
            <h3 className={task.isComplete ? "markComplete": ""}>{task.title}</h3>
            <div>{task.description}</div>
          </div>
        </div>
        <div className="iconsContainer">
          {task.reminderTime &&
          <Icon name={"bell outline"} size={"large"}/>
          }
          <Link
            to={{ pathname: "/add-task", state: { task: task } }}
            onClick={() => this.props.editTask(task)}
          >
            <Icon name={"pencil alternate"} size={"large"} />
          </Link>
          <Icon name={"trash"} size={"large"} onClick={() => this.toggleModal()}/>
          <RemoveTaskModal
            isOpen={this.state.openModal}
            toggleModal={this.toggleModal}
            taskId={task.id}
            callbackHandler={taskId => this.removeTask(taskId)}
          />
        </div>
      </div>
    )
  });
  render() {
    if(this.props.todoList.length === 0)
      return (
        <EmptyList />
      );
    return (
      <div className="todoListContainer">
        <Heading location={this.props.location}/>
        <div className="todoListItems">
          {this.getTaskList()}
        </div>
      </div>
    )
  }
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;

export default TodoList;
