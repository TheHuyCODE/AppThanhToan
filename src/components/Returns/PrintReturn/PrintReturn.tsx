import React, { forwardRef, Ref } from "react";

interface PrintReturnProps {
  // Define any props that you need here, for example:
  someProp?: string;
}

const PrintReturn = forwardRef<HTMLDivElement, PrintReturnProps>(
  (props, ref) => {
    return <div ref={ref}>PrintReturn</div>;
  }
);

export default PrintReturn;
