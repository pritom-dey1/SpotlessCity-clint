import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children : [
            {
                index : true,
                element : <Home></Home>
            },
            {
                path : '/register',
                element : <Register></Register>
            },
            {
                path : 
            }
        ]
    }
])