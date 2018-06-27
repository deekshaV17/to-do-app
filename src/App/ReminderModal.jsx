import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

class ReminderModal extends Component {
  render() {
    return (
      <Modal size={'tiny'} open={this.props.open} >
        <Modal.Header>Add a reminder</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative>No</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Yes' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ReminderModal;
