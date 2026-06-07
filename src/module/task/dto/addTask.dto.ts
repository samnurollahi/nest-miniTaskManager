import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from 'src/models/user.model';

export class AddTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'end of project' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty({ example: 'end of project' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  agent: UserModel;
}
