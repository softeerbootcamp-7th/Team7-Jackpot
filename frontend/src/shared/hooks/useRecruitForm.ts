import { useCallback, useState } from 'react';

import { DEFAULT_DATA } from '@/shared/constants/createCoverLetter';
import type { CreateCoverLetterRequest } from '@/shared/types/coverLetter';

export const useRecruitForm = (initialData?: CreateCoverLetterRequest) => {
  const [formData, setFormData] = useState<CreateCoverLetterRequest>(
    initialData || DEFAULT_DATA,
  );

  const handleChange = useCallback(
    <K extends keyof CreateCoverLetterRequest>(
      key: K,
      value: CreateCoverLetterRequest[K],
    ) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  return { formData, handleChange, setFormData };
};
