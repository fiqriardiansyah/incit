import { useUser } from 'context/user';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { authService } from 'service/auth';
import { toast } from 'react-toastify';

export default function NotVerif() {
    const token = Cookies.get("token");
    const user = useUser();

    const resendVerification = useMutation(async () => (await authService.resendVerification()).data.data, {
        onSuccess() {
            toast.success("Email Verification has been send, please check your email");
        },
    });

    if (!token) {
        return <Navigate to="/signin" />
    }

    if (user?.user?.verified) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="w-screen h-screen flex items-center flex-col gap-3 justify-center">
            <h1 className=''>Your Account not verified yet</h1>
            <span className='text-red-400 text-xs'>Please check your email</span>
            <button disabled={resendVerification.isLoading} onClick={() => resendVerification.mutate()} className='btn-style w-fit'>
                Resend Email Verification
            </button>
        </div>
    )
}