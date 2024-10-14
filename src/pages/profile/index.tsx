import { useUser } from "context/user";
import { parseErrors } from "lib/utils";
import { User } from "models";
import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userService } from "service/user";
import { z } from "zod";

export default function Profile() {
    const navigate = useNavigate();
    const user = useUser();
    const [inputs, setInputs] = React.useState({ firstname: "", lastname: "" });
    const [errors, setErrors] = React.useState<string[]>([]);

    const updateMutate = useMutation(async (data: Partial<User>) => {
        return (await userService.profileUpdate(data)).data.data;
    })

    React.useEffect(() => {
        setInputs({ firstname: user?.user?.firstname, lastname: user?.user?.lastname });
    }, [user?.user]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = { firstname: inputs.firstname, lastname: inputs.lastname };

        const schema = z.object({ firstname: z.string().min(3), lastname: z.string() });
        const result = schema.safeParse(name);
        const userErrors = parseErrors(result);

        if (userErrors.length) {
            setErrors(userErrors);
            return;
        }

        updateMutate.mutateAsync(name).then((profile) => {
            toast.success("Profile updated");
            user.setUser((prev) => ({ ...prev, ...profile }));
        })
    }

    const onChangeInputs = (name: "firstname" | "lastname") => {
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
            <h2 className="text-gray-500 my-3">{user?.user?.email}</h2>
            <form onSubmit={onSubmit} className="w-[300px] flex flex-col gap-3 mt-10 mx-auto">
                <h1>Update profile</h1>
                <input value={inputs.firstname} onChange={onChangeInputs("firstname")} className="input" type="text" placeholder="Firstname" />
                <input value={inputs.lastname} onChange={onChangeInputs("lastname")} className="input" type="text" placeholder="Lastname" />
                <button disabled={updateMutate.isLoading} className="btn-style">
                    Update
                </button>
                {errors?.length || updateMutate.isError ? <p className="text-red-400 mb-4">{errors[0] || (updateMutate.error as Error)?.message}</p> : null}
            </form>
        </div>
    )
}