import { useCallback } from 'react';

import { SOCKET_EVENT_TYPE } from '@/shared/constants/websocket';
import type { UseReviewStateResult } from '@/shared/hooks/useReviewState';
import type { WebSocketResponse } from '@/shared/types/websocket';

interface UseSocketMessageParams {
  dispatchers: UseReviewStateResult['dispatchers'];
}

export const useSocketMessage = ({ dispatchers }: UseSocketMessageParams) => {
  const handleMessage = useCallback(
    (message: WebSocketResponse) => {
      switch (message.type) {
        case SOCKET_EVENT_TYPE.TEXT_REPLACE_ALL:
          dispatchers.handleTextReplaceAllEvent(message.qnAId, message.payload);
          break;
        case SOCKET_EVENT_TYPE.TEXT_UPDATE:
          dispatchers.handleTextUpdateEvent(message.qnAId, message.payload);
          break;
        case SOCKET_EVENT_TYPE.REVIEW_CREATED:
          dispatchers.handleReviewCreatedEvent(message.qnAId, message.payload);
          break;
        case SOCKET_EVENT_TYPE.REVIEW_UPDATED:
          dispatchers.handleReviewUpdatedEvent(message.qnAId, message.payload);
          break;
        case SOCKET_EVENT_TYPE.REVIEW_DELETED:
          dispatchers.handleReviewDeletedEvent(message.qnAId, message.payload);
          break;
        case SOCKET_EVENT_TYPE.SHARE_LINK_DEACTIVATED:
          dispatchers.handleShareLinkDeactivatedEvent(message.qnAId);
          break;
        default:
          break;
      }
    },
    [dispatchers],
  );

  return { handleMessage };
};
