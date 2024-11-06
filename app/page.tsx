"use client";
import React from "react";
import Main from "@/components/home/Main";
import Navigation from "@/components/home/Navigation";
import { useAppContext } from "@/components/AppCpntext";

export default function Home() {
  const {
    state: { themeMode }, //动态实现主题模式
  } = useAppContext();

  return (
    <div className={`${themeMode} h-full flex`}>
      <Navigation />
      <Main />
    </div>
  );
}
