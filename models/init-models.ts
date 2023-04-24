import _Type from "./type";
import { DataTypes } from "sequelize";
import _Roles from "./roles";
import _Users from "./users";

function initModels(sequelize: any) {
  const Type = _Type(sequelize, DataTypes);
  const Roles = _Roles(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);

  Roles.belongsTo(Users, { as: 'Roles_id', foreignKey: "id"});
  Type.belongsTo(Users, { as: 'user_type', foreignKey: "id" });

  Users.hasMany(Roles, { as: "Users_userRole", foreignKey: "id"});
  Users.hasMany(Type, { as: "userType_Type", foreignKey: "id"});

  return {
    Type,
    Roles,
    Users,
  };  
}
export default initModels;
