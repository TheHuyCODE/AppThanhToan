import axiosClient from "./axiosClient";
const owners = {
    getAll: () => {
        const url = 'api/v1/manage/owner'
        return axiosClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",

            }
        })
    }
}
export default owners