import React, { Component } from 'react';
import { Input, TextArea, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from './Heading';
import '../styles/AddTask.scss';

import TodoActions from '../actions/TodoActions';
import ReminderModal from "./ReminderModal";

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

  setReminder = (value) => {
    const date = value.date;
    const time = value.time;
    console.log('fgfdfgf', date, time);
  }
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

export default AddTask;
