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


  surprise = (cb) => {
    console.log('in surprise');
    var that = this;
    (function loop() {
      console.log('in loop');
      var now = new Date();
      console.log('year', now.getFullYear(), cb.getFullYear());
      console.log('month', now.getMonth(), cb.getMonth());
      console.log('date', now.getDate(), cb.getDate());
      console.log('hours', now.getHours(), cb.getHours());
      console.log('minutes', now.getMinutes(), cb.getMinutes());
      if (now.getFullYear() === cb.getFullYear() && now.getMonth() === cb.getMonth() && now.getDate() === cb.getDate() && now.getHours() === cb.getHours() && now.getMinutes() === cb.getMinutes()) {
        console.log('inside if');
          that.props.alert.show('abc');
      }
      now = new Date();
      var delay = 60000 - (now % 60000);
      setTimeout(loop, delay);
    })();
  }

  setReminder = (value) => {
    const reminderTime = new Date(value.date);
    console.log('cb time', value);
    const newReminderTime = new Date(reminderTime.getFullYear(), reminderTime.getMonth(), reminderTime.getDate(), value.time.hour, value.time.min);


    this.surprise(newReminderTime);
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
              onClick={() => this.props.dispatch(TodoActions.createTask(this.state))}
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
