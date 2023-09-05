// Task class
class Task {
  constructor(id, content, priority, date) {
    this.id = id;
    this.content = content;
    this.priority = priority;
    this.date = date;
  }

  togglePriority() {
    this.priority = !this.priority;
  }
}

// TaskManager class
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(content, priority, date) {
    const id = `task-${Date.now()}`;
    const task = new Task(id, content, priority, date);
    this.tasks.push(task);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  toggleTaskPriority(id) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.togglePriority();
    }
  }
}

// UI class
class UI {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.taskForm = document.getElementById('task-form');
    this.taskInput = document.getElementById('task-input');
    this.taskList = document.getElementById('task-list');

    this.taskForm.addEventListener('submit', this.handleAddTask.bind(this));
    this.taskList.addEventListener('click', this.handleTaskAction.bind(this));

    this.renderTasks();
  }

  handleAddTask(event) {
    event.preventDefault();
    const content = this.taskInput.value.trim();
    if (content) {
      this.taskManager.addTask(content, false, '');
      this.taskInput.value = '';
      this.renderTasks();
    }
  }

  handleTaskAction(event) {
    const target = event.target;
    if (target.classList.contains('task-priority')) {
      const taskId = target.dataset.taskId;
      this.taskManager.toggleTaskPriority(taskId);
      this.renderTasks();
    } else if (target.classList.contains('task-delete')) {
      const taskId = target.dataset.taskId;
      this.taskManager.deleteTask(taskId);
      this.renderTasks();
    }
  }

  renderTasks() {
    this.clearTasks();
    this.taskManager.tasks.forEach(task => this.renderTask(task));
  }

  renderTask(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.style.backgroundColor = '#FFFFFF';
    taskElement.style.color = '#000000';
    taskElement.innerHTML = `
      <div class="task-content">${task.content}</div>
      <div class="task-actions">
        <button class="task-priority" data-task-id="${task.id}">Toggle Priority</button>
        <button class="task-delete" data-task-id="${task.id}">Delete</button>
      </div>
    `;
    this.taskList.appendChild(taskElement);
  }

  clearTasks() {
    this.taskList.innerHTML = '';
  }
}

// Initialize the app
const taskManager = new TaskManager();
const ui = new UI(taskManager);
