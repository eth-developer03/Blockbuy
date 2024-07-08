import React, { createContext, useState } from 'react';

// Create a context
export const ValueContext = createContext();

// Create a provider component
export const ValueProvider = ({ children }) => {
  const [inputvalue, setvalue] = useState('');

  return (
    <ValueContext.Provider value={{ inputvalue, setvalue }}>
      {children}
    </ValueContext.Provider>
  );
};
