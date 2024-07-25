import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface SidebarContextProps {
  visible: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(true);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  const sidebarContextValue = useMemo(() => ({ visible, toggleSidebar }), [visible]);

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar solo funciona dentro del SidebarProvider');
  }
  return context;
};
