import { Authorities } from '@/contexts/AuthContext';

export const isGrantedPermission = (
  permission: Authorities | null,
  resource: string,
  scope: string
) => {
  if (!permission) return false;
  else {
    if (permission.isRoot) return true;
    const permissionKey = `${resource}:${scope}`;
    return permission.grantedPermissions.includes(permissionKey);
  }
};
