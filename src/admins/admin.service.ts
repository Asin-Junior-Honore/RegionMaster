import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './admins.model';
import { CreateAdminDto } from './create-admin.dto';
import { LoginAdminDto } from './login-admin.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin) private readonly adminModel: typeof Admin,
        private readonly jwtService: JwtService
    ) { }

    async register(createAdminDto: CreateAdminDto): Promise<any> {
        const { username, email, password, role } = createAdminDto;

        // Validation logic
        if (!username || !email || !password || !role) {
            throw new UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Username is required', field: 'username' },
                    { message: 'Email is required', field: 'email' },
                    { message: 'Password is required', field: 'password' },
                    { message: 'Role must be either admin or moderator', field: 'role' },
                ],
            });
        }

        // Check if the username or email already exists
        const existingUser = await this.adminModel.findOne({ where: { username } });
        if (existingUser) {
            throw new UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Username already exists', field: 'username' },
                ],
            });
        }

        const existingEmail = await this.adminModel.findOne({ where: { email } });
        if (existingEmail) {
            throw new UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Email already exists', field: 'email' },
                ],
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new this.adminModel({ username, email, password: hashedPassword, role });
        await admin.save();

        return {
            status_code: 200,
            message: 'Admin registered successfully',
        };
    }

    async login(loginAdminDto: LoginAdminDto): Promise<{ message: string, access_token: string }> {
        const { email, password } = loginAdminDto;

        // Validation logic
        if (!email || !password) {
            throw new UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Email is required', field: 'email' },
                    { message: 'Password is required', field: 'password' },
                ],
            });
        }

        const admin = await this.adminModel.findOne({ where: { email } });
        if (!admin) {
            throw new NotFoundException('Admin not found');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Include username in the payload
        const payload = { id: admin.id, username: admin.username, role: admin.role };
        const access_token = this.jwtService.sign(payload);

        return { message: 'Login successful', access_token };
    }
}