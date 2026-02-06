import { type SVGProps, useId } from 'react';

// [박소민] TODO: SVG 공부

export const WritingCoverLetterIcon = (props: SVGProps<SVGSVGElement>) => {
  // 1. 고유 ID 생성 (특수문자 제거로 안전성 확보)
  const rawId = useId();
  const baseId = rawId.replace(/:/g, '');

  // 2. ID 변수화
  // 원본의 id="a" -> gradAId
  // 원본의 id="b" -> gradBId
  const gradAId = `${baseId}-grad-a`;
  const gradBId = `${baseId}-grad-b`;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      fill='none'
      viewBox='0 0 28 28'
      {...props} // 3. 확장성: 외부에서 className이나 style을 주입받을 수 있게 합니다.
    >
      {/* 주의: 원본 코드에서 clipPath도 url(#a)를 보고 있고, 
        첫 번째 path의 fill도 url(#a)를 보고 있습니다.
        따라서 둘 다 gradAId를 참조하도록 설정했습니다.
      */}
      <g clipPath={`url(#${gradAId})`}>
        <path
          fill={`url(#${gradAId})`}
          d='M27.222 15.556c0 1.718-1.393 1.555-3.111 1.555H3.888c-1.718 0-3.11.163-3.11-1.555l1.555-9.334c.097-1.49 1.393-3.11 3.111-3.11h17.111c1.718 0 2.949 1.717 3.111 3.11z'
        />
        <path
          fill='#DCDCDC'
          d='M21.778 10.111c0 .859-.697 1.556-1.555 1.556H7.778a1.556 1.556 0 0 1-1.555-1.556V3.89c0-.86.697-1.555 1.555-1.555h12.445c.858 0 1.555.696 1.555 1.555z'
        />
        <path
          fill='#EFEFEF'
          d='M23.335 13.222c0 .859-.697 1.556-1.556 1.556H6.224a1.556 1.556 0 0 1-1.556-1.556V7c0-.859.697-1.556 1.556-1.556h15.555c.859 0 1.556.697 1.556 1.556z'
        />
        <path
          fill='#fff'
          d='M24.887 16.333c0 .86-.697 1.556-1.555 1.556H4.665a1.556 1.556 0 0 1-1.556-1.556v-6.222c0-.858.697-1.555 1.556-1.555h18.667c.858 0 1.555.697 1.555 1.555z'
        />
        <path
          fill={`url(#${gradBId})`}
          d='M27.222 24.111a3.11 3.11 0 0 1-3.111 3.111H3.888a3.11 3.11 0 0 1-3.11-3.111v-8.556a3.11 3.11 0 0 1 3.11-3.11h20.223a3.11 3.11 0 0 1 3.11 3.11z'
        />
        <path
          fill='#7371E3'
          d='M17.112.778h-3.888c-.86 0-1.556.696-1.556 1.555v.778h3.111c.859 0 1.556.697 1.556 1.556h.777c.86 0 1.556-.697 1.556-1.556v-.778c0-.86-.697-1.555-1.556-1.555'
        />
        <path
          fill='#7371E3'
          d='M14 3.889h-3.89c-.858 0-1.555.697-1.555 1.555v.778h3.11c.86 0 1.556.697 1.556 1.556H14c.859 0 1.556-.697 1.556-1.556v-.778c0-.858-.697-1.555-1.556-1.555'
        />
        <path
          fill='#7371E3'
          d='M12.445 9.333c0 .859-.697 1.556-1.555 1.556H7a1.556 1.556 0 0 1-1.555-1.556v-.777c0-.86.697-1.556 1.556-1.556h3.889c.858 0 1.555.697 1.555 1.556z'
        />
        <path
          fill='#fff'
          d='M17.888 16.334c.858 0 1.555.697 1.555 1.555v3.889c0 .859-.697 1.556-1.555 1.556H10.11a1.556 1.556 0 0 1-1.555-1.556v-3.889c0-.858.697-1.555 1.555-1.555zm-7 1.555a.777.777 0 0 0-.778.777V21c0 .43.349.778.778.778h6.222c.43 0 .777-.348.778-.777v-2.335a.777.777 0 0 0-.778-.777z'
        />
        {/* 중간 path 생략 (단색 채우기는 ID가 필요 없으므로 그대로 둡니다) */}
        <path fill='#DCDCDC' d='...' />
        <path fill='#EFEFEF' d='...' />
        <path fill='#fff' d='...' />

        <path fill={`url(#${gradientBId})`} d='M27.222 24.111a3.11 3.11...' />
      </g>

      {/* Definitions: 그래픽 리소스 정의 구간 */}
      <defs>
        <clipPath id={clipPathId}>
          <rect width='28' height='28' fill='#fff' />
        </clipPath>

        <linearGradient
          id={gradAId}
          x1='14'
          x2='14'
          y1='3.111'
          y2='17.115'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AEB7F3' />
          <stop offset='1' stopColor='#7371E3' />
        </linearGradient>

        <linearGradient
          id={gradBId}
          x1='14'
          x2='14'
          y1='12.444'
          y2='27.222'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AEB7F3' />
          <stop offset='1' stopColor='#E3E8FC' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default WritingCoverLetterIcon;
