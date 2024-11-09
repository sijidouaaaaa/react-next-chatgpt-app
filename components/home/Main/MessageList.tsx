import { useAppContext } from "@/components/AppCpntext";
import Markdown from "@/components/common/Markdown";

import { SiOpenai } from "react-icons/si";

export default function MessageList() {
  const {
    state: { messageList, streamingId },
  } = useAppContext();

  return (
    <div className="w-full pt-10 pb-48 dark:text-gray-300">
      <ul>
        {messageList.map((message) => {
          const isUser = message.role === "user";
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
                  <Markdown>{`${message.content} ${message.id === streamingId ? "|" : ""}`}</Markdown>
                </div>
                <div></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
