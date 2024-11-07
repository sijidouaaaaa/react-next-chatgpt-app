import Button from "@/components/common/Button";
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
  const [delecting, setDelecting] = useState(false);

  //   监听是否被选中，如果是，就取消编辑
  useEffect(() => {
    setEditing(false);
  }, [isSelected]);

  return (
    <li
      key={item.id}
      onClick={() => onSelected(item)}
      className={`relative group flex items-center p-3 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 ${
        isSelected ? "bg-gray-800" : ""
      }`}
    >
      {/*标题前的图标 */}
      <div>{delecting ? <PiTrashBold /> : <PiChatBold />}</div>

      {/* 编辑的中 */}
      {editing ? (
        <input
          autoFocus={true} //自动聚焦
          className="flex-1 min-w-0 bg-transparent outline-none"
          defaultValue={item.title}
        />
      ) : (
        <div className="relative flex-1 whitespace-nowrap overflow-hidden">
          {item.title}
          {/* 固定在标题右边 */}
          <span
            className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8  bg-gradient-to-l ${
              isSelected ? "from-gray-800" : "from-gray-900"
            }`}
          ></span>
        </div>
      )}

      {isSelected && (
        <div className="absolute right-1 flex">
          {editing || delecting ? (
            <>
              <Button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  if (delecting) {
                    //删除
                    console.log("删除");
                  } else {
                    // 编辑
                    console.log("编辑");
                  }
                  setDelecting(false);
                  setEditing(false);
                  e.stopPropagation(); //防止li触发点击事件
                }}
              >
                <MdCheck />
              </Button>
              <Button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  setDelecting(false);
                  setDelecting(false);
                  e.stopPropagation(); //防止li触发点击事件
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
                  e.stopPropagation(); //防止li触发点击事件
                }}
              >
                <AiOutlineEdit />
              </Button>
              <Button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  setDelecting(true);
                  e.stopPropagation(); //防止li触发点击事件
                }}
              >
                <MdDeleteOutline />
              </Button>
            </>
          )}
        </div>
      )}
    </li>
  );
}
