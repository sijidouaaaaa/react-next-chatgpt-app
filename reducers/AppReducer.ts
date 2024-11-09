import { MessageListItem } from "@/types/chat";

export type StateType = {
  displayNavigation: boolean; //显示导航栏
  themeMode: "light" | "dark"; //主题模式
  currentModel: string;
  messageList: MessageListItem[];
  streamingId: string; //目前回复消息的id
};

export enum ActionType {
  UPDATA = "UPDATA",
  ADD_MESSAGE = "ADD_MESSAGE",
  UPDATA_MESSAGE = "UPDATA_MESSAGE",
}
type AddMessageAction = {
  type: ActionType.ADD_MESSAGE | ActionType.UPDATA_MESSAGE;
  message: MessageListItem;
};

type UpdateAction = {
  type: ActionType.UPDATA;
  field: string;
  value: any;
};

export type Action = UpdateAction | AddMessageAction;

export const initialState: StateType = {
  displayNavigation: true,
  themeMode: "light",
  currentModel: "gpt-3.5-turbo",
  messageList: [],
  streamingId: "",
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
    case ActionType.ADD_MESSAGE: {
      const messageList = state.messageList.concat([action.message]);
      return {
        ...state,
        messageList,
      };
    }
    case ActionType.UPDATA_MESSAGE: {
      const messageList = state.messageList.map((item) => {
        if (item.id === action.message.id) {
          return action.message;
        }
        return item;
      });
      return {
        ...state,
        messageList,
      };
    }
    default:
      throw new Error("unknown action");
  }
}
