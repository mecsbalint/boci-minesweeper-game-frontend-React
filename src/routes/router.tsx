import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Homepage";
import Layout from "../pages/Layout/Layout";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import SPGamePage from "../pages/SPGamePage";
import MPGamePage from "../pages/MPGamePage";
import GameLobbyPage from "../pages/GameLobbyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: < />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sp-game",
        element: <SPGamePage />
      },
      {
        path: "/mp-game",
        element: <MPGamePage />
      },
      {
        path: "/lobby",
        element: <GameLobbyPage />
      },
    ],
  },
]);

export default router
