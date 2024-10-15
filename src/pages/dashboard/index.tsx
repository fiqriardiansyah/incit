import { useUser } from "context/user";
import Cookies from "js-cookie";
import React from "react";
import { useMutation } from "react-query";
import { Link, Navigate, Outlet, useSearchParams } from "react-router-dom";
import { authService } from "service/auth";

export default function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const user = useUser();

    const tokenUrl = searchParams.get("token");
    let token = Cookies.get("token");

    const logoutMutate = useMutation(async () => (await authService.logout()).data.data);

    const clickLogout = () => {
        user.setUser(null);
        Cookies.remove("token");
        logoutMutate.mutate();
    }

    React.useEffect(() => {
        if (tokenUrl) {
            token = tokenUrl;
            Cookies.set("token", tokenUrl);
            searchParams.delete("token");
            setSearchParams(searchParams);
        }
    }, [tokenUrl]);

    if (!token) {
        return <Navigate to="/signin" />
    }

    if (!user?.user?.verified) {
        return <Navigate to="/unverified" />
    }

    return (
        <div className="w-full min-h-screen">
            <header className="w-full container-custom border-b border-solid border-gray-300 mb-5">
                <nav className="flex items-center gap-2 py-2 justify-between w-full">
                    <div className="flex items-center gap-3">
                        <Link to="/dashboard" className="italic font-semibold mr-10">INCIT</Link>
                        <Link to="/dashboard/profile" className="btn-style w-fit">
                            Profile
                        </Link>
                        <Link to="/dashboard/reset-password" className="btn-style w-fit">
                            Reset Password
                        </Link>
                    </div>
                    <button onClick={clickLogout} className="btn-style !bg-red-400 !border-none hover:!bg-red-300 w-fit text-white hover:!text-black">
                        Logout
                    </button>
                </nav>
            </header>
            <Outlet />
        </div>
    )
}