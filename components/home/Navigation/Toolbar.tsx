import Button from "../../common/Button";

import { useAppContext } from "@/components/AppCpntext";
import { MdDarkMode, MdInfo, MdLightMode } from "react-icons/md";
import { ActionType } from "@/reducers/AppReducer";

export default function Toolbar() {
  const {
    state: { themeMode },
    dispatch,
  } = useAppContext();
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-2 bg-gary-800 ">
      <Button
        icon={themeMode === "dark" ? MdDarkMode : MdLightMode}
        variant="text"
        onClick={() => {
          dispatch({
            type: ActionType.UPDATA,
            field: "themeMode",
            value: themeMode === "dark" ? "light" : "dark",
          });
        }}
      />

      <Button icon={MdInfo} variant="text" />
    </div>
  );
}
