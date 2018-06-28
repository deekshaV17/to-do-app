import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Heading from './Heading';
import '../styles/AddTask.scss';

import { validateTask } from "../validations/Validations";
import { getRandomId } from "../utils/scripts";

import TodoActions from '../actions/TodoActions';
import TaskFields from './TaskFields';

import { withAlert } from "react-alert";

const propTypes = {
  currentTask: PropTypes.object,
  todo: PropTypes.array,
  dispatch: PropTypes.func,
};

const defaultProps = {
  currentTask: {},
  todo: [],
  dispatch: () => {},
};

@connect(store => ({ todo: store.TodoReducer.tasks }))
class AddTask extends Component {

  state = {
    title: '',
    description: '',
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

  loop = (reminderTime) => {
    let now = new Date();

    if (now.getFullYear() === reminderTime.getFullYear() && now.getMonth() === reminderTime.getMonth() && now.getDate() === reminderTime.getDate() && now.getHours() === reminderTime.getHours() && now.getMinutes() === reminderTime.getMinutes()) {
      this.props.alert.show(this.state.title);
    }

    now = new Date();
    const delay = 60000 - (now % 60000);
    const timeoutId = setTimeout(() => this.loop(reminderTime), delay);

    if(now > reminderTime) {
      clearTimeout(timeoutId);
    }
  };

  setReminderTime = (value) => {
    const reminderTime = new Date(value.date);
    const newReminderTime = new Date(reminderTime.getFullYear(), reminderTime.getMonth(), reminderTime.getDate(), value.time.hour, value.time.min);
    this.setState({ reminderTime: newReminderTime });
  };

  removeReminder = () => {
    this.setState({ reminderTime: null });
  };

  saveTask = () => {
    if(this.state.update) {
      this.props.dispatch(TodoActions.updateTask(this.state));
    }
    else {
      this.props.dispatch(TodoActions.createTask(this.state));
    }
    if(this.state.reminderTime)
      this.loop(this.state.reminderTime);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className='addTaskContainer'>
        <Heading location={this.props.location}/>
        <div>
          <TaskFields
            title={this.state.title}
            description={this.state.description}
            reminderTime={this.state.reminderTime}
            removeReminder={this.removeReminder}
            setReminderTime={this.setReminderTime}
            handleTitleChange={this.handleTitleChange}
            handleDescriptionChange={this.handleDescriptionChange}
          />
          <div className='addTaskButtons'>
            <Link to='/'><Button>Cancel</Button></Link>
            <Button
              disabled={!validateTask(this.state)}
              className='saveTaskButton'
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
