"use client"; //客户端

import {
  Action,
  initialState,
  reducer,
  StateType,
} from "@/reducers/AppReducer";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

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
