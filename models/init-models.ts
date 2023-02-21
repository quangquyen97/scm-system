import  _Permissions  from './permission';
import {  DataTypes } from "sequelize";

import _Roles from './roles'
import _Users from './users'

function initModels(sequelize: any) {
  const Permissions = _Permissions(sequelize, DataTypes);
  const Roles = _Roles(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);

  Permissions.belongsToMany(Users, { as: 'UserId_Users', through: Roles, foreignKey: "PermissionId", otherKey: "UserId" });
  Users.belongsToMany(Permissions, { as: 'PermissionId_Permissions', through: Roles, foreignKey: "UserId", otherKey: "PermissionId" });
  Roles.belongsTo(Permissions, { as: "Permission", foreignKey: "PermissionId"});
  Permissions.hasMany(Roles, { as: "Roles", foreignKey: "PermissionId"});
  Roles.belongsTo(Users, { as: "User", foreignKey: "UserId"});
  Users.hasMany(Roles, { as: "Roles", foreignKey: "UserId"});

  return {
    Permissions,
    Roles,
    Users,
  };
}
export default initModels
