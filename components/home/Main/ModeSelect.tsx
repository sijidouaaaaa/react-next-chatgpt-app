import Button from "@/components/common/Button";
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
  return (
    <div className="flex bg-gray-100 darck:bg-gray-900 p-1 rounded ">
      {models.map((item) => {
        return (
          <Button
            key={item.id}
            className="flex justify-center items-center space-x-2 py-2.5 min-w-[148px] text-sm font-medium border rounded-lg"
          >
            <span>
              <item.icon />
            </span>
            <span>{item.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
