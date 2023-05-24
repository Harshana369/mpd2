/* eslint-disable */

import { Navigate } from 'react-router-dom';
import { userRoles } from '../components/routing/Constants';

const RequireAuth = ({ children }) => {
  const isAuthorized = localStorage.getItem('userToken');
  const roles = localStorage.getItem('accessprivilege');

  if (isAuthorized === 'undefined' || isAuthorized === null) {
    return <Navigate to="/login" replace />;
  } else if (userRoles.admin === roles || userRoles.project_Coor === roles) {
    return children;
  }
  localStorage.removeItem('userToken');
  localStorage.removeItem('accessprivilege');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  return <Navigate to="/unauthorized" replace />;
};

export default RequireAuth;
