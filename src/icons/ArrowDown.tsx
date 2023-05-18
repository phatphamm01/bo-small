//THIRD PARTY MODULES
import React from "react";

function ArrowDown(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      fill="none"
      viewBox="0 0 11 11"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M8.417 6.333L5.5 9.25m0 0L2.583 6.333M5.5 9.25v-7.5"
      ></path>
    </svg>
  );
}

export default ArrowDown;
