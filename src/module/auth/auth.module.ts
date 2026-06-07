import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(
    @InjectRepository(UserModel)
    private readonly UserRepo: Repository<UserModel>,
  ) {}

  async onModuleInit() {
    const users = await this.UserRepo.find({ where: { role: 'owner' } });
    if (users.length == 0) {
      const user = await this.UserRepo.create({
        username: 'owner',
        password: '1234',
        role: 'owner',
      });
      await this.UserRepo.save(user);
      new Logger().log('user owner is created ✅', 'AuthModule');
    }
  }
}
