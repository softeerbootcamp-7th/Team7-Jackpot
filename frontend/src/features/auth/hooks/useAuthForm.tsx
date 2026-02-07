import { useCallback, useState } from 'react';

import type { AuthFormData, AuthInputKey } from '@/features/auth/types/auth';

const useAuthForm = <T extends AuthFormData>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: AuthInputKey) => {
      const value = e.target.value;

      switch (key) {
        case 'userId':
          value = value.toLowerCase();
          break;

        default:
          break;
      }
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return { formData, handleInputChange, setFormData };
};

export default useAuthForm;
