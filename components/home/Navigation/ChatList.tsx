import { groupByDate } from "@/common/util";
import { Chat } from "@/types/chat";
import { useMemo, useState } from "react";
import { PiCableCar, PiChatBold } from "react-icons/pi";

export default function ChatList() {
  const [chatList, setChatList] = useState<Chat[]>([
    {
      id: "1",
      title: "chat1文字类型的数据说话还有话好好的",
      updateTime: Date.now(),
    },
    {
      id: "2",
      title: "chat1",
      updateTime: Date.now() + 1,
    },
    {
      id: "3",
      title: "chat1",
      updateTime: Date.now() + 2,
    },
    {
      id: "1",
      title: "chat1文字类型的数据说话还有话好好的",
      updateTime: Date.now() + 3,
    },
    {
      id: "25",
      title: "chat1",
      updateTime: Date.now() + 4,
    },
    {
      id: "21",
      title: "chat1",
      updateTime: Date.now() + 5,
    },
    {
      id: "12",
      title: "chat1",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 4,
    },
    {
      id: "41",
      title: "chat1",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "15",
      title: "chat1",
      updateTime: Date.now() + 4,
    },
    {
      id: "17",
      title: "chat1",
      updateTime: Date.now() + 5,
    },
    {
      id: "13",
      title: "chat1",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 4,
    },
    {
      id: "14",
      title: "chat1",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "16",
      title: "chat1",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
  ]);
  // 判断是否是当前选中的对话
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);

  return (
    <div className="flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto">
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div className="sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500">
              {date}
            </div>
            <ul>
              {list.map((chat) => {
                const isSelected = selectedChat?.id === chat.id;
                return (
                  <li
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`group flex items-center p-3 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 ${
                      isSelected ? "bg-gray-800" : ""
                    }`}
                  >
                    <div>
                      <PiChatBold />
                    </div>
                    <div className="relative flex-1 whitespace-nowrap overflow-hidden">
                      {chat.title}
                      {/* 固定在标题右边 */}
                      <span
                        className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8  bg-gradient-to-l ${
                          isSelected ? "from-gray-800" : "from-gray-900"
                        }`}
                      ></span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
