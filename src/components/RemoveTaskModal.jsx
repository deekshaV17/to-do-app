import React from 'react';
import { Modal, Header, Button, Icon} from 'semantic-ui-react';

const RemoveTaskModal = ({isOpen, toggleModal, taskId, callbackHandler}) => (
  <Modal open={isOpen} basic size='mini' centered={false}>
    <Header icon='archive' content='Delete Task' />
    <Modal.Content>
      <p>
        Are you sure you want to delete this task?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted onClick={() => toggleModal()}>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted onClick={() => callbackHandler(taskId)}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

export default RemoveTaskModal;
