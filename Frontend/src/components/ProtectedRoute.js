import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = Cookies.get('token'); // Get the JWT token from cookies

  return token ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
