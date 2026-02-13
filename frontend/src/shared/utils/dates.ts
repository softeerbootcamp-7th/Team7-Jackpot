export const getDate = (date: string) => {
  if (!date) return;
  return date.slice(0, 10).replace(/-/g, '.');
};

export const getKoreanDate = (datetime: string) => {
  if (!datetime) return '';

  const date = new Date(datetime);

  if (isNaN(date.getTime())) return '';

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}월 ${day}일`;
};

export const getKoreanTime = (datetime: string) => {
  if (!datetime) return '';

  const date = new Date(datetime);

  if (isNaN(date.getTime())) return '';

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? '오후' : '오전';

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return `${period} ${String(hours).padStart(2, '0')}시 ${String(minutes).padStart(2, '0')}분`;
};

// [박소민] Date 객체는 참조 타입이므로 내부 값이 바뀔 수 있다.
// 그리고 React는 얕은 비교로 렌더링 여부를 결정하므로 화면을 갱신하지 않는다.
// 따라서 '달'을 바꾸는 경우에도 리렌더링이 일어나지 않을 수 있다.
// 결론적으로 새로운 Date 인스턴스를 반환하여 리렌더링이 일어나도록 구현한다.

const cloneDate = (date: Date) => new Date(date.getTime());

export const isPastDay = (currentDate: Date, targetDate: Date) => {
  currentDate.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  return targetDate < currentDate;
};

export const isSameDay = (dateLeft: Date, dateRight: Date): boolean => {
  return (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth() &&
    dateLeft.getDate() === dateRight.getDate()
  );
};

// [박소민] Date 객체는 setMonth()의 값을 저절로 0 ~ 11 범위 안에서 정해지도록 구현되어 있다.
export const addMonths = (date: Date, amount = 1): Date => {
  const newDate = cloneDate(date);
  newDate.setMonth(newDate.getMonth() + amount);
  return newDate;
};

export const subMonths = (date: Date, amount = 1): Date =>
  addMonths(date, -amount);

export const addWeeks = (date: Date, amount = 1): Date => {
  const newDate = cloneDate(date);
  newDate.setDate(newDate.getDate() + amount * 7);
  return newDate;
};

export const subWeeks = (date: Date, amount = 1): Date =>
  addWeeks(date, -amount);

export const startOfMonth = (date: Date): Date => {
  const newDate = cloneDate(date);
  newDate.setDate(1);
  // [박소민] Date 객체는 밀리초 단위까지 비교하기 때문에 정확한 비교를 위해 모든 시간을 0으로 정한다.
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
// [박소민] dayValue가 해당 월의 날짜 값 범위를 벗어나면 setDate ()는 그에 따라 Date 객체를 업데이트합니다.
// 예를 들어, dayValue에 0이 제공되면 날짜는 이전 달의 마지막 날로 설정됩니다.
export const endOfMonth = (date: Date) => {
  const newDate = cloneDate(date);
  newDate.setMonth(newDate.getMonth() + 1);
  newDate.setDate(0);
  // [박소민] TODO: Date 객체 추가 설명 적기
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

export const startOfWeek = (date: Date): Date => {
  const newDate = cloneDate(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day;
  newDate.setDate(diff);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const endOfWeek = (date: Date): Date => {
  const newDate = startOfWeek(date);
  newDate.setDate(newDate.getDate() + 6);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

export const eachDayOfInterval = ({
  start,
  end,
}: {
  start: Date;
  end: Date;
}): Date[] => {
  const days: Date[] = [];
  const currentDate = startOfWeek(start);
  const endTime = end.getTime();

  while (currentDate.getTime() <= endTime) {
    days.push(cloneDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export const formatDate = (date: Date) => date.getDate();

const yearMonthFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
});

export const formatYearMonth = (date: Date) => yearMonthFormatter.format(date);

export const generateDateGrid = (startDate: Date, endDate: Date) => {
  return eachDayOfInterval({ start: startDate, end: endDate });
};

export const getThreeWeekRange = (baseDate: Date) => {
  const startDate = startOfWeek(subWeeks(baseDate, 1));
  const endDate = endOfWeek(addWeeks(baseDate, 1));
  return { startDate, endDate };
};

export const getMonthRange = (currentDate: Date) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  return { startDate, endDate };
};

export const getISODate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getTodayISODate = (): string => {
  return getISODate(new Date());
};
