import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/tasks.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tasksdev',
      entities: [Task],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    TypeOrmModule.forFeature([Task]),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
