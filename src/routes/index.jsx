import AdminTemplate from "../pages/client-admin";
import AuthPage from "../pages/client-admin/AuthPage";
import DashboardPage from "../pages/client-admin/DashboardPage";
import Quanliphim from "../pages/client-admin/Quanliphim";
import Quanlinguoidung from "../pages/client-admin/User";
import UserPage from "../pages/client-admin/UserPage";
import CustomerTemplate from "../pages/client-customer";
import HomePage from "../pages/client-customer/HomePage";
import MovieDetailPage from "../pages/client-customer/MovieDetailPage";
import BuyTiket from "../pages/client-customer/BuyTicket";
import PageNotFound from "../pages/client-error-pages";
import AddMovie from "../pages/client-admin/AddMovie";
import ShowTime from "../pages/client-admin/ShowTime/index";
import { Route } from "react-router-dom";
import About from "../pages/client-customer/About";
import Support from "../pages/client-customer/Support";
import Promotions from "../pages/client-customer/Promotions";

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
      {
        path: "buy-tickets/:id",
        element: BuyTiket,
      },
      {
        path: "about",
        element: About,
      },
      {
        path: "support",
        element: Support,
      },
      {
        path: "promotion",
        element: Promotions,
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
      {
        path: "quanliphim",
        element: Quanliphim,
      },
      {
        path:"add-user",
        element:Quanlinguoidung,
      },
      {
        path:"add-movie",
        element: AddMovie
      },
      {
        path:"user",
        element: UserPage
      },
      {
        path: "show-time/:idFilm",
        element:ShowTime
      }


      
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
