import { useAppContext } from "@/components/AppCpntext";
import Button from "@/components/common/Button";
import { ActionType } from "@/reducers/AppReducer";
import { useContext } from "react";
import { PiLightningFill, PiShootingStar } from "react-icons/pi";

export default function ModeSelect() {
  const models = [
    {
      id: "gpt-3.5-turbo",
      name: "gpt-3.5",
      icon: PiLightningFill,
    },
    {
      id: "gpt-4",
      name: "gpt-4",
      icon: PiShootingStar,
    },
  ];
  const {
    state: { currentModel },
    dispatch,
  } = useAppContext();
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl ">
      {models.map((item) => {
        const selected = item.id === currentModel;
        return (
          <Button
            key={item.id}
            onClick={() => {
              dispatch({
                type: ActionType.UPDATA,
                field: "currentModel",
                value: item.id,
              });
            }}
            className={`group hover:text-gray-900 hover:dark:text-gray-100 flex justify-center items-center space-x-2 py-2.5 min-w-[148px] text-sm font-medium border rounded-lg
              ${
                selected
                  ? "border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  : "border-transparent text-gray-500"
              }`}
          >
            <span
              className={`group-hover:text-[#26cf8e] transition-colors duration-100 
                ${selected ? "text-[#26cf8e]" : ""}`}
            >
              <item.icon />
            </span>
            <span className="transition-colors duration-100">{item.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
