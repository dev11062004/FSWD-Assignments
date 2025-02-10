// Initialize the array of task objects
let tasks = [
  { title: "Task 1", status: "Pending", priority: 3 },
  { title: "Task 2", status: "Completed", priority: 5 },
  { title: "Task 3", status: "Pending", priority: 2 },
];

// Function to render tasks
const renderTasks = () => {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `Task: ${task.title}, Status: ${task.status}, Priority: ${task.priority}`;
    taskList.appendChild(taskItem);
  });
};

// Add Task: Arrow function to add a new task object to the array
const addTask = () => {
  const title = document.getElementById('taskTitle').value;
  const status = document.getElementById('taskStatus').value;
  const priority = parseInt(document.getElementById('taskPriority').value);

  if (title && status && priority >= 1 && priority <= 5) {
    const newTask = { title, status, priority };
    tasks.push(newTask);
    renderTasks();  // Re-render the task list
  } else {
    alert('Please fill out all fields correctly.');
  }
};

// Filter by Status: Function to filter tasks based on their status
const filterByStatus = (status) => {
  const filteredTasks = tasks.filter(task => task.status === status);
  
  // Clear current list and render filtered tasks
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  filteredTasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `Task: ${task.title}, Status: ${task.status}, Priority: ${task.priority}`;
    taskList.appendChild(taskItem);
  });
};

// Find High Priority Task: Function to find the first task with a priority of 5
const findHighPriorityTask = () => {
  const highPriorityTask = tasks.find(task => task.priority === 5);
  const highPriorityElement = document.getElementById('highPriorityTask');
  
  if (highPriorityTask) {
    highPriorityElement.innerHTML = `Task: ${highPriorityTask.title}, Status: ${highPriorityTask.status}, Priority: ${highPriorityTask.priority}`;
  } else {
    highPriorityElement.innerHTML = 'No high priority tasks found.';
  }
};

// Initially render all tasks
renderTasks();
findHighPriorityTask();
