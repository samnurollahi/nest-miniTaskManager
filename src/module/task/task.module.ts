import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModel } from 'src/models/task.model';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([TaskModel])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
