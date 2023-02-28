'use strict';
import { Model } from "sequelize";

interface roleAttributes {
  UserId: number,
  PermissionId: number
}
export default (sequelize:any, DataTypes:any) => {
  class Roles extends Model<roleAttributes> implements roleAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    UserId!: number;
    PermissionId!: number
    static associate(models: any) {

    }
  }
  Roles.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'Users',
        key:'id'
      },
    },
    PermissionId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'Permission',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};