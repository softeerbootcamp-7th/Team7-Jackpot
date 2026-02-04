const CardUserInfo = ({
  name,
  date,
  time,
}: {
  name: string;
  date: string;
  time: string;
}) => (
  <>
    <div className='w-12 h-12 bg-purple-100 rounded-full relative overflow-hidden'>
      <div className='w-4 h-4 bg-purple-300 rounded-full absolute left-[17px] top-[12px]' />
      <div className='w-11 h-11 bg-purple-300 rounded-full absolute left-[3px] top-[33px]' />
    </div>
    <div className='flex-1 flex flex-col justify-center items-start'>
      <span className='text-base font-bold leading-6 text-gray-950 line-clamp-1'>
        {name}
      </span>
      <div className='flex items-start gap-1'>
        <span className='text-[0.813rem] font-normal leading-5 text-gray-400'>
          {date}
        </span>
        <span className='text-[0.813rem] font-normal leading-5 text-gray-400'>
          ·
        </span>
        <span className='text-[0.813rem] font-normal leading-5 text-gray-400'>
          {time}
        </span>
      </div>
    </div>
  </>
);

export default CardUserInfo;
