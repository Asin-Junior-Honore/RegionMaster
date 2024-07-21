import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Regions' })
export class Region extends Model<Region> {
  @Column({ field: 'region_code', primaryKey: true, type: DataType.STRING, allowNull: false })
  region_code: string;

  @Column({ field: 'region_name', type: DataType.STRING, allowNull: false })
  region_name: string;

  @Column({ field: 'status', type: DataType.ENUM('active', 'inactive'), allowNull: false })
  status: string;

  @Column({ field: 'created_on', type: DataType.DATE, allowNull: false })
  created_on: Date;

  @Column({ field: 'created_by', type: DataType.STRING, allowNull: false })
  created_by: string;

  @Column({ field: 'modified_on', type: DataType.DATE, allowNull: false })
  modified_on: Date;

  @Column({ field: 'modified_by', type: DataType.STRING, allowNull: false })
  modified_by: string;
}