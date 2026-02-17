// [박소민] TODO: applySeason 보고 ISODateString/혹은 다른 걸로 확인
export interface ScrapItem {
  questionId: number;
  companyName: string;
  jobPosition: string;
  applySeason: string;
  question: string;
  answer: string;
}

export interface GetScrapsResponse {
  scraps: ScrapItem[];
  hasNext: boolean;
}

