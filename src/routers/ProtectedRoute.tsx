import { ROUTER } from '@/configs/router';
import React from 'react';
import { Route, RouteProps, Navigate } from 'react-router-dom';

interface ProtectedRouteProps extends Omit<RouteProps, 'element'> {
  isAuthenticated?: boolean;
  isAuthorized: boolean;
  redirectPath?: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthorized,
  element: Component,
  ...rest
}) => {
  //   if (!isAuthenticated) {
  //     // User is not authenticated, redirect to login page or display an error
  //     return <Navigate to={ROUTER.LOGIN} />;
  //   }

  if (!isAuthorized) {
    // User doesn't have the required role, show an error message or redirect
    return <Navigate to={ROUTER.UNAUTHORIZE} />;
  }

  return <Route {...rest} element={Component} index={false} />;
};

export default ProtectedRoute;
