import React, { Component } from 'react';
import { Input, Button, TextArea } from 'semantic-ui-react';
import { getDateFormat, getTimeFormat } from "../utils/scripts";

import ReminderModal from './ReminderModal';

import '../styles/TaskFields.scss';

class TaskFields extends Component {

  state = {
    modalIsOpen: false,
  };

  toggleModal = () => this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));

  render() {
    const reminderTime = this.props.reminderTime;
    return (
      <div className='taskInputContainer'>
        <div className='inputTaskFields'>
          <Input
            className='inputField'
            value={this.props.title}
            placeholder='Add a title'
            onChange={e => this.props.handleTitleChange(e.target.value)}
          />
          <TextArea
            className='textareaField'
            value={this.props.description}
            placeholder='Add a description...'
            onChange={e => this.props.handleDescriptionChange(e.target.value)}
          />
        </div>
        {JSON.stringify(reminderTime) !== '{}' &&
          <div className='editReminderContainer'>
            <div className='reminderInfo'>
            <div> Reminder added at : </div>
            <div>{getDateFormat(reminderTime)}</div>
            <div>Time: {getTimeFormat(reminderTime)}</div>
            </div>
            <Button
              onClick={() => this.toggleModal()}
              className='addReminderButton'>Edit Reminder
            </Button>
            <Button
              onClick={() => this.props.removeReminder()}
              className='addReminderButton'>Remove Reminder
            </Button>
          </div>
        }

        {JSON.stringify(reminderTime) === '{}' &&
          <Button onClick={() => this.toggleModal()} className='addReminderButton'>Add reminder</Button>
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


export default TaskFields;
