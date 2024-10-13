import { AxiosError } from "axios";
import { toast } from "react-toastify";

// Utility function to handle and display error messages
const handleError = (error: unknown) => {
  let errorMessage = "An error occurred";
  // console.log('1111', error)
  if (error) {
    console.log('1111')
    const axiosError = error as AxiosError;
    // ignore vi khong ro type?
    //@ts-ignore
    errorMessage = axiosError.message ? axiosError.message.text : "An error occurred";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  // const err = error as AxiosError;
  // const errorMessage = err.message ? err.message.text : "An error occurred";
  // toast.error(errorMessage);
  // console.log("Login error", error);
  toast.error(errorMessage);
  console.log("Error: ", error);
};



export { handleError };
