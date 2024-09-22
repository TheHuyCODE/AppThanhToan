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
    },
    getDataModify: (id: string) => {
        const url = `api/v1/manage/owner/${id}`
        return axiosClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
            }
        })
    },
    sortDataOwners: (colName: string, typeSort: string) => {
        const url = "api/v1/manage/owner";
        const params = {
            sort: `${colName}`,
            order_by: `${typeSort}`,
        };
        return axiosClient.get(url, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            params,
        });
    },
    postOwners: (data: object) => {
        const url = 'api/v1/manage/owner'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
            }
        })
    },
    putLockOwners: (data: object, idItems: string) => {
        const url = `api/v1/manage/owner/${idItems}/lock_account`
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
            }
        })
    },
    putChangeStatusOwners: (data: object, idItems: string) => {
        const url = `api/v1/manage/owner/${idItems}/approve_account`
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
            }
        })
    },
    modifyOwners: (data: object, idItems: string) => {
        const url = `api/v1/manage/owner/${idItems}`
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
            }
        })
    },
    deleteOwners: (idItems: string) => {
        const url = `api/v1/manage/owner/${idItems}`
        return axiosClient.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
            }
        })
    },
    getDataSearchOwners: (data: string) => {
        const url = "api/v1/manage/owner";
        const params = {
            search: data
        }
        return axiosClient.get(url, {
            headers: {
                // Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            params
        });
    },
}
export default owners