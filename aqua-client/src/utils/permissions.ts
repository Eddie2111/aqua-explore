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
    allowedRoutes: ['/admin', '/dashboard', '/logout'],
    restrictedRoutes: ['/user'],
  },
  USER: {
    allowedRoutes: ['/user', '/profile', '/logout'],
    restrictedRoutes: ['/admin'],
  },
  GUEST: {
    allowedRoutes: [
      '/',
      '/login',
      '/signup',
      '/onboarding',
      '/auth/verify',
      '/logout',
    ],
    restrictedRoutes: ['/user', '/admin'],
  },
};
