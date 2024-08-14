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
}
export default owners