import { useState } from 'react';

import type {
  ContentItemType,
  ContentStateType,
} from '@/features/upload/types/upload';

const generateYearList = (year: number) => {
  const yearList = [];
  for (let i = 0; i < 100; i += 1) {
    yearList.push(year - i);
  }

  return yearList;
};

const today = new Date();

export const yearList = generateYearList(today.getFullYear());

const generateHalfInfo = (month: number): 'FIRST_HALF' | 'SECOND_HALF' =>
  month <= 6 ? 'FIRST_HALF' : 'SECOND_HALF';

export const halfInfo = generateHalfInfo(today.getMonth() + 1);

const useCoverLetterState = () => {
  const [contents, setContents] = useState<ContentStateType>(
    [1, 2, 3].reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          companyName: '',
          jobPosition: '',
          recruitPeriod: {
            year: 2026,
            season: halfInfo,
          },
          questionType: '',
        },
      }),
      {},
    ),
  );

  const updateContents = (
    key: number,
    field: keyof ContentItemType | 'year' | 'season',
    value: string | number,
  ) => {
    setContents((prev) => {
      const currentItem = prev[key];

      if (field === 'year' || field === 'season') {
        return {
          ...prev,
          [key]: {
            ...currentItem,
            recruitPeriod: {
              ...currentItem.recruitPeriod,
              [field]: value,
            },
          },
        };
      }
      return {
        ...prev,
        [key]: {
          ...currentItem,
          [field]: value,
        },
      };
    });
  };

  return { contents, updateContents };
};

export default useCoverLetterState;
