import { HiPlus } from "react-icons/hi";
import Button from "../../common/Button";
import { LuPanelLeft } from "react-icons/lu";
import { useAppContext } from "@/components/AppCpntext";

export default function Menubar() {
  const { setState } = useAppContext();
  return (
    <div className=" flex space-x-3">
      <Button icon={HiPlus} variant="outline" className="flex-1">
        新建对话
      </Button>

      <Button
        icon={LuPanelLeft}
        variant="outline"
        onClick={() => {
          setState((v) => {
            return { ...v, displayNavigation: false };
          });
        }}
      />
    </div>
  );
}
