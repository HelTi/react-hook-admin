import { Route, Routes, useNavigate } from "react-router-dom";
import Root from "../layout/root";
import ErrorPage from "../layout/error-page";
import Login from "../views/login";
import Home from "../views/home";
import Article from "../views/article";
import { useEffect, useState } from "react";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default function AuthRoutes() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // const isLogin = false;
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  function createRoutes(routeArr) {
    return routeArr.map((route) => {
      return (
        <Route key={route.path} {...route}>
          {route.children && createRoutes(route.children)}
        </Route>
      );
    });
  }
  // console.log("routes----", createRoutes(routes));
  return <Routes>{createRoutes(routes)}</Routes>;
}
