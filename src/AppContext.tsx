import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  searchCount: number;
  incrementSearchCount: () => void;
  resetSearchCount: () => void;
}

const Context = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchCount, setSearchCount] = useState<number>(() => {
    const saved = localStorage.getItem('@DetetiveIA:searchCount');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('@DetetiveIA:searchCount', searchCount.toString());
  }, [searchCount]);

  const incrementSearchCount = () => setSearchCount(prev => prev + 1);
  const resetSearchCount = () => setSearchCount(0);

  return (
    <Context.Provider value={{ searchCount, incrementSearchCount, resetSearchCount }}>
      {children}
    </Context.Provider>
  );
};

export const useApp = () => {
  const context = useContext(Context);
  if (!context) throw new Error('useApp deve ser utilizado dentro de um AppProvider');
  return context;
};
