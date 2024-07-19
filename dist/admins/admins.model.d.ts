import { Model } from 'sequelize-typescript';
export declare class Admin extends Model<Admin> {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
}
