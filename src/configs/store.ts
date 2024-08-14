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
    getAllStoreAdmin: () => {
        const url = "api/v1/manage/store";
        return axiosClient.get(url, {
            headers: {
                // Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },

        });
    },
    getDataModifyStoreAdmin: (id: string) => {
        const url = `api/v1/manage/store/${id}`
        return axiosClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
            }
        })
    },
    modifyStoreAdmin: (data: object, idItems: string) => {
        const url = `api/v1/manage/store/${idItems}`
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
            }
        })
    },
}
export default store