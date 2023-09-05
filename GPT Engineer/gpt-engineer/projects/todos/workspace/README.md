Based on the requirements, here are the core classes, functions, and methods that will be necessary for the ToDo web application:

1. Task:
   - Properties:
     - id: string
     - content: string
     - priority: boolean
     - date: string
   - Methods:
     - togglePriority(): void

2. TaskManager:
   - Properties:
     - tasks: array of Task objects
   - Methods:
     - addTask(content: string, priority: boolean, date: string): void
     - deleteTask(id: string): void
     - toggleTaskPriority(id: string): void

3. UI:
   - Methods:
     - renderTasks(tasks: array of Task objects): void
     - renderTask(task: Task object): void
     - clearTasks(): void
     - showErrorMessage(message: string): void

Now let's proceed with creating the necessary files and implementing the code.

1. index.html
