import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ code: -1 });
  }
  // 删除消息
  const delectMessages = prisma.message.deleteMany({
    where: {
      chatId: id,
    },
  });
  // 删除消息
  const deleteChat = prisma.chat.delete({
    where: {
      id,
    },
  });
  await prisma.$transaction([delectMessages, deleteChat]);
  return NextResponse.json({ code: 0 });
}
