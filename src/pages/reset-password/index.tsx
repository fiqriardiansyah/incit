import { useUser } from "context/user";
import { parseErrors, passwordSchema } from "lib/utils";
import { PasswordReset } from "models";
import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userService } from "service/user";
import { z } from "zod";

export default function ResetPassword() {
    const navigate = useNavigate();
    const user = useUser();
    const [inputs, setInputs] = React.useState({ oldpassword: "", password: "", repeatpassword: "" });
    const [errors, setErrors] = React.useState<string[]>([]);

    const updateMutate = useMutation(async (data: PasswordReset) => {
        return (await userService.passwordUpdate(data)).data.data;
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);

        const formValidation = z.object({
            oldpassword: passwordSchema,
            password: passwordSchema,
            repeatPassword: z.string(),
        }).refine((data) => data.password === data.repeatPassword, {
            message: "Passwords do not match",
            path: ["repeatPassword"],
        });

        const result = formValidation.safeParse({
            oldpassword: inputs.oldpassword,
            password: inputs.password,
            repeatPassword: inputs.repeatpassword,
        });

        const userErrors = parseErrors(result);

        if (userErrors.length) {
            setErrors(userErrors);
            return;
        }

        updateMutate.mutateAsync({ password: inputs.oldpassword, newpassword: inputs.password }).then((res) => {
            toast.success(res);
            setInputs({ oldpassword: "", password: "", repeatpassword: "" });
        });
    }

    const onChangeInputs = (name: "password" | "oldpassword" | "repeatpassword") => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputs((prev) => ({
                ...prev,
                [name]: e.target.value,
            }));
        };
    };

    return (
        <div className="w-full container-custom">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="btn-icon w-fit">
                    <BiChevronLeft />
                </button>
                <h1>Hallo, {user?.user?.firstname} {user?.user?.lastname || ""}</h1>
            </div>
            <h2 className="text-gray-500 my-3">Reset your password</h2>
            <form onSubmit={onSubmit} className="w-[300px] flex flex-col gap-3 mt-10 mx-auto">
                <input value={inputs.oldpassword} onChange={onChangeInputs("oldpassword")} className="input" type="password" placeholder="Old Password" />
                <input value={inputs.password} onChange={onChangeInputs("password")} className="input" type="password" placeholder="New Password" />
                <input value={inputs.repeatpassword} onChange={onChangeInputs("repeatpassword")} className="input" type="password" placeholder="Repeat Password" />
                <button disabled={updateMutate.isLoading} className="btn-style">
                    Reset password
                </button>
                {errors?.length || updateMutate.isError ? <p className="text-red-400 mb-4">{errors[0] || (updateMutate.error as Error)?.message}</p> : null}
            </form>
        </div>
    )
}