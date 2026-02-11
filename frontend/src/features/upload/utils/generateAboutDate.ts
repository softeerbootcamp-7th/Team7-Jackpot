const generateYearList = (year: number) => {
  const yearList = [];
  for (let i = 0; i < 100; i += 1) {
    yearList.push(year - i);
  }

  return yearList;
};

const today = new Date();

export const yearList = generateYearList(today.getFullYear());

const generateHalfInfo = (month: number): 'first' | 'second' =>
  month <= 6 ? 'first' : 'second';

export const halfInfo = generateHalfInfo(today.getMonth() + 1);
