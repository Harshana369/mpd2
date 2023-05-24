import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  console.log('prv');
  const auth = localStorage.getItem('userInfo');
  return auth.accessToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
