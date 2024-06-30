import React from "react";

import { useEffect, useState } from "react";
const useDebounce = (value, delay) => {
  const [useDebounceValue, setUseDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setUseDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return useDebounceValue;
};

export default useDebounce;
