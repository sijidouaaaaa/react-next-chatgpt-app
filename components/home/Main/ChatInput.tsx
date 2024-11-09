import { useAppContext } from "@/components/AppCpntext";
import Button from "@/components/common/Button";
import { ActionType } from "@/reducers/AppReducer";
import { MessageListItem, MessageRequestBody } from "@/types/chat";
import { send } from "process";

import { useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { PiLightningFill, PiStopBold } from "react-icons/pi";
import TextareaAutoSize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";
export default function ChatInput() {
  const [messageText, setMessageText] = useState(""); // 输入框内容
  // 获取当前聊天记录
  const {
    state: { messageList, currentModel, streamingId },
    dispatch,
  } = useAppContext();

  const stopRef = useRef(false);
  const senhdMessage = () => {
    const message: MessageListItem = {
      content: messageText,
      id: uuidv4(),
      role: "user",
    };
    // 当前消息和历史消息链接一起
    const messages = messageList.concat([message]);
    dispatch({ type: ActionType.ADD_MESSAGE, message });
    doMessage(messages);
  };

  const reSend = () => {
    const messages = [...messageList];
    // 判断最后一条消息是否是回复消息
    if (
      messages.length !== 0 &&
      messages[messages.length - 1].role === "assistant"
    ) {
      dispatch({
        type: ActionType.REMOVE_MESSAGE,
        message: messages[messages.length - 1],
      });
      messages.splice(messages.length - 1, 1);
    }
    doMessage(messages);
  };

  /**
   * 发送消息
   */
  const doMessage = async (messages: MessageListItem[]) => {
    const body: MessageRequestBody = { messages, model: currentModel };
    //当前消息 添加到消息列表

    setMessageText("");

    const controller = new AbortController();

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal, //通过控制器取消请求
      body: JSON.stringify(body),
    });
    // 判断状态码是否正常
    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
    // 判断是否获取到body
    if (!response.body) {
      console.log("body error");
      return;
    }

    /**
     * 成功之后
     */
    // 服务端消息添加消息列表
    const responseMessage: MessageListItem = {
      id: uuidv4(),
      role: "assistant",
      content: "",
    };
    dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage });
    dispatch({
      type: ActionType.UPDATA,
      field: "streamingId",
      value: responseMessage.id,
    });

    // 正常-获取读取流
    const reader = response.body.getReader();
    // 创建一个文本解码器，解码字符串
    const decoder = new TextDecoder();
    // 循环读取流
    let done = false;
    let content = "";
    while (!done) {
      // 停止生成内容
      if (stopRef.current) {
        // 重置标识位
        stopRef.current = false;
        // 终止网络请求
        controller.abort();
        break;
      }

      const request = await reader.read();
      done = request.done;
      const chunk = decoder.decode(request.value);
      content += chunk;
      dispatch({
        type: ActionType.UPDATA_MESSAGE,
        message: { ...responseMessage, content },
      });
    }
    // 读取流结束，将当前消息的id清空
    dispatch({
      type: ActionType.UPDATA,
      field: "streamingId",
      value: "",
    });
    // 清空输入框
    setMessageText("");
  };

  return (
    <div
      className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] 
     pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
        {messageList.length !== 0 &&
          (streamingId !== "" ? (
            <Button
              icon={PiStopBold}
              variant="primary"
              className="font-medium"
              onClick={() => {
                stopRef.current = true;
              }}
            >
              停止生成
            </Button>
          ) : (
            <Button
              icon={MdRefresh}
              variant="primary"
              className="font-medium"
              onClick={reSend}
            >
              重新生成
            </Button>
          ))}
        <div
          className="flex items-end w-full border border-black/10 
         dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0,1)] py-4"
        >
          <div className="mx-3 mb-2.5">
            <PiLightningFill />
          </div>
          <TextareaAutoSize
            placeholder="请输入你的问题......"
            rows={1}
            className="outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none border-0"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button
            className="mx-3 rounded-lg"
            icon={FiSend}
            variant="primary"
            onClick={senhdMessage}
            disabled={messageText.trim() === "" || streamingId !== ""}
          />
        </div>{" "}
        <footer className="text-center text-sm text-gray-700 dark:text-gray-300 px-4 pb-6">
          {new Date().getFullYear()}&nbsp;©{" "}
          <a
            href="https://github.com/sijidouaaaaa/react-next-chatgpt-app"
            target="_blank"
            className="font-medium py-[1px] border-b border-dotted border-black/60 
            hover:border-black/0 dark:border-gray-200  dark:hover:border-gray-200/0 animated-underline"
          >
            abbey.d demo
          </a>
          .&nbsp;基于第三方提供的接口.
        </footer>
      </div>
    </div>
  );
}
