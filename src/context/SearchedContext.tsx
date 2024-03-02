import { createContext, useState } from "react";

const defaultValue: {
  searchedText: string[];
  addSearchedText: (text: string) => void;
} = {
  searchedText: [],
  addSearchedText: () => {},
};

export const SearchedContext = createContext(defaultValue);

interface Props {
  children: React.ReactNode;
}

export const SearchedContextProvider: React.FC<Props> = ({ children }) => {
  const [searchedText, setSearchedText] = useState<string[]>([]);

  function addSearchedText(text: string) {
    setSearchedText((prev) => {
      const result = [...new Set([...prev, text])];
      return result;
    });
  }

  const contextValue = {
    searchedText,
    addSearchedText,
  };

  return (
    <SearchedContext.Provider value={contextValue}>
      {children}
    </SearchedContext.Provider>
  );
};
