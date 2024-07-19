import { AdminService } from './admin.service';
import { CreateAdminDto } from './create-admin.dto';
import { LoginAdminDto } from './login-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    register(createAdminDto: CreateAdminDto): Promise<any>;
    login(loginAdminDto: LoginAdminDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
