import Button from "@/components/common/Button";
import { useEventBusContext } from "@/components/EventBusContext";
import { Chat } from "@/types/chat";

import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTrashBold } from "react-icons/pi";

type IChatItemProps = {
  item: Chat;
  isSelected: boolean;
  onSelected: (chat: Chat) => void;
};

export default function ChatItem(props: IChatItemProps) {
  const { item, isSelected, onSelected } = props;
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [title, setTitle] = useState(item.title);
  const { publish } = useEventBusContext();

  // 监听是否被选中，如果是，就取消编辑
  useEffect(() => {
    setEditing(false);
  }, [isSelected]);

  const updateChat = async () => {
    const res = await fetch("/api/chat/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        title,
      }),
    });
    if (!res.ok) {
      console.log(res.statusText);
      return;
    }
    const { code } = await res.json();
    if (code === 0) {
      publish("fetchChatList");
    }
  };

  return (
    <li
      key={item.id}
      onClick={() => onSelected(item)}
      className={`relative group flex items-center p-3 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 ${
        isSelected ? "bg-gray-800" : ""
      }`}
    >
      {/* 标题前的图标 */}
      <span>{deleting ? <PiTrashBold /> : <PiChatBold />}</span>

      {/* 编辑的内容 */}
      {editing ? (
        <input
          autoFocus={true} // 自动聚焦
          className="flex-1 min-w-0 bg-transparent outline-none"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      ) : (
        <span className="relative flex-1 whitespace-nowrap overflow-hidden">
          {title}
          {/* 固定在标题右边 */}
          <span
            className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 bg-gradient-to-l ${
              isSelected ? "from-gray-800" : "from-gray-900"
            }`}
          ></span>
        </span>
      )}

      {isSelected && (
        <span className="absolute right-1 flex">
          {editing || deleting ? (
            <>
              <Button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  if (deleting) {
                    // 删除
                    console.log("删除");
                  } else {
                    // 编辑
                    updateChat();
                  }
                  setDeleting(false);
                  setEditing(false);
                  e.stopPropagation(); // 防止li触发点击事件
                }}
              >
                <MdCheck />
              </Button>
              <Button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  setDeleting(false);
                  setEditing(false);
                  e.stopPropagation(); // 防止li触发点击事件
                }}
              >
                <MdClose />
              </Button>
            </>
          ) : (
            <>
              <Button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  setEditing(true);
                  e.stopPropagation(); // 防止li触发点击事件
                }}
              >
                <AiOutlineEdit />
              </Button>
              <Button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  setDeleting(true);
                  e.stopPropagation(); // 防止li触发点击事件
                }}
              >
                <MdDeleteOutline />
              </Button>
            </>
          )}
        </span>
      )}
    </li>
  );
}
