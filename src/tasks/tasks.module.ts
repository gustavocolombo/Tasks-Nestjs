import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './controllers/tasks.controller';
import { Task } from './entities/tasks.entity';
import { TasksService } from './providers/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], //entidades que eu vou trabalhar, então eu tenho que propagar no módulo dela e na raiz
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
