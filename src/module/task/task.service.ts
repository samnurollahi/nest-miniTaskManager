import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AddTaskDto } from './dto/addTask.dto';
import { TaskModel } from 'src/models/task.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { take } from 'rxjs';

@Injectable()
@UseGuards(AuthGuard)
export class TaskService {
  constructor(
    @InjectRepository(TaskModel)
    private readonly TaskRepo: Repository<TaskModel>,
  ) {}

  async addTaskToAgent(addTaskDto: AddTaskDto) {
    const task = await this.TaskRepo.create(addTaskDto);
    await this.TaskRepo.save(task);

    return {
      msg: 'ok',
    };
  }

  async getAllTask() {
    const tasks = await this.TaskRepo.find({ relations: { agent: true } });
    return {
      msg: 'ok',
      tasks,
    };
  }

  async myTask(user: UserEntity) {
    const myTask = await this.TaskRepo.find({
      where: { agent: user.id as any },
    });
    return {
      msg: 'ok',
      tasks: myTask,
    };
  }

  async compeletedTask(taskId: string, user: UserEntity) {
    const task = await this.TaskRepo.findOne({
      where: { id: taskId },
      relations: { agent: true },
    });
    if (!task)
      return new BadRequestException({}, { description: 'task not found' });

    if (task.agent.id !== user.id) return new UnauthorizedException();

    await this.TaskRepo.update({ id: taskId }, { compeleted: true });
    return {
      msg: 'ok',
    };
  }

  async removeTaskAsUser(id: string) {
    const result = await this.TaskRepo.delete({ id });

    if (!result.affected)
      return new BadRequestException({}, { description: 'task not found' });

    return {
      msg: 'ok',
    };
  }
}
