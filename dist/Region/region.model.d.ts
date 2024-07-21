import { Model } from 'sequelize-typescript';
export declare class Region extends Model<Region> {
    RegionCode: string;
    RegionName: string;
    Status: string;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn: Date;
    ModifiedBy: string;
}
