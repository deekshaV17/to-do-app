
const getRandomId = () => Math.floor(Math.random() * Math.floor(1000));

const getTaskIndex = (taskList, taskId) => taskList.findIndex(task => task.id === taskId);

const getHourOptions = () => {
  const hourOptions = [];
  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      hourOptions.push({ key: i, text: "0" + JSON.stringify(i), value: i });
    }
    else {
      hourOptions.push({ key: i, text: JSON.stringify(i), value: i });
    }
  }
  return hourOptions;
};

const getMinuteOptions = () => {
  const minuteOptions = [];

  for (let i = 0; i <= 59; i++) {
    if (i < 10) {
      minuteOptions.push({ key: i, text: "0" + JSON.stringify(i), value: i });
    }
    else {
      minuteOptions.push({ key: i, text: JSON.stringify(i), value: i });
    }
  }
  return minuteOptions;
};

const getTimeOptions = () => [
  { key: "AM", text: "AM", value: "AM" },
  { key: "PM", text: "PM", value: "PM" },
];

const getMonthMapping = (month) => {
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "Jan";
  }
};

const getDateFormat = (date) => {
  const day = JSON.stringify(date.getDate());
  const month = getMonthMapping(date.getMonth());
  const year = JSON.stringify(date.getFullYear());
  return `${day} ${month}, ${year}`;
};

const getTimeFormat = (time) => {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let format = "AM";
  if (time.getHours() === 0) {
    hours = 12;
  }
  if (time.getHours() >= 12 && time.getHours < 13) {
    format = "PM";
  }
  if (time.getHours() >= 13) {
    hours = time.getHours() - 12;
    format = "PM";
  }
  if (hours < 10) {
    hours = `0${JSON.stringify(hours)}`;
  }
  if (minutes < 10) {
    minutes = `0${JSON.stringify(minutes)}`;
  }
  return `${hours} : ${minutes} ${format}`;
};

const isReminderDue = reminderTime => {
  const now = new Date();

  return now.getFullYear() === reminderTime.getFullYear() && now.getMonth() === reminderTime.getMonth() && now.getDate() === reminderTime.getDate() && now.getHours() === reminderTime.getHours() && now.getMinutes() === reminderTime.getMinutes();
};

const getReminderTime = value => {
  const reminderTime = new Date(value.date);

  return new Date(reminderTime.getFullYear(), reminderTime.getMonth(), reminderTime.getDate(), value.time.hour, value.time.min);
};

export {
  getRandomId,
  getTaskIndex,
  getHourOptions,
  getMinuteOptions,
  getTimeOptions,
  getDateFormat,
  getTimeFormat,
  getReminderTime,
  isReminderDue,
};
