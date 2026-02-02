import AddFileItem from '@/components/upload/AddFileItem';

const UploadContentsLayout = () => {
  return (
    <div className='flex justify-between'>
      {[0, 1, 2].map((i) => (
        <AddFileItem key={i} />
      ))}
    </div>
  );
};

export default UploadContentsLayout;
