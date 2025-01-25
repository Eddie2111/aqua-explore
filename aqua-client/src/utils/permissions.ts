export type UserRole = 'ADMIN' | 'USER' | 'GUEST';

export interface RolePermission {
  allowedRoutes: string[];
  restrictedRoutes: string[];
}

export type RolePermissionsMap = {
  [K in UserRole]: RolePermission;
};

export const ROLE_PERMISSIONS: RolePermissionsMap = {
    ADMIN: {
      allowedRoutes: ['/admin', '/dashboard'],
      restrictedRoutes: ['/user']
    },
    USER: {
      allowedRoutes: ['/user', '/profile'],
      restrictedRoutes: ['/admin']
    },
    GUEST: {
      allowedRoutes: ['/', '/login', '/signup', '/onboarding', '/auth/verify'],
      restrictedRoutes: []
    }
  };