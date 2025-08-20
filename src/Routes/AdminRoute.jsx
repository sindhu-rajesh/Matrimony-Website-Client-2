import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/UseRole";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();

  if (loading || isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!user || role !== "admin") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default AdminRoute;
