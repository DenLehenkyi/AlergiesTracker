import React, { useState, createContext } from 'react';

const AllergyContext = createContext();

const AllergyProvider= ({ children }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const addId = (id) => {
    setSelectedIds((prevIds) => [...prevIds, id]);
  };

  return (
    <AllergyContext.Provider value={{ selectedIds, addId }}>
        {children}
    </AllergyContext.Provider>
  );
};

export { AllergyProvider, AllergyContext };
