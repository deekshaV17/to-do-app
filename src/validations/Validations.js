const validateTime = time => time.hour >= 1 && time.hour <= 12 && time.min >= 0 && time.min <= 59;

const validateTask = task => task.title !== '' && task.description !== '';

export {
  validateTime,
  validateTask,
}
