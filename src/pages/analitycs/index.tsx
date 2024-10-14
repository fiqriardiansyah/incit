import { useQuery } from "react-query"
import { dashboardService } from "service/dashboard"

export default function Analitycs() {
    const countSignupQuery = useQuery([dashboardService.countSignup.name], async () => {
        return (await dashboardService.countSignup()).data.data;
    });

    const countActiveTodayQuery = useQuery([dashboardService.countActiveToday.name], async () => {
        return (await dashboardService.countActiveToday()).data.data;
    });

    const countAvg7DaysQuery = useQuery([dashboardService.countAvgActiveIn7Day.name], async () => {
        return (await dashboardService.countAvgActiveIn7Day()).data.data;
    });

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                <h1 className="text-4xl">{countSignupQuery.data}</h1>
                <span className="text-xs text-gray-500">Total User</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                <h1 className="text-4xl">{countActiveTodayQuery.data}</h1>
                <span className="text-xs text-gray-500">Total Active Today</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                <h1 className="text-4xl">{countAvg7DaysQuery.data}</h1>
                <span className="text-xs text-gray-500">Average Active User in 7 Day</span>
            </div>
        </div>
    )
}