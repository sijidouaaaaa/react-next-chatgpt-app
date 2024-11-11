import { useAppContext } from "@/components/AppContext";
import Markdown from "@/components/common/Markdown";
import { ActionType } from "@/reducers/AppReducer";
import { useEffect } from "react";
import { SiOpenai } from "react-icons/si";

export default function MessageList() {
  const {
    state: { messageList, streamingId, selectedChat },
    dispatch,
  } = useAppContext();

  const getData = async (chatId: string) => {
    const res = await fetch(`/api/message/list?chatId=${chatId}`, {
      method: "GET",
    });
    if (!res.ok) {
      console.log(res.statusText);
      return;
    }

    const { data } = await res.json();

    dispatch({
      type: ActionType.UPDATA,
      field: "messageList",
      value: data.list,
    });
  };
  // 当前如果存在选中的会话，则获取该会话的聊天记录
  useEffect(() => {
    if (selectedChat) {
      getData(selectedChat.id);
    } else {
      dispatch({
        type: ActionType.UPDATA,
        field: "messageList",
        value: [],
      });
    }
  }, [selectedChat]);

  return (
    <div className="w-full pt-10 pb-48 dark:text-gray-300">
      <ul>
        {messageList &&
          messageList.length > 0 &&
          messageList.map((message) => {
            const isUser = message?.role === "user";
            return (
              <li
                key={message.id}
                className={`${
                  isUser
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-700"
                }`}
              >
                <div className="w-full max-w-4xl mx-auto flex space-x-6 px-4 py-6 text-lg">
                  <div className="text-3xl leading-[1]">
                    {isUser ? "😊" : <SiOpenai />}
                  </div>
                  <div className="flex-1">
                    {/* 判断当前消息是不是正在回复的消息 */}
                    <Markdown>{`${message?.content}${message.id === streamingId ? "▍" : ""}`}</Markdown>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
