"use client";

import { useAppContext } from "@/components/AppCpntext";
import Menubar from "./Menubar";

export default function Navigation() {
  const {
    state: { displayNavigation },
  } = useAppContext();
  return (
    <nav
      className={`${displayNavigation ? "" : "hidden"} h-full w-[260px] bg-gray-900 text-gray-300 pt-2 `}
    >
      <Menubar></Menubar>
    </nav>
  );
}
