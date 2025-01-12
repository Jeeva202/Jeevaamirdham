import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAdminLoggedIn } from "../redux/cartSlice";

const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);

  if (!isAdminLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
