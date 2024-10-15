import { useUser } from "context/user";
import Cookies from "js-cookie";
import { parseErrors, passwordSchema } from "lib/utils";
import { EmailSign } from "models";
import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "service/auth";
import { z } from "zod";

export default function AuthSignin() {
    const navigate = useNavigate();
    const user = useUser();
    const [inputs, setInputs] = React.useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = React.useState<string[]>([]);

    const emailSignin = useMutation(async (data: EmailSign) => {
        return (await authService.emailSignin(data)).data.data;
    }, {
        onSuccess({ accesstoken, ...profile }) {
            Cookies.set('token', accesstoken);
            console.log({ profile });
            user.setUser(profile);
            window.location.href = profile?.verified ? '/dashboard' : "/unverified";
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
        });

        const result = formValidation.safeParse({
            email: inputs.email,
            password: inputs.password,
        });

        const userErrors = parseErrors(result);

        if (userErrors.length) {
            setErrors(userErrors);
            return;
        }

        emailSignin.mutate({ email: inputs.email, password: inputs.password })
    }

    const disabled = emailSignin.isLoading;
    const error = (emailSignin?.error as Error)?.message

    return (
        <div className="w-[300px] flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Sign In Here</h1>
            {disabled && <p className="my-5">Loading...</p>}
            <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">
                <input value={inputs.email} onChange={onChangeInputs("email")} className="input" type="email" placeholder="Email" />
                <input value={inputs.password} onChange={onChangeInputs("password")} className="input" type="password" placeholder="Password" />
                <button disabled={disabled} className="btn-style">
                    Sign in
                </button>
            </form>
            <Link to="/signup" className="cursor-pointer italic">Not have an account?</Link>
            {errors?.length || error ? <p className="text-red-400 mb-4">{errors[0] || error}</p> : null}
        </div>
    )
}