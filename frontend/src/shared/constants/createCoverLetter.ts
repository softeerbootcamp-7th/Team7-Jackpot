import type { CreateCoverLetterRequest } from '@/shared/types/coverLetter';

export const DEFAULT_DATA: CreateCoverLetterRequest = {
  companyName: '',
  jobPosition: '',
  applyYear: new Date().getFullYear(),
  applyHalf: 'FIRST_HALF',
  deadline: '',
  questions: [{ question: '', category: '' }],
};
