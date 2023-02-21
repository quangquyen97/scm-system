"use strict";
import { Model, UUIDV4 } from "sequelize";

interface PermissionAttributes {
  id: number;
  permissionName: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Permission
    extends Model<PermissionAttributes>
    implements PermissionAttributes
  {
 
    id!: number;
    permissionName!: string;
    static associate(models: any) {
      Permission.belongsToMany(models.Users, {
        through: "Roles",
      });
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      permissionName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
    },
    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
