import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { Navigate, Outlet, useSearchParams } from "react-router-dom"
import { authService } from "service/auth";
import Cookies from "js-cookie";

const Auth = () => {
    const token = Cookies.get("token");
    const [searchParams] = useSearchParams();
    const error = searchParams.get("error");

    const googleSign = authService.googleSignin;
    const facebookSign = authService.facebookSignin;

    if (token) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="w-screen container-custom h-screen flex items-center justify-center">
            <div className="w-[300px] flex flex-col gap-3">
                {error && <p className="my-5 text-red-500">{error}</p>}
                <Outlet />
                <div className="flex items-center gap-3 w-[300px]">
                    <div className="h-[1px] flex-1 bg-gray-400" /> OR <div className="h-[1px] flex-1 bg-gray-400" />
                </div>
                <button onClick={googleSign} className="btn-style flex items-center justify-center gap-3">
                    <FaGoogle /> Sign in With Google
                </button>
                <button onClick={facebookSign} className="btn-style flex items-center justify-center gap-3">
                    <FaFacebookF /> Sign in With Facebook
                </button>
            </div>
        </div>
    )
}

export default Auth
