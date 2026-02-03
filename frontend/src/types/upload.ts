export interface FirstContentAreaHeaderProps {
  uploadTab: 'file' | 'text';
  setUploadTab: (newValue: 'file' | 'text') => void;
  step?: string;
  nextStep?: (step: string) => void;
}
