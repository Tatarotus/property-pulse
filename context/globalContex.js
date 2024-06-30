"use client";

import { createContext, useContext, useState } from "react";

// Create context
const GlobalContext = createContext();

// Create provider
export function GlobalProvider({ children }) {
  const [count, setCount] = useState("");
  return (
    <GlobalContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
