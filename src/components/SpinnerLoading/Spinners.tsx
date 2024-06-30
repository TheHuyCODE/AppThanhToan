import { Flex } from "antd";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
const Spinners = ({ loading }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RotatingLines
        visible={loading}
        width="100"
        color="red"
        strokeWidth="2"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Spinners;
