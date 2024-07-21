import { IsString, IsEmail, IsNotEmpty, IsIn } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsIn(['admin', 'moderator'], { message: 'Role must be either admin or moderator' })
  role: string;
}