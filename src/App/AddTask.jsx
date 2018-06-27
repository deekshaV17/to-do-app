import React, { Component } from 'react';
import { Input, TextArea, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from './Heading';
import '../styles/AddTask.scss';

import TodoActions from '../actions/TodoActions';
import ReminderModal from "./ReminderModal";
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
    modalIsOpen: false,
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

  toggleModal = () => {
    this.setState(prevState => ({modalIsOpen: !prevState.modalIsOpen}))
  };

  loop = (reminderTime) => {
    var now = new Date();

    if (now.getFullYear() === reminderTime.getFullYear() && now.getMonth() === reminderTime.getMonth() && now.getDate() === reminderTime.getDate() && now.getHours() === reminderTime.getHours() && now.getMinutes() === reminderTime.getMinutes()) {
      this.props.alert.show('abc');
    }
    now = new Date();
    var delay = 60000 - (now % 60000);

    const timeoutId = setTimeout(() => this.loop(reminderTime), delay);
    if(now > reminderTime) {
      clearTimeout(timeoutId);
    }
    };

  setReminder = (value) => {
    const reminderTime = new Date(value.date);
    console.log('cb time', value);
    const newReminderTime = new Date(reminderTime.getFullYear(), reminderTime.getMonth(), reminderTime.getDate(), value.time.hour, value.time.min);
  this.setState({
    reminderTime: newReminderTime
  });
  };

  saveTask = () => {
    this.props.dispatch(TodoActions.createTask(this.state));
    this.loop(this.state.reminderTime);
  };

  render() {
    return (
      <div>
        <Heading />
        <div className='taskInputContainer'>
          <Input
            value={this.state.title}
            placeholder='Add a title'
            onChange={e => this.handleTitleChange(e.target.value)}
          />
          <TextArea
            value={this.state.description}
            placeholder='Add a description...'
            onChange={e => this.handleDescriptionChange(e.target.value)}
          />
        </div>
        <Button onClick={() => this.toggleModal()}>Add reminder</Button>
        <ReminderModal isOpen={this.state.modalIsOpen} closeModal={this.toggleModal} setReminder={this.setReminder}/>
        <div>
          <Link to='/'><Button>Cancel</Button></Link>
          <Link to='/'>
            <Button
              onClick={() => this.saveTask()}
            >
              Save
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

AddTask.propTypes = propTypes;
AddTask.defaultProps = defaultProps;

export default withAlert(AddTask);
