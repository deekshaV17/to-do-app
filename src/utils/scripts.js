
const getRandomId = () => Math.floor(Math.random() * Math.floor(1000));

const getTaskIndex = (taskList, taskId) => taskList.findIndex(task => task.id === taskId);

const getHourOptions = () => {
  let hourOptions = [];
  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      hourOptions.push({key: i, text: '0' + JSON.stringify(i), value: i});
    }
    else {
      hourOptions.push({key: i, text: JSON.stringify(i), value: i});
    }
  }
  return hourOptions;
};

const getMinuteOptions = () => {
  let minuteOptions = [];

  for (let i = 0; i <= 59; i++) {
    if (i < 10) {
      minuteOptions.push({key: i, text: '0' + JSON.stringify(i), value: i});
    }
    else {
      minuteOptions.push({key: i, text: JSON.stringify(i), value: i});
    }
  }
  return minuteOptions;
};

const getTimeOptions = () =>  {return [
  {key: 'AM', text: 'AM', value: 'AM'},
  {key: 'PM', text: 'PM', value: 'PM'}
]};
export {
  getRandomId,
  getTaskIndex,
  getHourOptions,
  getMinuteOptions,
  getTimeOptions,
};
