import { useState } from 'react';

import SecondContentAreaHeader from '@/components/upload/SecondContentAreaHeader';
import SecondContentItem from '@/components/upload/SecondContentItem';

const SecondContentArea = () => {
  const [tabState, setTabState] = useState<1 | 2 | 3>(1);
  return (
    <>
      <SecondContentAreaHeader />
      <SecondContentItem tabState={tabState} setTabState={setTabState} />
    </>
  );
};

export default SecondContentArea;
