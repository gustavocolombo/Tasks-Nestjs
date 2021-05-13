import { Injectable } from '@nestjs/common';
import { Task } from '../task';

@Injectable()
export class TasksService {
  tasks: Task[] = [
    { id: 1, description: 'Search about NestJs', completed: true },
    { id: 2, description: 'Learn NestJs', completed: false },
    { id: 3, description: 'Build project alone', completed: false },
  ];

  getAll() {
    return this.tasks;
  }

  getById(id: number) {
    const task = this.tasks.find((value) => value.id == id);
    return task;
  }

  createTask(task: Task) {
    let lastId = 0;

    if (this.tasks.length > 0) {
      lastId = this.tasks[this.tasks.length - 1].id;
    }

    task.id = lastId + 1;

    this.tasks.push(task);

    return task;
  }

  updateTask(task: Task) {
    const taskArray = this.tasks.find((value) => value.id == task.id);

    if (taskArray) {
      task.description = task.description;
      task.completed = task.completed;
    }

    return taskArray;
  }

  deleteTask(id: number) {
    const taskToDelete = this.tasks.findIndex((value) => value.id == id);
    this.tasks.splice(taskToDelete, 1);
  }
}
