import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
import { useEffect } from 'react';

export default function PrivateRouteWrapper() {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const address = useAddress();
  const navigate = useNavigate();
  const location = useLocation();

  const protectedRoutes = ['/socialCalls', '/socialAccounts']; // Add more protected routes as needed

  useEffect(() => {
    if (!address && protectedRoutes.includes(location.pathname)) {
      navigate('/', { state: { from: location }, replace: true });
    }
  }, [address, navigate, location]);

  if (!address) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
