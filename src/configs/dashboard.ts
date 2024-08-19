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
    },
    getDataTopSales: (start_date: number, end_date: number, group_by: number) => {
        const url = "/api/v1/manage/statistic/top-selling";
        const params = {
            start_date: start_date,
            end_date: end_date,
            top_number: group_by,
        }
        return axiosClient.get(url, {
            headers: {
                // Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            params,
        });
    },
    getDataTopCustomer: (start_date: number, end_date: number, customer_number: number) => {
        const url = "/api/v1/manage/statistic/revenue-by-customer";
        const params = {
            start_date: start_date,
            end_date: end_date,
            customer_number: customer_number,
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