import React, { Component } from 'react';
import { Input, Button, TextArea } from 'semantic-ui-react';

import ReminderModal from './ReminderModal';

import '../styles/TaskFields.scss';

class TaskFields extends Component {

  state = {
    modalIsOpen: false,
  };

  toggleModal = () => this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));

  render() {
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
        {JSON.stringify(this.props.reminderTime) !== '{}' &&
          <div>
            <div> Reminder added at : {JSON.stringify(this.props.reminderTime)}</div>
            <Button onClick={() => this.toggleModal()}>Edit reminder</Button>
          </div>
        }

        {JSON.stringify(this.props.reminderTime) === '{}' &&
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
