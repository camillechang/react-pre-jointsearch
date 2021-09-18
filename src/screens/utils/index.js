import { useState, useEffect } from "react";
export const isTrue = (value) => (value === 0 ? true : value);
export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

// const debounce = (fn) => {
//   let timeout;
//   return (msg) => {
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => console.log(msg), 1000);
//   };
// };

// const log = debounce();
// log("A");
// log("AB");
// log("ABC");
// console.log("A");
// console.log("AB");
// console.log("ABC");
