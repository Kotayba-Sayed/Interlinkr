import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import RequireAuth from "./RequireAuth";


const Routes = () => {
    const { token } = useAuth();

    const routesForPublic = [
        {
          path: "/",
          element: <div>Login</div>,
        },

      ];

    const routesForAuthenticatedOnly = [
        {
            path: "/home",
            element: <RequireAuth />,
            children: [
            {
                path: "/home",
                element: <div>User Home Page</div>,
            },
            {
                path: "/profile",
                element: <div>User Profile</div>,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            ],
        },
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ];

    const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router} />;

};

export default Routes;