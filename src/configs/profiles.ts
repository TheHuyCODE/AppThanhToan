import axiosClient from "./axiosClient";
const Profiles = {
    getProfile: () => {
      const url = "api/v1/profile";
          return axiosClient.get(url, {
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        
      });
    },
    postProfile: (data: object) => {
        const url = "api/v1/profile";
            return axiosClient.put(url, data, {
          headers: {
            // Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          
        });
      },
    
}
export default Profiles;