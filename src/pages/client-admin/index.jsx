import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function AdminTemplate() {
  const { data } = useSelector((state) => state.authReducer);
  if (!data) {
    return <Navigate to="/auth" />;
  }
  return (
    <div>
      AdminTemplate
      <Outlet />
    </div>
  );
}
