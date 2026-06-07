import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register';
import { LoginDto } from './dto/login';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly UserRepo: Repository<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.UserRepo.findOne({ where: { username } });
    if (!user) return new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return new UnauthorizedException();

    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return {
      msg: 'ok',
      token,
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    const isConflict = await this.UserRepo.findOne({ where: { username } });
    if (isConflict) return new ConflictException();

    const user = await this.UserRepo.create({ username, password });
    await this.UserRepo.save(user);

    return { msg: 'ok' };
  }
}
