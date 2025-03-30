import { ReactNode, useState } from "react";
import { GlobalContext, GlobalContextType } from "./GlobalContext";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [name, setName] = useState<string | null>(null);
  const state: GlobalContextType = {
    name,
    setName,
  };

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};
