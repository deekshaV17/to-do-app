
const getRandomId = () => Math.floor(Math.random() * Math.floor(1000));

const getTaskIndex = (taskList, taskId) => taskList.findIndex(task => task.id === taskId);

export {
  getRandomId,
  getTaskIndex,
};
