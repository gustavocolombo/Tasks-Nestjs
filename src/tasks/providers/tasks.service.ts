import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  async getById(id: number) {
    const taskToFind = await this.taskRepository.findOne({ where: { id } });
    return taskToFind;
  }

  async createTask(task: Task) {
    const taskToCreate = this.taskRepository.create(task);
    await this.taskRepository.save(taskToCreate);

    return taskToCreate;
  }

  async updateTask({ id, description, completed }: Task) {
    const taskToUpdate = await this.taskRepository.findOne({ where: { id } });

    if (!taskToUpdate) {
      throw new Error('Task not found to update');
    }

    this.taskRepository.merge(taskToUpdate, { description, completed });
    return await this.taskRepository.save(taskToUpdate);
  }

  async deleteTask(id: number) {
    const taskToDelete = await this.taskRepository.findOne({ where: { id } });

    if (!taskToDelete) {
      throw new Error('Task not found to delete');
    }

    await this.taskRepository.delete(taskToDelete);
    return true;
  }
}
