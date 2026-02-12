import type { GetScrapsResponse } from '@/features/coverLetter/types/coverLetter';
import { parseErrorResponse } from '@/shared/utils/fetchUtils';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getToken(): string {
  return localStorage.getItem('accessToken') || '';
}

interface GetScrapsParams {
  searchWord?: string;
  size?: number;
  lastQnaId?: number;
}

export const fetchScraps = async ({
  searchWord,
  size,
  lastQnaId,
}: GetScrapsParams = {}): Promise<GetScrapsResponse> => {
  const params = new URLSearchParams();

  if (searchWord) params.set('searchWord', searchWord);
  if (size !== undefined) params.set('size', String(size));
  if (lastQnaId !== undefined) params.set('lastQnaId', String(lastQnaId));

  const response = await fetch(
    `${BASE_URL}/search/scrap?${params.toString()}`,
    {
      headers: {
        Authorization: `${getToken()}`,
      },
    },
  );

  if (!response.ok) {
    await parseErrorResponse(response);
  }

  return response.json();
};

interface getSharedLinkResponse {
  active: boolean;
  shareLinkId: string;
}

export const fetchSharedLink = async ({
  coverLetterId,
}: {
  coverLetterId: number;
}): Promise<getSharedLinkResponse> => {
  const response = await fetch(
    `${BASE_URL}/coverletter/${coverLetterId}/share-link`,
    {
      headers: {
        Authorization: `${getToken()}`,
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch QnA list');
  }

  return response.json();
};

interface ToggleSharedLinkStatusResponse {
  active: boolean;
  shareLinkId: string;
}

export const toggleSharedLinkStatus = async ({
  coverLetterId,
  active,
}: {
  coverLetterId: number;
  active: boolean;
}): Promise<ToggleSharedLinkStatusResponse> => {
  const response = await fetch(
    `${BASE_URL}/coverletter/${coverLetterId}/share-link`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `${getToken()}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ active }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch QnA list');
  }

  return response.json();
};
