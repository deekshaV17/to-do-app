import React, { Component } from 'react';
import { Modal, Button, Icon, Input, Menu, Dropdown } from 'semantic-ui-react';

let hourOptions = [];
let minuteOptions = [];
for( let i = 1; i<=12; i++) {
  hourOptions.push({key: i, text: JSON.stringify(i), value: i});
}
for( let i = 0; i<=59; i++) {
  minuteOptions.push({key: i, text: JSON.stringify(i), value: i});
}

const timeOptions = [
  {key: 'AM', text: 'AM', value: 'AM'},
  {key: 'PM', text: 'PM', value: 'PM'}
];

class ReminderModal extends Component {
  state = {
    date: new Date(),
    time: {
      hour: '',
      min: '',
    },
    format: 'AM',
  };
  handleChange = (date) => {
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
    if(this.state.format === 'PM' && this.state.time.hour === 12) {
      this.setState(prevState => ({
        time: {
          ...prevState.time,
          hour: 0,
        }
      }), () => () => this.props.setReminder(this.state))
    }
    else if(this.state.format === 'PM') {
      this.setState(prevState => ({
        time: {
          ...prevState.time,
          hour: prevState.time.hour + 12,
        }
      }), () => this.props.setReminder(this.state))
    }
    else this.props.setReminder(this.state);
    this.props.closeModal();
  };

  render() {
    return (
      <Modal size={'tiny'} open={this.props.isOpen} centered={false}>
        <Modal.Header>Add a reminder</Modal.Header>
        <Modal.Content>
          <div>date</div>
          <Input type={'date'} value={this.state.date} onChange={(e) =>  this.handleChange(e.target.value)}/>
          <Menu compact>
            <Dropdown placeholder={'Hours'} floating inline scrolling options={hourOptions} closeOnChange
                      onChange={(e, {value}) => this.handleHourChange(e, {value})}
            />
          </Menu>
          <Menu compact>
            <Dropdown placeholder={'Min'} floating inline scrolling options={minuteOptions} closeOnChange
                      onChange={(e, {value}) => this.handleMinuteChange(e, {value})}
            />
          </Menu>
          <Dropdown floating inline scrolling options={timeOptions} closeOnChange defaultValue={'AM'}
                    onChange={(e, {value}) => this.handleFormatChange(e, {value})}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.closeModal()}>Cancel</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Add' onClick={() => this.saveReminder()}/>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ReminderModal;
