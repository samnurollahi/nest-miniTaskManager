import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'sam nurollahi',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1234',
  })
  password: string;
}
