import React, { createContext, useState } from 'react';

const AllergyContext = createContext();

const AllergyProvider = ({ children }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const addId = (id) => {
    setSelectedIds((prevIds) => [...prevIds, id]);
  };

  const resetIds = () => {
    setSelectedIds([]);
  };

  return (
    <AllergyContext.Provider value={{ selectedIds, addId, resetIds }}>
      {children}
    </AllergyContext.Provider>
  );
};

export { AllergyContext, AllergyProvider };
