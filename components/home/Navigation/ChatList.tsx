import { groupByDate } from "@/common/util";
import { Chat } from "@/types/chat";
import { use, useEffect, useMemo, useRef, useState } from "react";
import ChatItem from "./ChatItem";
import { useEventBusContext } from "@/components/EventBusContext";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

export default function ChatList() {
  const [chatList, setChatList] = useState<Chat[]>([]);

  const pageRef = useRef(1); //分页

  const groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);
  // 判断是否是当前选中的对话
  const {
    state: { selectedChat },
    dispatch,
  } = useAppContext();
  // 监听事件
  const { subscribe, unsubscribe } = useEventBusContext();

  const getData = async () => {
    const res = await fetch(`/api/chat/list?page=${pageRef.current}`, {
      method: "GET",
    });
    if (!res.ok) {
      console.log(res.statusText);
      return;
    }

    const { data } = await res.json();

    // 第一页数据直接覆盖，其他页面追加到末尾
    if (pageRef.current === 1) {
      setChatList(data.list);
    } else {
      setChatList((list) => list.concat(data.list));
    }
  };
  // 首次加载数据
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // 收到事件通知到时候
    const callback: EventListener = () => {
      pageRef.current = 1;
      getData();
    };
    subscribe("fetchChatList", callback);
    // 卸载
    return () => unsubscribe("fetchChatList", callback);
  }, []);

  return (
    <div className="flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto">
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div className="sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500">
              {date}
            </div>
            <ul>
              {list.map((item) => {
                const isSelected = selectedChat?.id === item.id;
                return (
                  <ChatItem
                    key={item.id}
                    isSelected={isSelected}
                    item={item}
                    onSelected={(chat) =>
                      dispatch({
                        type: ActionType.UPDATA,
                        field: "selectedChat",
                        value: chat,
                      })
                    }
                  />
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
