import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
const ProtectedRouter = ({ stateLogins, children }) => {
  const token = useAuth();
  console.log("================================");
  console.log('token', token);
  console.log(stateLogins);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRouter;
