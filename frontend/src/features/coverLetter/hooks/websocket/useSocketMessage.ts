import { useQueryClient } from '@tanstack/react-query';

import type { WebSocketResponse } from '@/features/coverLetter/types/websocket';

export const useSocketMessage = ({ shareId }: { shareId: string }) => {
  const queryClient = useQueryClient();
  const handleMessage = (message: WebSocketResponse) => {
    switch (message.eventType) {
      case 'TEXT_UPDATE':
        queryClient.invalidateQueries({ queryKey: ['coverLetter', shareId] });
        break;

      case 'REVIEW_CREATED':
      case 'REVIEW_UPDATED':
      case 'REVIEW_DELETED':
        queryClient.invalidateQueries({
          queryKey: ['coverLetterReviews', shareId],
        });
        break;
    }
  };

  return { handleMessage };
};
