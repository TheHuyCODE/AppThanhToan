import axiosClient from "./axiosClient";
const category = {
    getAll: () => {
        const url = "api/v1/manage/store";

        return axiosClient.get(url, {
            headers: {
                // Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },

        });
    },
}
export default category