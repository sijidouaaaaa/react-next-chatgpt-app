import Button from "../../common/Button";
import { LuPanelLeft } from "react-icons/lu";
import { useAppContext } from "@/components/AppCpntext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Toolbar() {
  const {
    state: { themeMode },
    setState,
  } = useAppContext();
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-2 bg-gary-800 ">
      <Button
        icon={themeMode === "dark" ? MdDarkMode : MdLightMode}
        variant="text"
        onClick={() => {
          setState((v) => {
            return { ...v, themeMode: themeMode === "dark" ? "light" : "dark" };
          });
        }}
      />

      <Button icon={LuPanelLeft} variant="text" />
    </div>
  );
}
