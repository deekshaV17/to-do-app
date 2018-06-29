import React from "react";
import PropTypes from "prop-types";

import { Modal, Header, Button, Icon} from "semantic-ui-react";

import "../styles/RemoveTaskModal.scss";

const propTypes = {
  isOpen: PropTypes.bool,
  callbackHandler: PropTypes.func,
  toggleModal: PropTypes.func,
  taskId: PropTypes.number,
};

const defaultProps = {
  isOpen: false,
  toggleModal: () => {},
  callbackHandler: () => {},
  taskId: null,
};

const RemoveTaskModal = ({isOpen, toggleModal, taskId, callbackHandler}) => (
  <Modal open={isOpen} basic size="mini" centered={false} className="removeTaskModal">
    <Header icon="archive" content="Delete Task" />
    <Modal.Content>
      <p>
        Are you sure you want to delete this task?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color="red" inverted onClick={() => toggleModal()}>
        <Icon name="remove" /> No
      </Button>
      <Button color="green" inverted onClick={() => callbackHandler(taskId)}>
        <Icon name="checkmark" /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

RemoveTaskModal.propTypes = propTypes;
RemoveTaskModal.defaultProps = defaultProps;

export default RemoveTaskModal;
