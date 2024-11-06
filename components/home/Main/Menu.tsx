"use client";
import { useAppContext } from "@/components/AppCpntext";
import Button from "@/components/common/Button";
import { ActionType } from "@/reducers/AppReducer";
import { LuPanelLeft } from "react-icons/lu";

export default function Menu() {
  const {
    state: { displayNavigation },
    dispatch,
  } = useAppContext();
  return (
    <Button
      icon={LuPanelLeft}
      variant="outline"
      className={`${displayNavigation ? "hidden" : ""} fixed lef-2 top-2 `}
      onClick={() => {
        dispatch({
          type: ActionType.UPDATA,
          field: "displayNavigation",
          value: true,
        });
      }}
    />
  );
}
