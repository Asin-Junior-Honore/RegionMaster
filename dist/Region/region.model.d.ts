import { Model } from 'sequelize-typescript';
export declare class Region extends Model<Region> {
    region_code: string;
    region_name: string;
    status: string;
    created_on: Date;
    created_by: string;
    modified_on: Date;
    modified_by: string;
}
