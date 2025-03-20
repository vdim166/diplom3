import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage";
import { ProtectedRouter } from "./ProtectedRouter";
import { AppLayout } from "./AppLayout";
import { MainPage } from "../pages/MainPage";
import { AppAuthLayout } from "./AppAuthLayout";
import { StoragePage } from "../pages/StoragePage";
import { Forecast } from "../pages/Forecast";
import { TaskManager } from "../pages/TaskManager";
import { Stats } from "../pages/Stats";
import { Login } from "../pages/Login";
import { Reg } from "../pages/Reg";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AppAuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Reg />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <MainPage />,
          },
          {
            path: "storage",
            element: <StoragePage />,
          },
          {
            path: "forecast",
            element: <Forecast />,
          },
          {
            path: "taskmanager",
            element: <TaskManager />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/oauth?error=somethingWentWrong" replace />,
  },
]);
