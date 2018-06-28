import React, { Component } from "react";
import { Modal, Button, Icon, Input, Menu, Dropdown } from "semantic-ui-react";

import { getHourOptions, getMinuteOptions, getTimeOptions } from "../utils/scripts";
import { validateTime } from "../validations/Validations";
import "../styles/ReminderModal.scss";


class ReminderModal extends Component {
  state = {
    date: new Date(),
    time: {
      hour: "",
      min: "",
    },
    format: "AM",
  };
  handleDateChange = (date) => {
    this.setState({ date: date });
  };

  handleHourChange = (e, { value}) => {
    this.setState(prevState => ({
      time: {
        ...prevState.time,
        hour: value,
      }
    }));
  };

  handleMinuteChange = (e, {value}) => {
    this.setState(prevState => ({
      time: {
        ...prevState.time,
        min: value,
      }
    }));
  };

  handleFormatChange = (e, {value}) => {
    this.setState({ format: value });
  };

  saveReminder = () => {
    if(this.state.format === "PM" && this.state.time.hour === 12) {
      this.setState(prevState => ({
        time: {
          ...prevState.time,
          hour: 0,
        }
      }), () => () => this.props.setReminderTime(this.state))
    }
    else if(this.state.format === "PM") {
      this.setState(prevState => ({
        time: {
          ...prevState.time,
          hour: prevState.time.hour + 12,
        }
      }), () => this.props.setReminderTime(this.state))
    }
    else this.props.setReminderTime(this.state);
    this.props.toggleModal();
  };

  render() {
    return (
      <Modal size={"tiny"} open={this.props.isOpen} centered={false} className="reminderModalContainer">
        <Modal.Header>Add a reminder</Modal.Header>
        <Modal.Content className="reminderModalContent">
          <div>
            <div>Date</div>
            <Input
              type={"date"}
              value={this.state.date}
              className="reminderDateInput"
              onChange={(e) =>  this.handleDateChange(e.target.value)}/>
          </div>
          <div>
            <div>Time</div>
              <div>
              <Dropdown className="reminderTimeInput" placeholder={"Hours"} floating inline scrolling options={getHourOptions()} closeOnChange
                      onChange={(e, {value}) => this.handleHourChange(e, {value})}
              />
              <Dropdown className="reminderTimeInput" placeholder={"Min"} floating inline scrolling options={getMinuteOptions()} closeOnChange
                      onChange={(e, {value}) => this.handleMinuteChange(e, {value})}
              />
              <Dropdown floating inline scrolling options={getTimeOptions()} closeOnChange defaultValue={"AM"}
                    onChange={(e, {value}) => this.handleFormatChange(e, {value})}
              />
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.toggleModal()}>Cancel</Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Add"
            disabled={!validateTime(this.state.time)}
            onClick={() => this.saveReminder()}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ReminderModal;
