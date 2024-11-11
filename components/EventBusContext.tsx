// 客户端使用
"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";

// 定义事件监听器类型
export type EventListener = (data?: any) => void;

// 定义事件总线上下文属性类型
export type IEventBusContextProps = {
  subscribe: (event: string, callback: EventListener) => void; // 订阅事件：事件类型，回调函数
  unsubscribe: (event: string, callback: EventListener) => void; // 取消订阅
  publish: (event: string, data?: any) => void; // 发布事件
};

// 创建事件总线上下文
const EventBusContext = createContext<IEventBusContextProps>(null!);

// 自定义 Hook 用于访问事件总线上下文
export function useEventBusContext() {
  return useContext(EventBusContext);
}

// 事件总线上下文提供者组件
export default function EventBusContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // 状态：存储事件监听器
  const [listeners, setListeners] = useState<Record<string, EventListener[]>>(
    {},
  );

  // 订阅方法
  const subscribe = useCallback(
    (event: string, callback: EventListener) => {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(callback);
      setListeners({ ...listeners });
    },
    [listeners],
  );

  // 取消订阅方法
  const unsubscribe = useCallback(
    (event: string, callback: EventListener) => {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((cb) => cb !== callback);
        setListeners({ ...listeners });
      }
    },
    [listeners],
  );

  // 发布方法
  const publish = useCallback(
    (event: string, data?: any) => {
      if (listeners[event]) {
        listeners[event].forEach((callback) => callback(data));
      }
    },
    [listeners],
  );

  // 上下文值
  const contextValue = useMemo(() => {
    return { subscribe, unsubscribe, publish };
  }, [subscribe, unsubscribe, publish]);

  // 渲染上下文提供者
  return (
    <EventBusContext.Provider value={contextValue}>
      {children}
    </EventBusContext.Provider>
  );
}
