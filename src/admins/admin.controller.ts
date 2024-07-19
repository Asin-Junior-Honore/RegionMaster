import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './create-admin.dto';
import { LoginAdminDto } from './login-admin.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new admin' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 200, description: 'Admin registered successfully' })
  @ApiResponse({ status: 422, description: 'Validation failed or user already exists' })
  async register(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.register(createAdminDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login an admin' })
  @ApiBody({ type: LoginAdminDto })
  @ApiResponse({
    status: 200, description: 'Login successful', schema: {
      example: {
        message: 'Login successful',
        access_token: 'string',
      }
    }
  })
  @ApiResponse({ status: 422, description: 'Validation failed' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }
}
