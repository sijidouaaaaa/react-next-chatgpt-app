"use client"; //客户端

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type StateType = {
  displayNavigation: boolean; //显示导航栏
  themeMode: "light" | "dark"; //主题模式
};
interface IAppContextProps {
  state: StateType;
  setState: Dispatch<SetStateAction<StateType>>;
}

const AppContext = createContext<IAppContextProps>(null!);
export function useAppContext() {
  return useContext(AppContext);
}
export default function AppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<StateType>({
    displayNavigation: true,
    themeMode: "light",
  });
  const conttextValue = useMemo(() => {
    return {
      state,
      setState,
    };
  }, [state]);
  return (
    <AppContext.Provider value={conttextValue}>{children}</AppContext.Provider>
  );
}
