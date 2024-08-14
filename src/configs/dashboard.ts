import axiosClient from "./axiosClient";

const dashboard = {
    getAll: (start_date: number, end_date: number, group_by: number) => {
        const url = "/api/v1/manage/statistic";
        const params = {
            start_date: start_date,
            end_date: end_date,
            group_by: group_by,
        }
        return axiosClient.get(url, {
            headers: {
                // Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            params,
        });
    }
}
export default dashboard