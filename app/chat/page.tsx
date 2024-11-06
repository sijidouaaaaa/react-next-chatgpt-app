import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "chat",
};

export default function Chat() {
  return (
    <main className="bg-pink-500 p-10">
      <h1>chat</h1>
    </main>
  );
}
