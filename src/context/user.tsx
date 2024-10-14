import { User } from "models";
import React from "react";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import { userService } from "service/user";

export type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext({}) as any;

export const UserProvider = ({ children }: { children: any }) => {
    const token = Cookies.get("token");
    const [user, setUser] = React.useState<User | null>(null);

    const getProfile = useQuery([userService.profile.name], async () => {
        return (await userService.profile()).data.data;
    }, {
        enabled: !!token,
        onSuccess(data) {
            setUser(data);
        }
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const user = React.useContext(UserContext) as UserContextType;
    return user;
}