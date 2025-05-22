import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const base = import.meta.env.BASE_URL;

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={`${base}login`} replace />;
  }

  return children;
}

export default ProtectedRoute;
