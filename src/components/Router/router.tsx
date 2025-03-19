import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage";
import { ProtectedRouter } from "./ProtectedRouter";
import { AppLayout } from "./AppLayout";
import { MainPage } from "../pages/MainPage";
import { AppAuthLayout } from "./AppAuthLayout";
import { StoragePage } from "../pages/StoragePage";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AppAuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "login",
      //   element: <LoginPage />,
      // },
      // {
      //   path: "registration",
      //   element: <RegPage />,
      // },
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
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/oauth?error=somethingWentWrong" replace />,
  },
]);
