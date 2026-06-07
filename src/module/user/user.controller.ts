import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(UserModel)
    private readonly UserRepo: Repository<UserModel>,
  ) {}

  @Get('get-user')
  @UseGuards(AuthGuard)
  @Role('owner')
  @UseGuards(RoleGuard)
  getUser() {
    return this.UserRepo.find({ where: {} });
  }
}
