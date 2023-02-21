"use strict";
import { Model } from "sequelize";

export interface UserAttributes {
  id: number;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
}
export default  (sequelize: any, DataTypes: any) => {
  class Users extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    userName!: string;
    userEmail!: string;
    userPassword!: string;
    userRole!: string;
    static associate(models: any) {
      Users.belongsToMany(models.Permission, {
        through: "Roles",
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        // defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRole: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
