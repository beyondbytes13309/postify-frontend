import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import AdminDashBoard from './pages/AdminDashBoard'


import RootLayout from "./pages/RootLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: 'dashboard',
        element: <AdminDashBoard />
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
