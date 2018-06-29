import React, { Component } from "react";
import PropTypes from "prop-types";

import { Input, Button, TextArea } from "semantic-ui-react";

import ReminderModal from "./ReminderModal";
import { getDateFormat, getTimeFormat } from "../utils/scripts";

import "../styles/TaskFields.scss";

const propTypes = {
  task: PropTypes.object,
  handleTitleChange: PropTypes.func,
  handleDescriptionChange: PropTypes.func,
  removeReminder:PropTypes.func,
  setReminderTime: PropTypes.func,
};

const defaultProps = {
  task: {},
  handleTitleChange: ()=> {},
  handleDescriptionChange: ()=> {},
  removeReminder: ()=> {},
  setReminderTime: ()=> {},
};

class TaskFields extends Component {

  state = {
    modalIsOpen: false,
  };

  toggleModal = () => this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));

  render() {
    const task = this.props.task;
    return (
      <div className="taskInputContainer">
        <div className="inputTaskFields">
          <Input
            className="inputField"
            value={task.title}
            placeholder="Add a title"
            onChange={e => this.props.handleTitleChange(e.target.value)}
          />
          <TextArea
            className="textareaField"
            value={task.description}
            placeholder="Add a description..."
            onChange={e => this.props.handleDescriptionChange(e.target.value)}
          />
        </div>
        { task.reminderTime  &&
          <div className="editReminderContainer">
            <div className="reminderInfo">
            <div> Reminder due: </div>
            <div>{getDateFormat(task.reminderTime)}</div>
            <div>Time: {getTimeFormat(task.reminderTime)}</div>
            </div>
            <Button
              onClick={() => this.toggleModal()}
              className="addReminderButton">Edit Reminder
            </Button>
            <Button
              onClick={() => this.props.removeReminder()}
              className="addReminderButton">Remove Reminder
            </Button>
          </div>
        }

        { !task.reminderTime &&
          <Button onClick={() => this.toggleModal()} className="addReminderButton">Add reminder</Button>
        }
        <ReminderModal
          isOpen={this.state.modalIsOpen}
          toggleModal={this.toggleModal}
          setReminderTime={this.props.setReminderTime}
        />
      </div>
    );
  }
}

TaskFields.propTypes = propTypes;
TaskFields.defaultProps = defaultProps;


export default TaskFields;
