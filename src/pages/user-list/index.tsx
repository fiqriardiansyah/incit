import dayjs from "dayjs";
import { useQuery } from "react-query";
import { dashboardService } from "service/dashboard";

export default function UserList() {

    const usersQuery = useQuery([dashboardService.listUser.name], async () => {
        return (await dashboardService.listUser()).data.data;
    });

    return (
        <div className="flex flex-col gap-3">
            {usersQuery.isLoading && <h1 className="text-2xl">Loading...</h1>}
            {usersQuery.data?.map((user) => {
                return (
                    <div className="bg-gray-100 hover:bg-gray-200 rounded-lg p-3" key={user.id}>
                        <p className="text-xl font-semibold italic">{user.firstname} {user.lastname}</p>
                        <span className="text-gray-600">{user?.email}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-xs">Sign up at {dayjs(user.createdat).format("DD/MM/YYYY, HH:mm")}</span>
                            <span className="text-xs text-red-400">Sign out at {user.logoutat ? dayjs(user.logoutat).format("DD/MM/YYYY, HH:mm") : null}</span>
                            <span className="text-xs">Count Login {user.countlogin}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}