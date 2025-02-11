import AdminTemplate from "../pages/client-admin";
import AuthPage from "../pages/client-admin/AuthPage";
import DashboardPage from "../pages/client-admin/DashboardPage";
import CustomerTemplate from "../pages/client-customer";
import HomePage from "../pages/client-customer/HomePage";
import MovieDetailPage from "../pages/client-customer/MovieDetailPage";
import PageNotFound from "../pages/client-error-pages";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "",
    element: CustomerTemplate,
    children: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "detail/:id",
        element: MovieDetailPage,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    children: [
      {
        path: "dashboard",
        element: DashboardPage,
      },
    ],
  },
  {
    path: "auth",
    element: AuthPage,
  },
  {
    path: "*",
    element: PageNotFound,
  },
];
export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.children.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
