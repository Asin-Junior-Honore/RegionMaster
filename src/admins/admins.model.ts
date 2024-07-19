import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'admins',
  timestamps: true,
})
export class Admin extends Model<Admin> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('admin', 'moderator'),
    allowNull: false,
  })
  role: string;
}
