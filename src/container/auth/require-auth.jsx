import {
    useLocation,
    Navigate
  } from "react-router-dom";

export function RequireAuth({ children }) {
  let location = useLocation();
  const userData = JSON.parse(sessionStorage.getItem('user'));
  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

