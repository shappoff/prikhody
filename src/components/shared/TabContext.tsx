'use client'

import React, { createContext, useContext } from 'react';

interface TabContextType {
  value: string | number;
  onChange: (event: React.SyntheticEvent, newValue: string | number) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within TabContext');
  }
  return context;
};

interface TabContextProviderProps {
  value: string | number;
  onChange: (event: React.SyntheticEvent, newValue: string | number) => void;
  children: React.ReactNode;
}

export const TabContextProvider: React.FC<TabContextProviderProps> = ({
  value,
  onChange,
  children
}) => {
  return (
    <TabContext.Provider value={{ value, onChange }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabContextProvider;

