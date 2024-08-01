import axiosClient from "./axiosClient";
const store = {
    getAll: () => {
        const url = "/api/v1/store";
        return axiosClient.get(url, {
            headers: {
                // Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },

        });
    },
    putDataStore: (data: object) => {
        const url = "/api/v1/store";
        return axiosClient.put(url, data, {
            headers: {
                // Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },

        });
    },
}
export default store