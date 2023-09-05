class TodoItem {
  constructor(id, title, completed) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}

class TodoList {
  constructor() {
    this.items = [];
  }

  addTodoItem(title) {
    const id = Date.now().toString();
    const newItem = new TodoItem(id, title, false);
    this.items.push(newItem);
  }

  editTodoItem(id, newTitle) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.title = newTitle;
    }
  }

  deleteTodoItem(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  markTodoItemAsCompleted(id) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.completed = true;
    }
  }

  getTodoItems() {
    return this.items;
  }
}

class UI {
  constructor(todoList) {
    this.todoList = todoList;
    this.todoListElement = document.getElementById('app');
  }

  renderTodoList() {
    this.todoListElement.innerHTML = '';
    const todoItems = this.todoList.getTodoItems();
    todoItems.forEach(item => {
      const todoItemElement = this.renderTodoItem(item);
      this.todoListElement.appendChild(todoItemElement);
    });
  }

  renderTodoItem(item) {
    const todoItemElement = document.createElement('div');
    todoItemElement.classList.add('todo-item');
    todoItemElement.innerHTML = `
      <input type="checkbox" ${item.completed ? 'checked' : ''}>
      <span>${item.title}</span>
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
    `;
    const checkbox = todoItemElement.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      this.todoList.markTodoItemAsCompleted(item.id);
      this.renderTodoList();
    });
    const editButton = todoItemElement.querySelector('.edit-button');
    editButton.addEventListener('click', () => {
      const newTitle = prompt('Enter new title:', item.title);
      if (newTitle) {
        this.todoList.editTodoItem(item.id, newTitle);
        this.renderTodoList();
      }
    });
    const deleteButton = todoItemElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
      this.todoList.deleteTodoItem(item.id);
      this.renderTodoList();
    });
    return todoItemElement;
  }

  addTodoItem() {
    const title = prompt('Enter todo item title:');
    if (title) {
      this.todoList.addTodoItem(title);
      this.renderTodoList();
    }
  }
}

const todoList = new TodoList();
const ui = new UI(todoList);
ui.renderTodoList();

const addButton = document.createElement('button');
addButton.textContent = 'Add Todo';
addButton.addEventListener('click', () => {
  ui.addTodoItem();
});
document.body.appendChild(addButton);
