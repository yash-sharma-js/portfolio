
import { createContext, useContext, useState } from "react";

interface TerminalModeContextType {
  isTerminalMode: boolean;
  toggleTerminalMode: () => void;
}

const TerminalModeContext = createContext<TerminalModeContextType | undefined>(undefined);

export const TerminalModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  const toggleTerminalMode = () => {
    setIsTerminalMode((prev) => !prev);
    if (!isTerminalMode) {
      document.body.classList.add("terminal-mode");
    } else {
      document.body.classList.remove("terminal-mode");
    }
  };

  return (
    <TerminalModeContext.Provider value={{ isTerminalMode, toggleTerminalMode }}>
      {children}
    </TerminalModeContext.Provider>
  );
};

export const useTerminalMode = () => {
  const context = useContext(TerminalModeContext);
  if (context === undefined) {
    throw new Error("useTerminalMode must be used within a TerminalModeProvider");
  }
  return context;
};
