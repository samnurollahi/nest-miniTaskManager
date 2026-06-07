import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { TaskModule } from './module/task/task.module';
import { TaskModel } from './models/task.model';

@Module({
  imports: [
    TaskModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      password: 'root',
      username: 'postgres',
      database: 'miniTask',
      port: 5432,
      host: 'localhost',
      entities: [UserModel, TaskModel],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {
        expiresIn: '5h',
      },
    }),
  ],
})
export class AppModule {}
