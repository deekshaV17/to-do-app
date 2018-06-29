import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect} from 'react-redux';
import { Link } from "react-router-dom";
import { withAlert } from "react-alert";
import { Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Heading from "./Heading";
import TaskFields from "./TaskFields";
import TodoActions from "../actions/TodoActions";

import { getRandomId, getReminderTime, isReminderDue } from "../utils/scripts";
import { validateTask } from "../validations/Validations";

import "../styles/AddTask.scss";

const propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
};

const defaultProps = {
  dispatch: () => {},
  location: {},
};

@connect(store => ({ todo: store.TodoReducer.tasks }))
class AddTask extends Component {

  state = {
    title: "",
    description: "",
    id: getRandomId(),
    reminderTime: null,
    update: false,
  };

  componentDidMount() {
    if(this.props.location.state && this.props.location.state.task) {
      this.setState({
        ...this.props.location.state.task,
        update: true,
      });
    }
  }
  handleTitleChange = (title) => {
    this.setState({ title });
  };

  handleDescriptionChange = (description) => {
    this.setState({ description });
  };

  setReminderCountdown = (reminderTime) => {
    if (isReminderDue(reminderTime)) {
      this.props.alert.show(this.state.title);
    }
    const now = new Date();
    const delay = 60000 - (now % 60000);
    const timeoutId = setTimeout(() => this.setReminderCountdown(reminderTime), delay);

    if(now > reminderTime) {
      clearTimeout(timeoutId);
    }
  };

  setReminderTime = (value) => {
    const reminderTime = getReminderTime(value);
    this.setState({ reminderTime: reminderTime });
  };

  removeReminder = () => {
    this.setState({ reminderTime: null });
  };

  saveTask = () => {
    this.props.dispatch(TodoActions.saveTask(this.state));

    if(this.state.reminderTime)
      this.setReminderCountdown(this.state.reminderTime);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="addTaskContainer">
        <Heading location={this.props.location}/>
        <div className="taskFieldsContainer">
          <TaskFields
            task={this.state}
            removeReminder={this.removeReminder}
            setReminderTime={this.setReminderTime}
            handleTitleChange={this.handleTitleChange}
            handleDescriptionChange={this.handleDescriptionChange}
          />
          <div className="addTaskButtons">
            <Link to="/"><Button>Cancel</Button></Link>
            <Button
              disabled={!validateTask(this.state)}
              className="saveTaskButton"
              onClick={() => this.saveTask()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AddTask.propTypes = propTypes;
AddTask.defaultProps = defaultProps;

export default withRouter(withAlert(AddTask));
