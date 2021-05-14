import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Controller,
} from '@nestjs/common';
import { Task } from '../entities/tasks.entity';
import { TasksService } from '../providers/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getById(id);
  }

  @Post()
  async createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() { description, completed }: Task,
  ): Promise<Task> {
    return this.taskService.updateTask({ id, completed, description });
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<boolean> {
    return this.taskService.deleteTask(id);
  }
}
