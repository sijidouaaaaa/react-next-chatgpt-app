import { HiPlus } from "react-icons/hi";
import Button from "../../common/Button";
import { LuPanelLeft } from "react-icons/lu";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

export default function Menubar() {
  const { dispatch } = useAppContext();
  return (
    <div className=" flex space-x-3">
      <Button
        icon={HiPlus}
        variant="outline"
        className="flex-1"
        // 全局中当前选择的对话置为空，
        onClick={() => {
          dispatch({
            type: ActionType.UPDATA,
            field: "selectedChat",
            value: null,
          });
        }}
      >
        新建对话
      </Button>

      <Button
        icon={LuPanelLeft}
        variant="outline"
        onClick={() => {
          dispatch({
            type: ActionType.UPDATA,
            field: "displayNavigation",
            value: false,
          });
        }}
      />
    </div>
  );
}
