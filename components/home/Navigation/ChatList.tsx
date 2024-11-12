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

  const loadMoreRef = useRef(null); //底部的div
  const hasMoreRef = useRef(false); //是否还有更多数据
  const loadingRef = useRef(false); //是否正在加载中==>避免重复请求

  const getData = async () => {
    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;

    const res = await fetch(`/api/chat/list?page=${pageRef.current}`, {
      method: "GET",
    });
    if (!res.ok) {
      console.log(res.statusText);
      loadingRef.current = false;
      return;
    }

    const { data } = await res.json();
    console.log("getData", data);

    // 每次获取数据更新字段
    hasMoreRef.current = data.hasMore;

    // 第一页数据直接覆盖，其他页面追加到末尾
    if (pageRef.current === 1) {
      setChatList(data.list);
    } else {
      setChatList((list) => list.concat(data.list));
    }
    // 页码递增
    pageRef.current++;
    loadingRef.current = false;
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

  // 监听滚动到底部
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let div = loadMoreRef.current;
    if (div) {
      // 检测元素与元素，元素与试图窗口之间的相交情况
      // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
      // 判断底部的div节点与试图的相交情况
      observer = new IntersectionObserver((entries) => {
        // 到达底部和底部有更多数据就加载更多==》获取请求
        if (entries[0].isIntersecting && hasMoreRef.current) {
          console.log("到底部了");
          getData();
        }
      });
      observer.observe(div);
    }

    return () => {
      // 取消监听
      if (observer && div) {
        observer.unobserve(div);
      }
    };
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
      <div ref={loadMoreRef}>&nbsp;</div>
    </div>
  );
}
