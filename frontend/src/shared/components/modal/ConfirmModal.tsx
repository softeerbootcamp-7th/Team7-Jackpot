// src/shared/components/Modal/ConfirmModal.tsx
import BaseModal from './BaseModal';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmText = '삭제하기',
  cancelText = '취소하기',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onCancel}>
      {/* 피그마에서 추출한 UI 적용 */}
      <div className='bg-Primitive-Color-gray-white inline-flex w-96 flex-col items-center justify-center gap-5 rounded-[32px] p-6 shadow-[0px_0px_30px_0px_rgba(41,41,41,0.02)]'>
        <div className='flex flex-col items-center justify-start gap-3.5 self-stretch'>
          {/* 경고 아이콘 */}
          <div className='relative h-9 w-9'>
            <div className='absolute top-0 left-0 h-9 w-9 overflow-hidden'>
              <div className='bg-Semantic-text-red absolute top-0 left-[2px] h-7 w-8' />
              <div className='bg-Primitive-Color-red-red-800 absolute top-[4.63px] left-[8.70px] h-5 w-5' />
              <div className='bg-Primitive-Color-red-red-100 absolute top-[2.11px] left-[6.18px] h-6 w-6' />
            </div>
          </div>

          <div className='flex flex-col items-center justify-center gap-px self-stretch'>
            <h3 className='text-Semantic-text-red text-center text-lg leading-7 font-bold'>
              {title}
            </h3>
            {/* 문자열에 \n이 있으면 줄바꿈으로 처리되도록 whitespace-pre-line 추가 */}
            <p className='text-Semantic-text-label-400 text-center text-sm leading-5 font-normal whitespace-pre-line'>
              {description}
            </p>
          </div>
        </div>

        <div className='inline-flex items-center justify-start gap-3 self-stretch'>
          <button
            type='button'
            onClick={onCancel}
            className='bg-Semantic-sub-button-1-primary flex flex-1 items-center justify-center gap-1.5 rounded-2xl px-5 py-3 transition-opacity hover:opacity-80 active:scale-95'
          >
            <span className='text-Semantic-text-label-600 text-lg leading-7 font-bold'>
              {cancelText}
            </span>
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className='bg-Semantic-black-button-primary flex flex-1 items-center justify-center gap-1.5 rounded-2xl px-5 py-3 transition-opacity hover:opacity-80 active:scale-95'
          >
            <span className='text-Semantic-text-white text-lg leading-7 font-bold'>
              {confirmText}
            </span>
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
