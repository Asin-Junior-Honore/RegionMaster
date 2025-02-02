import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './create-admin.dto';
import { LoginAdminDto } from './login-admin.dto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('register')
  async register(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.register(createAdminDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }
}