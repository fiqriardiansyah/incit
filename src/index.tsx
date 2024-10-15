import HomePage from 'pages/home';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style/global.css';
import Auth from 'pages/auth';
import AuthSignin from 'pages/auth/signin';
import AuthSignup from 'pages/auth/signup';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from 'pages/dashboard';
import Profile from 'pages/profile';
import { UserProvider } from 'context/user';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from 'pages/reset-password';
import NotVerif from 'pages/not-verif';
import UserList from 'pages/user-list';
import Analitycs from 'pages/analitycs';
import SetCookie from 'pages/set-cookie';

const client = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/",
        element: <Auth />,
        children: [
            {
                path: "/signin",
                element: <AuthSignin />
            },
            {
                path: "/signup",
                element: <AuthSignup />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "",
                element: <div className="container-custom flex flex-col gap-4">
                    Analitycs
                    <Analitycs />
                    All User
                    <UserList />
                </div>
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            }
        ]
    },
    {
        path: '/unverified',
        element: <NotVerif />
    },
    {
        path: '/set-cookie',
        element: <SetCookie />
    }
]);

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container);

root.render(
    <QueryClientProvider client={client}>
        <ToastContainer />
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </QueryClientProvider>
)
