export type StateType = {
  displayNavigation: boolean; //显示导航栏
  themeMode: "light" | "dark"; //主题模式
  currentModel: string;
};

export enum ActionType {
  UPDATA = "UPDATA",
}

type UpdateAction = {
  type: ActionType.UPDATA;
  field: string;
  value: any;
};

export type Action = UpdateAction;

export const initialState: StateType = {
  displayNavigation: true,
  themeMode: "light",
  currentModel: "gpt-3.5-turbo",
};

export function reducer(state: StateType, action: Action): StateType {
  switch (
    action.type //决定执行那种
  ) {
    case ActionType.UPDATA:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      throw new Error("unknown action");
  }
}
