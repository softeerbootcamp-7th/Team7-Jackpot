import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getAccessToken } from '@/features/auth/libs/tokenStore';
import { sseStream } from '@/shared/api/sseStream';
import { isNotificationPayload } from '@/shared/libs/checkStreamPayload';
import { readStream } from '@/shared/libs/readStream';
import type { SSEPayload } from '@/shared/types/sse';

export const useSSE = () => {
  const token = getAccessToken();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();

    const connectSSE = async () => {
      try {
        const response = await sseStream.connect(controller.signal);

        await readStream<SSEPayload>(response, (data) => {
          console.log('알림 도착:', data);

          if (isNotificationPayload(data)) {
            const { unreadNotificationCount, notification } = data;

            // 배지 개수는 API 재요청 없이 덮어쓰기
            queryClient.setQueryData(
              ['notificationCount'],
              unreadNotificationCount,
            );

            // 알림 리스트 새로고침
            queryClient.invalidateQueries({ queryKey: ['notificationList'] });

            console.log(
              `[새 알림] ${notification.title}: ${notification.content}`,
            );
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') {
            console.error('SSE 연결 끊김, 3초 후 재연결...', error);
            setTimeout(connectSSE, 3000);
          } else {
            console.error('알수없는 오류 발생');
          }
        }
      }
    };

    connectSSE();

    return () => {
      controller.abort();
    };
  }, [token, queryClient]);
};
