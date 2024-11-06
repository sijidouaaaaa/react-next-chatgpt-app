"use client"; //客户端

import { Action, initialState, reducer } from "@/reducers/AppReducer";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

type StateType = {
  displayNavigation: boolean; //显示导航栏
  themeMode: "light" | "dark"; //主题模式
};
interface IAppContextProps {
  state: StateType;
  dispatch: Dispatch<Action>;
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const conttextValue = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state, dispatch]);
  return (
    <AppContext.Provider value={conttextValue}>{children}</AppContext.Provider>
  );
}
