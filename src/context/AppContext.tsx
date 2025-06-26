'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TabName = 'cat' | 'mouse' | 'catCards' | 'mouseCards';

interface AppContextType {
  activeTab: 'cat' | 'mouse' | 'catCards' | 'mouseCards' | null;
  selectedCharacter: string | null;
  selectedCard: string | null;
  isDetailedView: boolean;
  handleTabChange: (tabId: TabName | '') => void;
  handleSelectCharacter: (characterId: string) => void;
  handleSelectCard: (cardId: string, fromCharacterId?: string) => void;
  toggleDetailedView: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabName | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isDetailedView, setIsDetailedView] = useState<boolean>(false);

  const handleTabChange = (tabId: TabName | '') => {
    setActiveTab(tabId === '' ? null : tabId);
    setSelectedCharacter(null);
    setSelectedCard(null);
  };

  const handleSelectCharacter = (characterId: string) => {
    setSelectedCharacter(characterId);
    setSelectedCard(null);
  };

  const handleSelectCard = (cardId: string, fromCharacterId?: string) => {
    setSelectedCard(cardId);
    setSelectedCharacter(null);

    // Update URL to include fromCharacterId if provided
    if (fromCharacterId) {
      const params = new URLSearchParams(window.location.search);
      params.set('from', fromCharacterId);
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    } else {
      // If no fromCharacterId, remove the 'from' parameter
      const params = new URLSearchParams(window.location.search);
      params.delete('from');
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  };

  const toggleDetailedView = () => {
    setIsDetailedView(!isDetailedView);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        selectedCharacter,
        selectedCard,
        isDetailedView,
        handleTabChange,
        handleSelectCharacter,
        handleSelectCard,
        toggleDetailedView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
