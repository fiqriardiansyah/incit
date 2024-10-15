import Cookies from "js-cookie";
import { Link, Navigate } from "react-router-dom";

export default function HomePage() {
    const token = Cookies.get("token");

    if (token) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="w-screen container-custom h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3 items-center justify-center">
                <Link className="btn-style" to="/signin">Sign In</Link>
                <div className="flex items-center gap-3 w-[300px]">
                    <div className="h-[1px] flex-1 bg-gray-400" /> OR <div className="h-[1px] flex-1 bg-gray-400" />
                </div>
                <Link className="btn-style" to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}