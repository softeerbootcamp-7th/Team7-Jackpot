import { useState } from 'react';

import type { LibraryView } from '@/features/library/types';

const useLibraryView = () => {
  const [currentTab, setCurrentTab] = useState<LibraryView>('COMPANY');

  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
    null,
  );

  const handleTabChange = (tab: LibraryView) => {
    setCurrentTab(tab);
    setSelectedFolderId(null);
    setSelectedDocumentId(null);
  };

  return {
    state: {
      currentTab,
      selectedFolderId,
      selectedDocumentId,
    },
    actions: {
      handleTabChange,
      setSelectedDocumentId,
      setSelectedFolderId,
    },
  };
};

export default useLibraryView;
