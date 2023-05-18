//THIRD PARTY MODULES
import React from "react";

function ArrowUp(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="11"
      fill="none"
      viewBox="0 0 10 11"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M2.083 4.667L5 1.75m0 0l2.917 2.917M5 1.75v7.5"
      ></path>
    </svg>
  );
}

export default ArrowUp;
