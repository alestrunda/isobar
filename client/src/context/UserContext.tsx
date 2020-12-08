import { createContext, useState } from "react";

interface Context {
  apiToken: string;
  setApiToken: (token: string) => void;
}

interface ContextProviderProps {
  children: React.ReactNode;
}

const defaultContext: Context = {
  apiToken: "",
  setApiToken: () => {},
};

export const UserContext = createContext(defaultContext);

export const UserContextProvider = ({ children }: ContextProviderProps) => {
  const [apiToken, setApiToken] = useState("");

  return (
    <UserContext.Provider value={{ apiToken, setApiToken }}>
      {children}
    </UserContext.Provider>
  );
};
