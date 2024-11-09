export interface Chat {
  id: string;
  title: string;
  updateTime: number;
}

export interface MessageListItem {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface MessageRequestBody {
  messages: MessageListItem[];
  model: string;
}
