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
                path : 'login',
                element : <Login></Login>
            },
            {
                path : 'add-issue',
                element : <AddIssuePage></AddIssuePage>
            },
            {
                path : 'issues',
                element : <AllIssuesPage></AllIssuesPage>
            },
            {
                path : 'issues/:id',
                element : <IssueDetailPage></IssueDetailPage>
            },
            {
                path : 'my-issues',
                element : <MyIssuesPage></MyIssuesPage>
            },
            {
                path : 'my-contributions',
                element : <MyContributionPage></MyContributionPage>
            }
        ]
    }
])