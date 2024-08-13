import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowAltCircleUp } from "react-icons/fa";
interface ButtonExportToExcelProps {
  linkExport: string | undefined;
  fileName: string | undefined;
}
const ButtonExportToExcel: React.FC<ButtonExportToExcelProps> = ({ linkExport, fileName }) => {
  const access_token = localStorage.getItem("access_token");
  const BASEURL = import.meta.env.VITE_APP_API_URL;
  const url = `${BASEURL}/${linkExport}?is_export=1`;
  console.log("url", url);
  const downloadExcel = () => {
    axios({
      url: `${url}`, // Replace with your actual backend endpoint
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        // Extract filename from Content-Disposition header if available
        const contentDisposition = response.headers["content-disposition"];
        let filename = `${fileName}.xlsx`; // Default filename
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1];
          }
        }
        toast.success("Export sản phẩm thành công!");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up link element
        window.URL.revokeObjectURL(url); // Clean up URL object
      })
      .catch((error) => {
        console.error("Error downloading the Excel file:", error);
      });
  };

  return (
    <>
      <button onClick={downloadExcel} className="btn-header-right" style={{ width: "120px" }}>
        {" "}
        <FaArrowAltCircleUp />
        &nbsp; Export
      </button>
    </>
  );
};

export default ButtonExportToExcel;
