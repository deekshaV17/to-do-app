import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from './Heading';
import '../styles/AddTask.scss';

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
    id: null,
    reminderTime: {},
  };

  componentDidMount() {
    const taskData = this.props.currentTask;
    if(JSON.stringify(taskData) !== '{}') {
      this.setState({
        title: taskData.title,
      description: taskData.description,
        id: taskData.id,
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

  saveTask = () => {
    this.props.dispatch(TodoActions.createTask(this.state));
    this.loop(this.state.reminderTime);
  };

  render() {
    return (
      <div className='addTaskContainer'>
        <Heading />
        <div>
          <TaskFields
            title={this.state.title}
            description={this.state.description}
            reminderTime={this.state.reminderTime}
            setReminderTime={this.setReminderTime}
            handleTitleChange={this.handleTitleChange}
            handleDescriptionChange={this.handleDescriptionChange}
          />
          <div className='addTaskButtons'>
            <Link to='/'><Button>Cancel</Button></Link>
            <Link to='/'>
              <Button
                className='saveTaskButton'
                onClick={() => this.saveTask()}
              >
                Save
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

AddTask.propTypes = propTypes;
AddTask.defaultProps = defaultProps;

export default withAlert(AddTask);
