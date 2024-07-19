import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsIn } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ description: 'The username of the admin', example: 'adminUser' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'The email of the admin', example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the admin', example: 'securePassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'The role of the admin', example: 'admin', enum: ['admin', 'moderator'] })
  @IsString()
  @IsIn(['admin', 'moderator'], { message: 'Role must be either admin or moderator' })
  role: string;
}
