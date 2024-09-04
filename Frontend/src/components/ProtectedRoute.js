import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const storedToken = Cookies.get('token');
  console.log('Token in useEffect:', storedToken);
  // setToken(storedToken);

  return storedToken ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
