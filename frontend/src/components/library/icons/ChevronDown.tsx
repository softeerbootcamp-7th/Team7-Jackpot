import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const ChevronDownIcon = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 28 28"
      {...props}
    >
      <path
        stroke="#292929"
        d="m16.332 19.834-5.343-5.835 5.343-5.832"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
};
