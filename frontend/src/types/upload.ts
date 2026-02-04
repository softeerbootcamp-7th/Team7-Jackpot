export interface FirstContentAreaHeaderProps {
  uploadTab: 'file' | 'text';
  setUploadTab: (newValue: 'file' | 'text') => void;
  step?: string;
  nextStep?: (step: string) => void;
}

export interface CoverLetterListProps {
  tabState: 1 | 2 | 3;
  setTabState: (newValue: 1 | 2 | 3) => void;
}

export interface PaginationButtonIconProps {
  color: string;
}

export interface StepInformationProps {
  className: string;
  Icon?: React.ComponentType<{ color: string }>;
  icon?: React.ReactNode;
  step: string;
  name: string;
  loadingTitle?: string;
  loadingSubTitle?: string;
}
