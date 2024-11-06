import { HiPlus } from "react-icons/hi";
import Button from "../../common/Button";
import { LuPanelLeft } from "react-icons/lu";
import { useAppContext } from "@/components/AppCpntext";
import { ActionType } from "@/reducers/AppReducer";

export default function Menubar() {
  const { dispatch } = useAppContext();
  return (
    <div className=" flex space-x-3">
      <Button icon={HiPlus} variant="outline" className="flex-1">
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
