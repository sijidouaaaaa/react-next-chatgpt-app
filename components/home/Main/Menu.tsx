"use client";
import { useAppContext } from "@/components/AppCpntext";
import Button from "@/components/common/Button";
import { LuPanelLeft } from "react-icons/lu";

export default function Menu() {
  const {
    state: { displayNavigation },
    setState,
  } = useAppContext();
  return (
    <Button
      icon={LuPanelLeft}
      variant="outline"
      className={`${displayNavigation ? "hidden" : ""} fixed lef-2 top-2 `}
      onClick={() => {
        setState((v) => {
          return { ...v, displayNavigation: true };
        });
      }}
    />
  );
}
