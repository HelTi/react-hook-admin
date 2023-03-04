import React, { lazy, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Root from "../layout/root";
import ErrorPage from "../layout/error-page";
import Login from "../views/login";
import ArticleList from "../views/article/list";
// import Home from "../views/home";
// import Article from "../views/article";
const Home = lazy(() => wait(1000).then(() => import("../views/home")));
const Article = lazy(() => wait(1000).then(() => import("../views/article")));


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
      {
        path:'/article/list',
        element: <ArticleList />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

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
