import { useUser } from "context/user";
import Cookies from "js-cookie";
import { parseErrors, passwordSchema } from "lib/utils";
import { EmailSign } from "models";
import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "service/auth";
import { z } from "zod";

export default function AuthSignup() {
    const navigate = useNavigate();
    const user = useUser();
    const [inputs, setInputs] = React.useState({
        email: "",
        password: "",
        repeatPassword: "",
    });
    const [errors, setErrors] = React.useState<string[]>([]);

    const emailSignup = useMutation(async (data: EmailSign) => {
        return (await authService.emailSignup(data)).data.data;
    }, {
        onSuccess({ accesstoken, ...profile }) {
            toast.success("Email Verification has been send, please check your email");
            Cookies.set('token', accesstoken);
            user.setUser(profile);
            window.location.href = window.location.href = profile?.verified ? '/dashboard' : "/unverified";
        }
    });

    const onChangeInputs = (name: "email" | "password" | "repeatPassword") => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputs((prev) => ({
                ...prev,
                [name]: e.target.value,
            }));
        };
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);

        const formValidation = z.object({
            email: z.string().email(),
            password: passwordSchema,
            repeatPassword: z.string(),
        }).refine((data) => data.password === data.repeatPassword, {
            message: "Passwords do not match",
            path: ["repeatPassword"],
        });

        const result = formValidation.safeParse({
            email: inputs.email,
            password: inputs.password,
            repeatPassword: inputs.repeatPassword,
        });

        const userErrors = parseErrors(result);

        if (userErrors.length) {
            setErrors(userErrors);
            return;
        }

        emailSignup.mutate({ email: inputs.email, password: inputs.password })
    }

    const disabled = emailSignup.isLoading;
    const error = (emailSignup.error as Error)?.message

    return (
        <div className="w-[300px] flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Sign Up Here</h1>
            {disabled && <p className="my-5">Loading...</p>}
            <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">
                <input value={inputs.email} onChange={onChangeInputs("email")} className="input" type="email" placeholder="Email" />
                <input value={inputs.password} onChange={onChangeInputs("password")} className="input" type="password" placeholder="Password" />
                <input value={inputs.repeatPassword} onChange={onChangeInputs("repeatPassword")} className="input" type="password" placeholder="Repeat Password" />
                <button disabled={disabled} className="btn-style">
                    Sign up
                </button>
            </form>
            <Link to="/signin" className="cursor-pointer italic">Already have an account?</Link>
            {errors?.length || error ? <p className="text-red-400 mb-4">{errors[0] || error}</p> : null}
        </div>
    )
}