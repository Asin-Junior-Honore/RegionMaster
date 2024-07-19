import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ description: 'The email of the admin', example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the admin', example: 'securePassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
