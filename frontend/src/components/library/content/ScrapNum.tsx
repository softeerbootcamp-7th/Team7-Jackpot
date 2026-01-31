const ScrapNum = ({ num }: { num: number }) => {
  return (
    <div className='pt-7.5 flex flex-row justify-center items-center gap-2.5'>
      <p className='flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#989898]'>
        지금까지 스크랩된 문항 수
      </p>
      <div className='px-1.5 pt-px bg-purple-500 rounded-[100px] outline outline-2 outline-white inline-flex justify-center items-center gap-1'>
        <div className='text-center justify-start text-white text-xs font-bold leading-4'>
          {num}
        </div>
      </div>
    </div>
  );
};
export default ScrapNum;
