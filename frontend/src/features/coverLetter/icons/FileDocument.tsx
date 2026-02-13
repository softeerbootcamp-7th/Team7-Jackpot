import { type SVGProps } from 'react';

const FileDocument = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      {...props}
    >
      <title>문서 아이콘</title>
      <path
        d='M16.4463 2.33936C16.7133 2.36591 16.9649 2.48393 17.1562 2.67529L22.9893 8.50928C23.2078 8.72795 23.3309 9.02436 23.3311 9.3335V22.1675C23.3307 24.1001 21.7637 25.6673 19.8311 25.6675H8.16406C6.23155 25.6671 4.66437 24.1 4.66406 22.1675V3.50049C4.66411 2.8563 5.1869 2.33367 5.83105 2.3335H16.3311L16.4463 2.33936ZM16.332 9.3335H20.5146L16.332 5.15088V9.3335Z'
        fill='#AEB7F3'
      />
      <path
        d='M10.5 15.3325H17.5'
        stroke='#7371E3'
        strokeWidth='2.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.5 19.9995H17.5'
        stroke='#7371E3'
        strokeWidth='2.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.7344 9.112V3.32324L22.5231 9.112H16.7344Z'
        fill='#7371E3'
        stroke='#7371E3'
        strokeWidth='1.4'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default FileDocument;
