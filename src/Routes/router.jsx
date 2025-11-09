import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddIssuePage from "../pages/AddIssuePage";
import AllIssuesPage from "../pages/AllIssuesPage";
import IssueDetailPage from "../pages/IssueDetailPage";
import MyIssuesPage from "../pages/MyIssuesPage";
import MyContributionPage from "../pages/MyContributionPage";
import PrivateRoute from "../Components/Global/PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement : <NotFoundPage></NotFoundPage>,
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
                path : 'login',
                element : <Login></Login>
            },
            {
                path : 'add-issue',
                element :<PrivateRoute>
                     <AddIssuePage></AddIssuePage>
                </PrivateRoute>
            },
            {
                path : 'issues',
                element : <AllIssuesPage></AllIssuesPage>
            },
            {
                path : 'issues/:id',
                element : <PrivateRoute><IssueDetailPage></IssueDetailPage></PrivateRoute>
            },
            {
                path : 'my-issues',
                element : <PrivateRoute> <MyIssuesPage></MyIssuesPage></PrivateRoute>
            },
            {
                path : 'my-contributions',
                element : <PrivateRoute><MyContributionPage></MyContributionPage></PrivateRoute>
            }
        ]
    }
])