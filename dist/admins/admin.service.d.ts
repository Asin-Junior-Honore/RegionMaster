import { JwtService } from '@nestjs/jwt';
import { Admin } from './admins.model';
import { CreateAdminDto } from './create-admin.dto';
import { LoginAdminDto } from './login-admin.dto';
export declare class AdminService {
    private readonly adminModel;
    private readonly jwtService;
    constructor(adminModel: typeof Admin, jwtService: JwtService);
    register(createAdminDto: CreateAdminDto): Promise<any>;
    login(loginAdminDto: LoginAdminDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
