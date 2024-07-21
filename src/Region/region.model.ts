import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Regions', timestamps: false })
export class Region extends Model<Region> {
  @Column({ field: 'RegionCode', primaryKey: true, type: DataType.STRING, allowNull: false })
  RegionCode: string;

  @Column({ field: 'RegionName', type: DataType.STRING, allowNull: false })
  RegionName: string;

  @Column({ field: 'Status', type: DataType.ENUM('active', 'inactive'), allowNull: false })
  Status: string;

  @Column({ field: 'CreatedOn', type: DataType.DATE, allowNull: false })
  CreatedOn: Date;

  @Column({ field: 'CreatedBy', type: DataType.STRING, allowNull: false })
  CreatedBy: string;

  @Column({ field: 'ModifiedOn', type: DataType.DATE, allowNull: false })
  ModifiedOn: Date;

  @Column({ field: 'ModifiedBy', type: DataType.STRING, allowNull: false })
  ModifiedBy: string;
}
