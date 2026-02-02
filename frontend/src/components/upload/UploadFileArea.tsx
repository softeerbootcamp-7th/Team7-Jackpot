import AddFileItem from '@/components/upload/AddFileItem';

const UploadFileLayout = () => {
  return (
    <div className='flex justify-between'>
      {[0, 1, 2].map((i) => (
        <AddFileItem key={i} />
      ))}
    </div>
  );
};

export default UploadFileLayout;
