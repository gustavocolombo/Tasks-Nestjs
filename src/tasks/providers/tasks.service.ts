import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/tasks.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  findAll() {
    return this.taskRepo.find();
  }

  async getById(id: number) {
    const taskToFind = await this.taskRepo.findOne({ where: { id } });
    return taskToFind;
  }

  async createTask(task: Task) {
    const taskToCreate = this.taskRepo.create(task);
    await this.taskRepo.save(taskToCreate);

    return taskToCreate;
  }

  async updateTask({ id, description, completed }: Task) {
    const taskToUpdate = await this.taskRepo.findOne({ where: { id } });

    if (!taskToUpdate) {
      throw new Error('Task not found to update');
    }

    this.taskRepo.merge(taskToUpdate, { description, completed });
    return await this.taskRepo.save(taskToUpdate);
  }

  async deleteTask(id: number) {
    const taskToDelete = await this.taskRepo.findOne({ where: { id } });

    if (!taskToDelete) {
      throw new Error('Task not found to delete');
    }

    await this.taskRepo.delete(taskToDelete);
    return true;
  }
}
