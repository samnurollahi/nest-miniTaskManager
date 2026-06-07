import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto } from './dto/addTask.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { User, UserEntity } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('task')
@ApiBearerAuth('auth')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('add-task')
  @Role('owner')
  @UseGuards(RoleGuard)
  addTaskToAgent(@Body() addTaskDto: AddTaskDto) {
    return this.taskService.addTaskToAgent(addTaskDto);
  }

  @Get('get-all')
  @Role('owner')
  @UseGuards(RoleGuard)
  getAllTask() {
    return this.taskService.getAllTask();
  }

  @Get('get-my-task')
  myTask(@User() user: UserEntity) {
    return this.taskService.myTask(user);
  }

  @Put('comelept-task:id')
  @ApiParam({ name: 'id' })
  compeletedTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @User() user: UserEntity,
  ) {
    return this.taskService.compeletedTask(id, user);
  }

  @Delete(':id')
  @Role('owner')
  @UseGuards(RoleGuard)
  removeTaskAsUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.taskService.removeTaskAsUser(id);
  }
}
