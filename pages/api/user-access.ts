import { RolePerm, RoleScopes } from '../../models/roles';

function canAccessPerm(userPerm: RolePerm, requiredPerm: RolePerm) {
  return userPerm >= requiredPerm;
}
function canAccessScopes(userScopes: RoleScopes, requiredScopes: RoleScopes){
    return userScopes >= requiredScopes
}

export {canAccessPerm, canAccessScopes};