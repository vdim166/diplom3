import { createContext } from "react";

export type GlobalContextType = {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  name: null,
  setName: () => {},
});
